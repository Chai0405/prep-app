import { useState } from "react";

import dryFruitProducts from "../data/dryFruitProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/dryfruits.css";

const DryFruits = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? dryFruitProducts

      : dryFruitProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero dryfruits-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Dry Fruits & Nuts
          </h1>

          <p>
            Premium nuts, dried fruits,
            and nourishing snack blends
            curated for balanced living.
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
              activeFilter === "Nuts & Seeds"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Nuts & Seeds"
              )
            }
          >
            Nuts & Seeds
          </button>

          <button
            className={
              activeFilter === "Dried Fruits"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Dried Fruits"
              )
            }
          >
            Dried Fruits
          </button>

          <button
            className={
              activeFilter === "Seeds & Superfoods"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Seeds & Superfoods"
              )
            }
          >
            Superfoods
          </button>

          <button
            className={
              activeFilter === "Snack Mixes"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Snack Mixes"
              )
            }
          >
            Snack Mixes
          </button>

        </div>

      </div>

      <div className="products-grid dryfruits-grid">

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

export default DryFruits;