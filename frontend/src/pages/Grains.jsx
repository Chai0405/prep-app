import { useState } from "react";

import grainProducts from "../data/grainProducts";

import ProductCard from "../components/ProductCard";

import CartSidebar from "../components/CartSidebar";

import "../styles/grains.css";

const Grains = () => {

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const filteredProducts =
    activeFilter === "All"

      ? grainProducts

      : grainProducts.filter(
          (product) =>
            product.tags[3] === activeFilter
        );

  return (

    <div className="category-page">

      <div className="category-hero grains-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>
            Grains & Pulses
          </h1>

          <p>
            Wholesome grains, nourishing
            pulses, and pantry staples curated
            for balanced everyday cooking.
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
              activeFilter === "Rice & Grains"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Rice & Grains"
              )
            }
          >
            Rice & Grains
          </button>

          <button
            className={
              activeFilter === "Healthy Grains"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Healthy Grains"
              )
            }
          >
            Healthy Grains
          </button>

          <button
            className={
              activeFilter === "Flours & Staples"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Flours & Staples"
              )
            }
          >
            Flours & Staples
          </button>

          <button
            className={
              activeFilter === "Pulses & Lentils"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Pulses & Lentils"
              )
            }
          >
            Pulses & Lentils
          </button>

          <button
            className={
              activeFilter === "Beans & Legumes"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Beans & Legumes"
              )
            }
          >
            Beans & Legumes
          </button>

        </div>

      </div>

      <div className="products-grid grains-grid">

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

export default Grains;