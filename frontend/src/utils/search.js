import pantryCategories from "../data/pantryCategories";
import freshProduce from "../data/freshProduce";
import blogPosts from "../data/blogPosts";
import { apiFetch } from "./api";

/*
  Site-wide search used by the navbar.
  Products and blog posts are bundled with the app; recipes come from the
  API once and are reused for the rest of the visit.
*/

export const normalize = (text = "") =>
  String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // drop accents: "jalapeño" -> "jalapeno"
    .replace(/<[^>]*>/g, " ")        // blog content is HTML
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// ---------- catalogue (built once) ----------

const PRODUCTS = [
  ...freshProduce.map((product) => ({ ...product, categoryTitle: "Fresh Produce", categorySlug: "fresh-produce" })),
  ...Object.entries(pantryCategories).flatMap(([slug, category]) =>
    category.products.map((product) => ({ ...product, categoryTitle: category.title, categorySlug: slug }))
  ),
];

const BLOGS = Object.entries(blogPosts).map(([slug, post]) => ({ slug, ...post }));

// ---------- recipes (fetched once per visit) ----------

let recipesPromise;

export const loadRecipes = () => {
  recipesPromise ??= apiFetch("/api/recipes")
    .then((res) => {
      if (!res.ok) throw new Error(`Recipes request failed (${res.status})`);
      return res.json();
    })
    .catch((err) => {
      recipesPromise = undefined; // allow a retry next time
      throw err;
    });
  return recipesPromise;
};

// ---------- matching ----------

/*
  Every word of the query must appear somewhere in the item.
  Score: name matches beat other fields; names that start with the
  query (or a word starting with it) beat names that merely contain it.
*/
const scoreItem = (terms, phrase, title, other) => {
  const name = normalize(title);
  const rest = normalize(other);
  const all = `${name} ${rest}`;

  if (!terms.every((term) => all.includes(term))) return 0;

  let score = 0;
  if (name === phrase) score += 100;
  else if (name.startsWith(phrase)) score += 60;
  else if (` ${name}`.includes(` ${phrase}`)) score += 45;
  else if (name.includes(phrase)) score += 30;

  score += terms.filter((term) => name.includes(term)).length * 10;
  return score + 1; // any full match counts
};

const rank = (items, terms, phrase, fields, limit) =>
  items
    .map((item) => {
      const [title, other] = fields(item);
      return { item, score: scoreItem(terms, phrase, title, other) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || String(fields(a.item)[0]).localeCompare(fields(b.item)[0]))
    .slice(0, limit)
    .map((r) => r.item);

export const LIMITS = { recipes: 6, products: 6, blogs: 3 };

export const searchAll = (query, { recipes = [], products = PRODUCTS, blogs = BLOGS } = {}) => {
  const phrase = normalize(query);
  const terms = phrase.split(" ").filter(Boolean);

  if (!terms.length) return { recipes: [], products: [], blogs: [] };

  return {
    recipes: rank(recipes, terms, phrase, (r) => [
      r.title,
      [r.cuisine, r.mealType, r.difficulty, ...(r.tags || []), ...(r.ingredients || [])].join(" "),
    ], LIMITS.recipes),

    products: rank(products, terms, phrase, (p) => [
      p.name,
      [p.categoryTitle, ...(p.tags || []), p.description].join(" "),
    ], LIMITS.products),

    blogs: rank(blogs, terms, phrase, (b) => [
      b.title,
      [b.author?.name, b.content].join(" "),
    ], LIMITS.blogs),
  };
};
