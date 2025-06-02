import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import Login from "../Login/Login";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="header">
      <div className="header-title-bg">
        <h1>Electronics & Online Store</h1>
      </div>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Review</Link>
        <Link to="/inventory">Inventory</Link>
        <button
          className="login-btn"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </nav>
      {showLogin && (
        <div className="login-modal-bg" onClick={() => setShowLogin(false)}>
          <div
            className="login-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="login-modal-close"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
