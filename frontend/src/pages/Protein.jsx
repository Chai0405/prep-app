import { useState } from "react";

import proteinProducts from "../data/proteinProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/protein.css";

const Protein = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? proteinProducts

      : proteinProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      {/* HERO */}

      <div className="category-hero protein-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Protein & Meat
          </h1>

          <p>
            Premium meat cuts and curated
            ready-to-cook selections prepared
            fresh for elevated everyday meals.
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
              activeFilter === "Fresh Chicken"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Fresh Chicken"
              )
            }
          >
            Fresh Chicken
          </button>

          <button
            className={
              activeFilter === "Mutton Cuts"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Mutton Cuts"
              )
            }
          >
            Mutton Cuts
          </button>

          <button
            className={
              activeFilter === "Pork Cuts"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Pork Cuts"
              )
            }
          >
            Pork Cuts
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

      <div className="products-grid protein-grid">

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

export default Protein;