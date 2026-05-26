import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";


const PantryProductCard = ({
  product,
  setIsCartOpen,
}) => {

  const dispatch = useDispatch();

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-content">

        <h3>{product.name}</h3>

        <div className="product-meta">

          {product.tags.map((tag, index) => (
            <span key={index}>
              {tag}
            </span>
          ))}

        </div>

        <p className="product-desc">
          {product.description}
        </p>

        <div className="product-bottom">

          <span className="product-price">
            ₹{product.price}
          </span>

          <button
 onClick={() => {

  dispatch(addToCart(product));

  if (setIsCartOpen) {
    setIsCartOpen(true);
  }

}}
>
  Add
</button>

        </div>

      </div>

    </div>
  );
};

export default PantryProductCard;