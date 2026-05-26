import { useParams } from "react-router-dom";
import freshProduce from "../data/freshProduce";
import PantryProductCard from "../components/ProductCard";
import CartSidebar from "../components/CartSidebar";
import { useState } from "react";

const CategoryProducts = () => {
  const { category } = useParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
  activeFilter === "All"

    ? freshProduce

    : freshProduce.filter((product) =>
        product.tags.includes(activeFilter)
      );

  return (
    <div className="category-page">

      <div className="category-hero">

        <div className="category-overlay"></div>

        <div className="category-hero-content">

          <h1>Fresh Produce</h1>

          <p>
            Farm-picked vegetables and fruits thoughtfully curated
            for fresher meals and healthier everyday cooking.
          </p>

        </div>

      </div>

      <div className="category-content">

        <div className="category-filters">

          {
  [
    "All",
    "Vegetables",
    "Fruits",
    "Leafy Greens",
    "Seasonal",
    "Local Picks"
  ].map((filter) => (

    <button
      key={filter}
      className={`filter-btn ${
        activeFilter === filter
          ? "active-filter"
          : ""
      }`}
      onClick={() =>
        setActiveFilter(filter)
      }
    >
      {filter}
    </button>

  ))
}

        </div>

      </div>

      {/* {Product grid} */}

      <div className="products-grid">

          {
          filteredProducts.map((product) => (
            <PantryProductCard
  key={product.id}
  product={product}
  setIsCartOpen={setIsCartOpen}
/>
              ))
            }

            {
  isCartOpen && (
    <>
      <div
        className="cart-backdrop"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <CartSidebar
        setIsCartOpen={setIsCartOpen}
      />
    </>
  )
}

</div>



    </div>
  );
};

export default CategoryProducts;