import { useState } from "react";

import seafoodProducts from "../data/seafoodProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/seafood.css";

const Seafood = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? seafoodProducts

      : seafoodProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      {/* HERO */}

      <div className="category-hero seafood-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Fresh Seafood
          </h1>

          <p>
            Fresh coastal seafood and premium
            ocean catches curated for elevated
            everyday dining.
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
              activeFilter === "Fresh Fish"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Fresh Fish"
              )
            }
          >
            Fresh Fish
          </button>

          <button
            className={
              activeFilter === "Shellfish"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Shellfish"
              )
            }
          >
            Shellfish
          </button>

          <button
            className={
              activeFilter === "Premium Catch"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Premium Catch"
              )
            }
          >
            Premium Catch
          </button>

          <button
            className={
              activeFilter === "Ready to Cook"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Ready to Cook"
              )
            }
          >
            Ready to Cook
          </button>

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="products-grid seafood-grid">

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

export default Seafood;