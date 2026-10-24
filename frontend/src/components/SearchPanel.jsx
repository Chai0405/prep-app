import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Search, X } from "lucide-react";
import { addToCart } from "../redux/features/cart/cartSlice";
import { loadRecipes, searchAll } from "../utils/search";
import "../styles/search.css";
import LoadingState from "./LoadingState";

// Full-screen (phone) / dropdown-style (desktop) search over recipes, products and blogs
export default function SearchPanel({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipesState, setRecipesState] = useState("loading"); // loading | ready | error
  const [added, setAdded] = useState({}); // product id -> true, for the "Added" label

  useEffect(() => {
    inputRef.current?.focus();

    loadRecipes()
      .then((data) => { setRecipes(Array.isArray(data) ? data : []); setRecipesState("ready"); })
      .catch(() => setRecipesState("error"));

    // keep the page behind from scrolling while searching
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  const results = useMemo(() => searchAll(query, { recipes }), [query, recipes]);
  const hasQuery = query.trim().length > 0;
  const total = results.recipes.length + results.products.length + results.blogs.length;

  const go = (path) => {
    onClose();
    navigate(path);
  };

  const openFirst = () => {
    if (results.recipes[0]) return go(`/recipes/${results.recipes[0]._id}`);
    if (results.products[0]) return go(`/pantry/${results.products[0].categorySlug}`);
    if (results.blogs[0]) return go(`/blogs/${results.blogs[0].slug}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter") openFirst();
  };

  const add = (product) => {
    dispatch(addToCart(product));
    setAdded((current) => ({ ...current, [product.id]: true }));
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search PREP"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="search-bar">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, products, blogs..."
            aria-label="Search recipes, products and blogs"
            enterKeyHint="search"
          />
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        <div className="search-results" aria-live="polite">

          {!hasQuery && (
            <p className="search-hint">Try “paneer”, “breakfast”, “olive oil” or “meal prep”.</p>
          )}

          {hasQuery && results.recipes.length > 0 && (
            <section>
              <h3>Recipes</h3>
              <ul>
                {results.recipes.map((recipe) => (
                  <li key={recipe._id}>
                    <button type="button" className="search-item" onClick={() => go(`/recipes/${recipe._id}`)}>
                      <img src={recipe.image} alt="" loading="lazy" />
                      <span className="search-item-text">
                        <strong>{recipe.title}</strong>
                        <small>{[recipe.cuisine, recipe.mealType, recipe.time].filter(Boolean).join(" · ")}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasQuery && recipesState === "loading" && results.recipes.length === 0 && (
            <LoadingState label="Loading recipes..." compact />
          )}

          {hasQuery && recipesState === "error" && (
            <p className="search-note">Recipes couldn't be loaded right now; showing products and blogs.</p>
          )}

          {hasQuery && results.products.length > 0 && (
            <section>
              <h3>Products</h3>
              <ul>
                {results.products.map((product) => (
                  <li key={`${product.categorySlug}-${product.id}`} className="search-product">
                    <button type="button" className="search-item" onClick={() => go(`/pantry/${product.categorySlug}`)}>
                      <img src={product.image} alt="" loading="lazy" />
                      <span className="search-item-text">
                        <strong>{product.name}</strong>
                        <small>{product.categoryTitle} · ₹{product.price}</small>
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`search-add ${added[product.id] ? "is-added" : ""}`}
                      onClick={() => add(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {added[product.id] ? "Added ✓" : "Add"}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasQuery && results.blogs.length > 0 && (
            <section>
              <h3>Blog posts</h3>
              <ul>
                {results.blogs.map((blog) => (
                  <li key={blog.slug}>
                    <button type="button" className="search-item" onClick={() => go(`/blogs/${blog.slug}`)}>
                      <img src={blog.image} alt="" loading="lazy" />
                      <span className="search-item-text">
                        <strong>{blog.title}</strong>
                        <small>{blog.author?.name}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* No recipe matched: offer to request it (even if products/blogs did) */}
          {hasQuery && results.recipes.length === 0 && recipesState !== "loading" && (
            <div className={`search-empty ${total > 0 ? "is-compact" : ""}`}>
              <p>{total === 0 ? `No results for “${query.trim()}”.` : `No recipe for “${query.trim()}” yet.`}</p>
              <button
                type="button"
                className="search-request"
                onClick={() => go(`/recipes?request=${encodeURIComponent(query.trim())}`)}
              >
                Request “{query.trim()}” as a recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
