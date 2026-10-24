import { useState } from "react";

import { Navigate, useParams } from "react-router-dom";

import pantryCategories from "../data/pantryCategories";

import CartSidebar from "../components/CartSidebar";

import ProductCard from "../components/ProductCard";

import "../styles/pantryCategories.css";

// Old links used a misspelled slug
const SLUG_ALIASES = {
  "protien-meat": "protein-meat",
};

const PantryCategory = () => {

  const { category } = useParams();

  if (SLUG_ALIASES[category]) {
    return <Navigate to={`/pantry/${SLUG_ALIASES[category]}`} replace />;
  }

  const config = pantryCategories[category];

  if (!config) {
    return <Navigate to="/pantry" replace />;
  }

  // key resets the filter when switching between categories
  return <CategoryView key={category} {...config} />;
};

const CategoryView = ({ title, description, theme, products, filters }) => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? products

      : products.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      {/* HERO */}

      <div className={`category-hero ${theme}-hero`}>

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            {title}
          </h1>

          <p>
            {description}
          </p>

        </div>

      </div>

      {/* FILTERS */}

      <div className="category-content">

        <div className="category-filters">

          {["All", ...filters].map((filter) => (

            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>

          ))}

        </div>

      </div>

      {/* PRODUCTS */}

      <div className={`products-grid ${theme}-grid`}>

        {
          filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              setIsCartOpen={setIsCartOpen}
            />

          ))
        }

      </div>

      {/* CART SIDEBAR */}

      {
        isCartOpen && (

          <>

            <div
              className="cart-backdrop"
              onClick={() =>
                setIsCartOpen(false)
              }
            ></div>

            <CartSidebar
              setIsCartOpen={setIsCartOpen}
            />

          </>

        )
      }

    </div>
  );
};

export default PantryCategory;
