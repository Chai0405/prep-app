import { useState } from "react";

import oilProducts from "../data/oilProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/oils.css";

const Oils = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? oilProducts

      : oilProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      {/* HERO */}

      <div className="category-hero oils-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Oils & Essentials
          </h1>

          <p>
            Curated oils, rich ghee, and
            premium pantry essentials crafted
            for elevated everyday cooking.
          </p>

        </div>

      </div>

      {/* FILTERS */}

      <div className="category-content">

        <div className="category-filters">

          <button
            className={
              activeFilter === "All"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter("All")
            }
          >
            All
          </button>

          <button
            className={
              activeFilter === "Cooking Oils"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Cooking Oils"
              )
            }
          >
            Cooking Oils
          </button>

          <button
            className={
              activeFilter === "Cold Pressed"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Cold Pressed"
              )
            }
          >
            Cold Pressed
          </button>

          <button
            className={
              activeFilter === "Ghee & Butter"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Ghee & Butter"
              )
            }
          >
            Ghee & Butter
          </button>

          <button
            className={
              activeFilter ===
              "Vinegars & Dressings"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Vinegars & Dressings"
              )
            }
          >
            Dressings
          </button>

          <button
            className={
              activeFilter ===
              "Premium Essentials"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Premium Essentials"
              )
            }
          >
            Premium Essentials
          </button>

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="products-grid oils-grid">

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

      {/* CART */}

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

export default Oils;