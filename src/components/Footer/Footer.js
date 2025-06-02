import React from "react";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <div className={styles.left}>
        <span>© {new Date().getFullYear()} Electronics & Online Store</span>
      </div>
      <div className={styles.center}>
        <a href="mailto:info@estore.com" className={styles.link}>Contact</a>
        <span className={styles.sep}>|</span>
        <a href="https://instagram.com/akifismm" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fa fa-instagram"></i> Instagram
        </a>
        <span className={styles.sep}>|</span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <i className="fa fa-facebook"></i> Facebook
        </a>
      </div>
      <div className={styles.right}>
        <span>All rights reserved.</span>
      </div>
    </div>
  </footer>
);

export default Footer;