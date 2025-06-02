import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styles from "./Product.module.css";

const Product = (props) => {
  const { key, name, img, seller, price } = props.product;

  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <img
          src={img}
          alt={name}
          className={styles.img}
          onError={e => { e.target.src = "https://via.placeholder.com/200x200?text=No+Image"; }}
        />
      </div>
      <div className={styles.body}>
        <div>
          <h5 className={styles.name}>
            <Link to={"/product/" + key}>{name}</Link>
          </h5>
          {seller && <div className={styles.seller}>By: {seller}</div>}
          <div className={styles.price}>Price : ${price}</div>
        </div>
        {props.showAddToCart === true && (
          <button
            className={styles.addBtn}
            onClick={() => props.handleProduct(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
