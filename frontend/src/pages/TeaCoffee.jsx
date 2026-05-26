import { useState } from "react";

import teaCoffeeProducts from "../data/teaCoffeeProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/teaCoffee.css";

const TeaCoffee = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? teaCoffeeProducts

      : teaCoffeeProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero teaCoffee-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Tea & Coffee
          </h1>

          <p>
            Premium coffee roasts and
            comforting tea blends curated
            for elevated everyday rituals.
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
              activeFilter === "Coffee Blends"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Coffee Blends"
              )
            }
          >
            Coffee Blends
          </button>

          <button
            className={
              activeFilter === "Tea Blends"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Tea Blends"
              )
            }
          >
            Tea Blends
          </button>

          <button
            className={
              activeFilter === "Wellness Teas"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Wellness Teas"
              )
            }
          >
            Wellness Teas
          </button>

          <button
            className={
              activeFilter === "Cold Brew"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Cold Brew"
              )
            }
          >
            Cold Brew
          </button>

          <button
            className={
              activeFilter === "Cafe Essentials"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Cafe Essentials"
              )
            }
          >
            Cafe Essentials
          </button>

        </div>

      </div>

      <div className="products-grid teaCoffee-grid">

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

export default TeaCoffee;