import { useState } from "react";

import bakeryProducts from "../data/bakeryProducts";

import CartSidebar from "../components/CartSidebar";

import ProductCard from "../components/ProductCard";

import "../styles/bakery.css";

const Bakery = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? bakeryProducts

      : bakeryProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      {/* HERO */}

      <div className="category-hero bakery-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Artisan Bakery
          </h1>

          <p>
            Freshly baked artisan breads and
            curated bakery staples crafted for
            comforting everyday meals.
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
              activeFilter === "Artisan Breads"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Artisan Breads"
              )
            }
          >
            Artisan Breads
          </button>

          <button
            className={
              activeFilter === "Breakfast Bakes"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Breakfast Bakes"
              )
            }
          >
            Breakfast Bakes
          </button>

          <button
            className={
              activeFilter === "Savory Bakes"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Savory Bakes"
              )
            }
          >
            Savory Bakes
          </button>

          <button
            className={
              activeFilter === "Everyday Staples"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Everyday Staples"
              )
            }
          >
            Everyday Staples
          </button>

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="products-grid">

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

export default Bakery;