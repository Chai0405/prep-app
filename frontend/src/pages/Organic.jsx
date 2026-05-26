import { useState } from "react";

import organicProducts from "../data/organicProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/organic.css";

const Organic = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? organicProducts

      : organicProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero organic-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Organic Picks
          </h1>

          <p>
            Naturally sourced organic essentials
            and wellness-focused pantry picks
            curated for mindful living.
          </p>

        </div>

      </div>

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
              activeFilter === "Organic Produce"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Organic Produce"
              )
            }
          >
            Organic Produce
          </button>

          <button
            className={
              activeFilter === "Organic Staples"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Organic Staples"
              )
            }
          >
            Organic Staples
          </button>

          <button
            className={
              activeFilter === "Organic Wellness"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Organic Wellness"
              )
            }
          >
            Organic Wellness
          </button>

          <button
            className={
              activeFilter === "Organic Beverages"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Organic Beverages"
              )
            }
          >
            Organic Beverages
          </button>

          <button
            className={
              activeFilter === "Organic Dairy"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Organic Dairy"
              )
            }
          >
            Organic Dairy
          </button>

        </div>

      </div>

      <div className="products-grid organic-grid">

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

export default Organic;