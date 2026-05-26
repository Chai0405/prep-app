import { useState } from "react";

import sauceProducts from "../data/sauceProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/sauces.css";

const Sauces = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? sauceProducts

      : sauceProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero sauces-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Jams & Sauces
          </h1>

          <p>
            Rich sauces, premium spreads,
            and curated condiments crafted
            for elevated everyday meals.
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
              activeFilter === "Classic Sauces"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Classic Sauces"
              )
            }
          >
            Classic Sauces
          </button>

          <button
            className={
              activeFilter === "Hot & Spicy"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Hot & Spicy"
              )
            }
          >
            Hot & Spicy
          </button>

          <button
            className={
              activeFilter === "Jams & Spreads"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Jams & Spreads"
              )
            }
          >
            Jams & Spreads
          </button>

          <button
            className={
              activeFilter === "Nut Butters"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Nut Butters"
              )
            }
          >
            Nut Butters
          </button>

          <button
            className={
              activeFilter === "Premium Gourmet"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Premium Gourmet"
              )
            }
          >
            Premium Gourmet
          </button>

        </div>

      </div>

      <div className="products-grid sauces-grid">

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

export default Sauces;