import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import loader from "../../images/loader.gif";
import { Link } from "react-router-dom";
import styles from "./Shop.module.css";

const PAGE_SIZE = 20;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);

  // KATEQORIYALARI ÇƏK
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => {
        const categoryNames = data.map(cat =>
          typeof cat === "string" ? cat : cat.name
        );
        setCategories(categoryNames);
      });
  }, []);

  // MEHSULLARI ÇƏK
  useEffect(() => {
    setIsLoading(true);
    let url =
      selectedCategory === "all"
        ? `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
        : `https://dummyjson.com/products/category/${selectedCategory}?limit=${PAGE_SIZE}&skip=${skip}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const newProducts = data.products.map(item => ({
          key: item.id.toString(),
          name: item.title,
          price: item.price,
          img: item.thumbnail,
          seller: item.brand,
        }));
        setProducts(skip === 0 ? newProducts : prev => [...prev, ...newProducts]);
        setHasMore((skip + PAGE_SIZE) < data.total);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [skip, selectedCategory]);

  useEffect(() => {
    setSkip(0);
  }, [selectedCategory]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const handleShowMore = () => {
    setSkip(prev => prev + PAGE_SIZE);
  };

  // Əlavə et: Səbətə məhsul əlavə etmək üçün funksiya
  const handleAddToCart = (product) => {
    const exist = cart.find(item => item.key === product.key);
    let newCart;
    if (exist) {
      newCart = cart.map(item =>
        item.key === product.key
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // <-- Əlavə et
  };

  return (
    <div className={styles.shopContainer}>
      <div className={styles.row}>
        <div className={styles.productsCol}>
          <div className={styles.categorySelectWrapper}>
            <label htmlFor="category-select" className={styles.categoryLabel}>Kateqoriya: </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              <option value="all">Hamısı</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {isLoading && products.length === 0 ? (
            <div>
              <h1>Products loading...</h1>
              <img src={loader} className={styles.loaderImg} alt="loaderImg" />
            </div>
          ) : (
            <>
              <div className={styles.productsList}>
                {products.map((product) => (
                  <Product
                    key={product.key}
                    showAddToCart={true}
                    product={product}
                    handleProduct={handleAddToCart}
                  />
                ))}
              </div>
              {hasMore && (
                <button
                  className="btn btn-primary"
                  style={{ margin: "32px auto", display: "block" }}
                  onClick={handleShowMore}
                  disabled={isLoading}
                >
                  Daha çox göstər
                </button>
              )}
            </>
          )}
        </div>
        <div className={styles.cartCol}>
          <Cart cart={cart}>
            <Link to="/review">
              <button className="btn btn-secondary">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
