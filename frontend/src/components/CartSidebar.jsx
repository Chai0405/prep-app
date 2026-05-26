import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cart/cartSlice";

import { useNavigate } from "react-router-dom";

const CartSidebar = ({ setIsCartOpen }) => {

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
  (acc, item) =>
    acc + item.price * item.quantity,
  0
);

const deliveryFee = 49;

const total = subtotal + deliveryFee;

  return (
    <div className="cart-sidebar">

      <h2>Your Cart</h2>

      <button
  className="close-cart"
  onClick={() => setIsCartOpen(false)}
>
  ✕
</button>

      <p className="cart-subtitle">
  Review your selected essentials before checkout.
</p>

      {
        cartItems.length === 0 ? (

          <p className="empty-cart">
            Your cart is empty.
          </p>

        ) : (

          cartItems.map((item) => (

            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h4>{item.name}</h4>

                <p>
                  ₹{item.price}
                </p>

                <div className="cart-actions">

  <div className="cart-quantity">

    <button
  onClick={() =>
    dispatch(decreaseQuantity(item.id))
  }
>
  -
</button>

    <span>{item.quantity}</span>

    <button
  onClick={() =>
    dispatch(increaseQuantity(item.id))
  }
>
  +
</button>

  </div>

  <button
  className="remove-btn"
  onClick={() =>
    dispatch(removeFromCart(item.id))
  }
>
  Remove
</button>

</div>

              </div>

            </div>

          ))
        )
      }

      {
  cartItems.length > 0 && (

    <div className="cart-summary">

      <div className="summary-row">

        <span>Subtotal</span>

        <span>₹{subtotal}</span>

      </div>

      <div className="summary-row">

        <span>Delivery</span>

        <span>₹{deliveryFee}</span>

      </div>

      <div className="summary-row total-row">

        <span>Total</span>

        <span>₹{total}</span>

      </div>

     <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

    </div>

  )
}

    </div>
  );
};

export default CartSidebar;