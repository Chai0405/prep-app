import { useState } from "react";

import dairyProducts from "../data/dairyProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/dairy.css";

const Dairy = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? dairyProducts

      : dairyProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero dairy-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Dairy & Eggs
          </h1>

          <p>
            Fresh dairy, wholesome essentials,
            and curated everyday staples
            prepared for balanced modern living.
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
              activeFilter === "Milk & Dairy"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Milk & Dairy"
              )
            }
          >
            Milk & Dairy
          </button>

          <button
            className={
              activeFilter === "Cheese & Butter"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Cheese & Butter"
              )
            }
          >
            Cheese & Butter
          </button>

          <button
            className={
              activeFilter === "Eggs"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Eggs"
              )
            }
          >
            Eggs
          </button>

          <button
            className={
              activeFilter === "Healthy Alternatives"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Healthy Alternatives"
              )
            }
          >
            Healthy Alternatives
          </button>

        </div>

      </div>

      <div className="products-grid dairy-grid">

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

export default Dairy;