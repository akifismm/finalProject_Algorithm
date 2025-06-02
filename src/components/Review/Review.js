import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import styles from "./Review.module.css";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState({});

  const handleRemoveItem = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Validation funksiyası
  const validate = () => {
    const errs = {};
    if (!card.name.trim()) errs.name = "Cardholder name is required";
    if (!/^\d{16}$/.test(card.number.replace(/\s/g, ""))) errs.number = "Card number must be 16 digits";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry = "Expiry must be MM/YY";
    if (!/^\d{3,4}$/.test(card.cvc)) errs.cvc = "CVC must be 3 or 4 digits";
    return errs;
  };

  const handleBuy = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    alert("Order placed!\n" +
      `Card: ${card.number}\nName: ${card.name}\nExpiry: ${card.expiry}`);
    setCard({ name: "", number: "", expiry: "", cvc: "" });
    setShowBuyForm(false);
    setCart([]);
    localStorage.removeItem("cart");
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Review</h1>
      <div className={styles.products}>
        {cart.map(product => (
          <div key={product.key} className={styles.productWrapper}>
            <Product
              product={product}
              showAddToCart={false}
            />
            <button
              className={styles.removeBtn}
              onClick={() => handleRemoveItem(product.key)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className={styles.buySection}>
          <button className={styles.buyBtn} onClick={() => setShowBuyForm(true)}>
            Buy
          </button>
        </div>
      )}
      {showBuyForm && (
        <div className={styles.buyModalBg} onClick={() => setShowBuyForm(false)}>
          <div className={styles.buyModal} onClick={e => e.stopPropagation()}>
            <button className={styles.buyModalClose} onClick={() => setShowBuyForm(false)}>×</button>
            <h3>Card Information</h3>
            <form onSubmit={handleBuy} className={styles.buyForm} noValidate>
              <input
                type="text"
                placeholder="Cardholder Name"
                value={card.name}
                onChange={e => setCard({ ...card, name: e.target.value })}
                required
                className={styles.input}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
              <input
                type="text"
                placeholder="Card Number"
                value={card.number}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, "");
                  setCard({ ...card, number: val });
                }}
                required
                maxLength={16}
                inputMode="numeric"
                pattern="\d*"
                className={styles.input}
              />
              {errors.number && <span className={styles.error}>{errors.number}</span>}
              <div className={styles.flexRow}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={e => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length > 2) val = val.slice(0,2) + "/" + val.slice(2,4);
                    setCard({ ...card, expiry: val.slice(0,5) });
                  }}
                  required
                  maxLength={5}
                  inputMode="numeric"
                  pattern="\d{2}/\d{2}"
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={card.cvc}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCard({ ...card, cvc: val });
                  }}
                  required
                  maxLength={4}
                  inputMode="numeric"
                  pattern="\d*"
                  className={styles.input}
                />
              </div>
              <div className={styles.flexRow}>
                {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
                {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
              </div>
              <button type="submit" className={styles.buyBtn}>
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;