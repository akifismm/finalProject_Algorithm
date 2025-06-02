import React from "react";

const Cart = ({ cart, children }) => {
  // Total price calculation
  const total = cart.reduce(
    (totalPrice, product) => totalPrice + product.price * (product.quantity || 1),
    0
  );

  // Shipping cost calculation
  let shippingCost = 0;
  if (total > 35) {
    shippingCost = 0;
  } else if (total > 15) {
    shippingCost = 4.99;
  } else if (total > 0) {
    shippingCost = 15;
  }

  // Tax and grand total
  const tax = total / 10;
  const grandTotal = total + shippingCost + tax;

  // Number formatting
  const formatNumber = (num) => Number(num.toFixed(2));

  return (
    <div>
      <h4>Order Summary: {cart.length}</h4>
      <h4>Shipping Cost: ${formatNumber(shippingCost)}</h4>
      <h3>Total Price: ${formatNumber(grandTotal)}</h3>
      <p>
        <small>*Tax: {formatNumber(tax)}</small>
      </p>
      {children}
    </div>
  );
};

export default Cart;
