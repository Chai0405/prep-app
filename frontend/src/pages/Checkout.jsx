import { useSelector, useDispatch } from "react-redux";

import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cart/cartSlice";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Banknote } from "lucide-react";

import "../styles/checkout.css";

const Checkout = () => {

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const deliveryFee =
    cartItems.length > 0 ? 49 : 0;

  const packagingFee =
    cartItems.length > 0 ? 20 : 0;

  const total =
    subtotal +
    deliveryFee +
    packagingFee;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [orderSuccess, setOrderSuccess] =
    useState(false);

    const savedAddresses = [

  {
    type: "Home",

    fullName: "Chaithra",

    phone: "9876543210",

    address1: "12A Green Residency",

    address2: "MG Road",

    city: "Bangalore",

    state: "Karnataka",

    pincode: "560001",
  },

  {
    type: "Work",

    fullName: "Chaithra",

    phone: "9876543210",

    address1: "Tech Park Tower",

    address2: "Whitefield",

    city: "Bangalore",

    state: "Karnataka",

    pincode: "560066",
  },

];

const [formData, setFormData] =
  useState({

    fullName: "",

    phone: "",

    address1: "",

    address2: "",

    city: "",

    state: "",

    pincode: "",
  });

  const handleSelectAddress = (
  address
) => {

  setFormData({

    fullName: address.fullName,

    phone: address.phone,

    address1: address.address1,

    address2: address.address2,

    city: address.city,

    state: address.state,

    pincode: address.pincode,
  });
};

  const handlePlaceOrder = () => {

  const options = {

    key: "rzp_test_StsMTCaoexuUFh",

    amount: total * 100,

    currency: "INR",

    name: "PREP",

    description: "Premium Grocery Checkout",

    image: "/logo/prep-logo.png",

    handler: function () {

      setOrderSuccess(true);

      dispatch(clearCart());

      setTimeout(() => {

        navigate("/pantry");

      }, 2500);
    },

    prefill: {

      name: "Chaithra",

      email: "chaithra@example.com",

      contact: "9999999999",
    },

    theme: {
      color: "#000000",
    },
  };

  const razorpay =
    new window.Razorpay(options);

  razorpay.open();
};

  return (

    <div className="checkout-page">

      {
        orderSuccess && (

          <div className="order-success-overlay">

            <div className="order-success-box">

              <div className="success-icon">
                ✓
              </div>

              <h2>
                Order Placed Successfully
              </h2>

              <p>
                Your essentials are being
                prepared for delivery.
              </p>

            </div>

          </div>

        )
      }

      {/* HEADER */}

      <div className="checkout-header">

        <h1>
          Checkout
        </h1>

        <p>
          Complete your order and get your
          essentials delivered to your
          doorstep.
        </p>

      </div>

      {/* MAIN */}

      <div className="checkout-container">

        {/* LEFT */}

        <div className="checkout-left">

          {/* DELIVERY */}

          <div className="checkout-section">

            <div className="section-number">
              1
            </div>

            <h2>
              Delivery Information
            </h2>

            <div className="saved-addresses">

  {
    savedAddresses.map((address) => (

      <button
        key={address.type}
        className="saved-address-card"
        onClick={() =>
          handleSelectAddress(address)
        }
      >

        <h4>
          {address.type}
        </h4>

        <p>
          {address.address1}
        </p>

      </button>

    ))
  }

</div>

            <div className="delivery-form">

              <div className="input-row-2">

                <div className="input-group">

                  <label>
                    Full Name
                  </label>

                  <input
  type="text"
  placeholder="Enter full name"
  value={formData.fullName}
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      fullName: e.target.value,
    })
  }
/>

                </div>

                <div className="input-group">

                  <label>
                    Phone Number
                  </label>

                  <input
  type="text"
  placeholder="Enter phone number"
  value={formData.phone}
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value,
    })
  }
/>

                </div>

              </div>

              <div className="input-group">

                <label>
                  Address Line 1
                </label>

                <input
  type="text"
  placeholder="House number and apartment"
  value={formData.address1}
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      address1: e.target.value,
    })
  }
/>

              </div>

              <div className="input-group">

                <label>
                  Address Line 2
                </label>

                <input
  type="text"
  placeholder="Street and locality"
  value={formData.address2}
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      address2: e.target.value,
    })
  }
/>

              </div>

              <div className="input-row-3">

                <div className="input-group">

                  <label>
                    City
                  </label>

                  <input
  type="text"
  placeholder="Enter city"
  value={formData.city}
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      city: e.target.value,
    })
  }
/>

                </div>

                <div className="input-group">

                  <label>
                    State
                  </label>

                  <select
  value={formData.state}
  className="dark-select"
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      state: e.target.value,
    })
  }
>

                    <option
                      value=""
                      disabled
                    >
                      Choose State
                    </option>

                    <option>
                      Karnataka
                    </option>

                    <option>
                      Kerala
                    </option>

                    <option>
                      Tamil Nadu
                    </option>

                    <option>
                      Maharashtra
                    </option>

                  </select>

                </div>

                <div className="input-group">

                  <label>
                    Pincode
                  </label>

                  <input
  type="text"
  placeholder="574xxx"
  value={formData.pincode}
  spellCheck={false}
  onChange={(e) =>
    setFormData({
      ...formData,
      pincode: e.target.value,
    })
  }
/>

                </div>

              </div>

              <div className="input-group">

                <label>
                  Delivery Notes
                </label>

                <textarea
                  placeholder="Add delivery instructions"
                ></textarea>

              </div>

            </div>

          </div>

         </div>

        {/* RIGHT */}

        <div className="checkout-right">

          <h2>
            Order Summary
          </h2>

          <p className="summary-subtitle">

            {cartItems.length} items in cart

          </p>

          <div className="checkout-summary-content">

  <div className="checkout-items-wrapper">

    {
      cartItems.map((item) => (

              <div
  key={item.id}
  className="checkout-item"
>

  <img
    src={item.image}
    alt={item.name}
  />

  <div className="checkout-item-center">

    <div className="checkout-item-details">

      <h4>
        {item.name}
      </h4>

      <span>
        {item.tags[0]}
      </span>

      <div className="checkout-qty-controls">

        <button
          onClick={() =>
            dispatch(
              decreaseQuantity(item.id)
            )
          }
        >
          -
        </button>

        <span>
          {item.quantity}
        </span>

        <button
          onClick={() =>
            dispatch(
              increaseQuantity(item.id)
            )
          }
        >
          +
        </button>

      </div>

      <button
        className="remove-item-btn"
        onClick={() =>
          dispatch(removeFromCart(item.id))
        }
      >

        Remove

      </button>

    </div>

    <div className="checkout-item-price">

      ₹
      {item.price * item.quantity}

    </div>

  </div>

</div>

            ))
          }

          </div>

          </div>

          <div className="checkout-total">

            <div>
              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>
            </div>

            <div>
              <span>
                Delivery Fee
              </span>

              <span>
                ₹{deliveryFee}
              </span>
            </div>

            <div>
              <span>
                Packaging Fee
              </span>

              <span>
                ₹{packagingFee}
              </span>
            </div>

            <div className="final-total">

              <span>
                Total Amount
              </span>

              <span>
                ₹{total}
              </span>

            </div>

          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
          >

            {
              isProcessing
                ? "Processing..."
                : "Place Order"
            }

          </button>

        </div>

      </div>

    </div>

  );
};

export default Checkout;