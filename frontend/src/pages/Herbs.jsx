import { useState } from "react";

import herbProducts from "../data/herbProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/herbs.css";

const Herbs = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? herbProducts

      : herbProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero herbs-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Herbs & Greens
          </h1>

          <p>
            Fresh herbs, aromatic blends,
            and wellness greens curated for
            elevated everyday cooking.
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
              activeFilter === "Fresh Herbs"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Fresh Herbs"
              )
            }
          >
            Fresh Herbs
          </button>

          <button
            className={
              activeFilter === "Dried Herbs"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Dried Herbs"
              )
            }
          >
            Dried Herbs
          </button>

          <button
            className={
              activeFilter === "Herb Blends"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Herb Blends"
              )
            }
          >
            Herb Blends
          </button>

          <button
            className={
              activeFilter === "Wellness Greens"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Wellness Greens"
              )
            }
          >
            Wellness Greens
          </button>

        </div>

      </div>

      <div className="products-grid herbs-grid">

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

export default Herbs;