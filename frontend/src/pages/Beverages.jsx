import { useState } from "react";

import beverageProducts from "../data/beverageProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/beverages.css";

const Beverages = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? beverageProducts

      : beverageProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero beverages-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Healthy Beverages
          </h1>

          <p>
            Refreshing wellness drinks and
            nourishing beverages curated for
            balanced modern living.
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
              activeFilter === "Cold Pressed Juices"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Cold Pressed Juices"
              )
            }
          >
            Cold Pressed
          </button>

          <button
            className={
              activeFilter === "Protein & Wellness"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Protein & Wellness"
              )
            }
          >
            Wellness
          </button>

          <button
            className={
              activeFilter === "Tea & Wellness"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Tea & Wellness"
              )
            }
          >
            Tea & Wellness
          </button>

          <button
            className={
              activeFilter === "Hydration Drinks"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Hydration Drinks"
              )
            }
          >
            Hydration
          </button>

          <button
            className={
              activeFilter === "Coffee & Energy"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Coffee & Energy"
              )
            }
          >
            Coffee & Energy
          </button>

        </div>

      </div>

      <div className="products-grid beverages-grid">

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

export default Beverages;