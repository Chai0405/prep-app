import { useState } from "react";

import spiceProducts from "../data/spiceProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/spices.css";

const Spices = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? spiceProducts

      : spiceProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero spices-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Spices & Seasonings
          </h1>

          <p>
            Rich spices and curated
            seasonings crafted to elevate
            everyday cooking experiences.
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
              activeFilter === "Whole Spices"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Whole Spices"
              )
            }
          >
            Whole Spices
          </button>

          <button
            className={
              activeFilter === "Ground Spices"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Ground Spices"
              )
            }
          >
            Ground Spices
          </button>

          <button
            className={
              activeFilter === "Herbs & Seasonings"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Herbs & Seasonings"
              )
            }
          >
            Seasonings
          </button>

          <button
            className={
              activeFilter === "Blends & Rubs"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Blends & Rubs"
              )
            }
          >
            Blends & Rubs
          </button>

          <button
            className={
              activeFilter === "Premium Essentials"
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

      <div className="products-grid spices-grid">

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

export default Spices;