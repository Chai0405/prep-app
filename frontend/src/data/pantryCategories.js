import bakeryProducts from "./bakeryProducts";
import proteinProducts from "./proteinProducts";
import seafoodProducts from "./seafoodProducts";
import spiceProducts from "./spiceProducts";
import dairyProducts from "./dairyProducts";
import oilProducts from "./oilProducts";
import grainProducts from "./grainProducts";
import dryFruitProducts from "./dryFruitProducts";
import beverageProducts from "./beverageProducts";
import sauceProducts from "./sauceProducts";
import herbProducts from "./herbProducts";
import teaCoffeeProducts from "./teaCoffeeProducts";
import organicProducts from "./organicProducts";

/*
  Pantry category pages, keyed by URL slug (/pantry/:category).
  `theme` picks the hero/grid styles in styles/pantryCategories.css.
  Filters match a product's 4th tag (product.tags[3]).
*/
const pantryCategories = {
  "bakery": {
    title: "Artisan Bakery",
    description: "Freshly baked artisan breads and curated bakery staples crafted for comforting everyday meals.",
    theme: "bakery",
    products: bakeryProducts,
    filters: ["Artisan Breads", "Breakfast Bakes", "Savory Bakes", "Everyday Staples"],
  },
  "protein-meat": {
    title: "Protein & Meat",
    description: "Premium meat cuts and curated ready-to-cook selections prepared fresh for elevated everyday meals.",
    theme: "protein",
    products: proteinProducts,
    filters: ["Fresh Chicken", "Mutton Cuts", "Pork Cuts", "Ready to Cook"],
  },
  "seafood": {
    title: "Fresh Seafood",
    description: "Fresh coastal seafood and premium ocean catches curated for elevated everyday dining.",
    theme: "seafood",
    products: seafoodProducts,
    filters: ["Fresh Fish", "Shellfish", "Premium Catch", "Ready to Cook"],
  },
  "spices": {
    title: "Spices & Seasonings",
    description: "Rich spices and curated seasonings crafted to elevate everyday cooking experiences.",
    theme: "spices",
    products: spiceProducts,
    filters: ["Whole Spices", "Ground Spices", "Herbs & Seasonings", "Blends & Rubs", "Premium Essentials"],
  },
  "dairy-eggs": {
    title: "Dairy & Eggs",
    description: "Fresh dairy, wholesome essentials, and curated everyday staples prepared for balanced modern living.",
    theme: "dairy",
    products: dairyProducts,
    filters: ["Milk & Dairy", "Cheese & Butter", "Eggs", "Healthy Alternatives"],
  },
  "oils": {
    title: "Oils & Essentials",
    description: "Curated oils, rich ghee, and premium pantry essentials crafted for elevated everyday cooking.",
    theme: "oils",
    products: oilProducts,
    filters: ["Cooking Oils", "Cold Pressed", "Ghee & Butter", "Vinegars & Dressings", "Premium Essentials"],
  },
  "pulses-grains": {
    title: "Grains & Pulses",
    description: "Wholesome grains, nourishing pulses, and pantry staples curated for balanced everyday cooking.",
    theme: "grains",
    products: grainProducts,
    filters: ["Rice & Grains", "Healthy Grains", "Flours & Staples", "Pulses & Lentils", "Beans & Legumes"],
  },
  "dry-fruits": {
    title: "Dry Fruits & Nuts",
    description: "Premium nuts, dried fruits, and nourishing snack blends curated for balanced living.",
    theme: "dryfruits",
    products: dryFruitProducts,
    filters: ["Nuts & Seeds", "Dried Fruits", "Seeds & Superfoods", "Snack Mixes"],
  },
  "beverages": {
    title: "Healthy Beverages",
    description: "Refreshing wellness drinks and nourishing beverages curated for balanced modern living.",
    theme: "beverages",
    products: beverageProducts,
    filters: ["Cold Pressed Juices", "Protein & Wellness", "Tea & Wellness", "Hydration Drinks", "Coffee & Energy"],
  },
  "jams-sauces": {
    title: "Jams & Sauces",
    description: "Rich sauces, premium spreads, and curated condiments crafted for elevated everyday meals.",
    theme: "sauces",
    products: sauceProducts,
    filters: ["Classic Sauces", "Hot & Spicy", "Jams & Spreads", "Nut Butters", "Premium Gourmet"],
  },
  "herbs": {
    title: "Herbs & Greens",
    description: "Fresh herbs, aromatic blends, and wellness greens curated for elevated everyday cooking.",
    theme: "herbs",
    products: herbProducts,
    filters: ["Fresh Herbs", "Dried Herbs", "Herb Blends", "Wellness Greens"],
  },
  "tea-coffee": {
    title: "Tea & Coffee",
    description: "Premium coffee roasts and comforting tea blends curated for elevated everyday rituals.",
    theme: "teaCoffee",
    products: teaCoffeeProducts,
    filters: ["Coffee Blends", "Tea Blends", "Wellness Teas", "Cold Brew", "Cafe Essentials"],
  },
  "organic": {
    title: "Organic Picks",
    description: "Naturally sourced organic essentials and wellness-focused pantry picks curated for mindful living.",
    theme: "organic",
    products: organicProducts,
    filters: ["Organic Produce", "Organic Staples", "Organic Wellness", "Organic Beverages", "Organic Dairy"],
  },
};

export default pantryCategories;
