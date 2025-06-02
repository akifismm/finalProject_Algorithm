import React, { useState, useEffect } from 'react';
import styles from './Inventory.module.css';

const LOCAL_KEY = "inventory_products";

const Inventory = () => {
  const [form, setForm] = useState({ name: "", price: "", img: "" });
  const [products, setProducts] = useState([]);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // Məhsullar dəyişəndə localStorage-a yaz
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(products));
  }, [products]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddInventory = e => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setProducts([...products, form]);
    setForm({ name: "", price: "", img: "" });
  };

  const handleImgClick = (imgUrl) => {
    setModalImg(imgUrl);
  };

  const handleCloseModal = () => {
    setModalImg(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add more product to sell...</h2>
      <form onSubmit={handleAddInventory} className={styles.form}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          required
          className={styles.input}
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          min="0"
          required
          className={styles.input}
        />
        <input
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Inventory</button>
      </form>
      {products.length > 0 && (
        <div className={styles.list}>
          <div className={styles.listTitle}>Inventory List</div>
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {products.map((p, i) => (
              <li key={i} className={styles.item}>
                {p.img && (
                  <img
                    src={p.img}
                    alt=""
                    className={styles.img}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleImgClick(p.img)}
                  />
                )}
                <strong>{p.name}</strong> — ${p.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal */}
      {modalImg && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <img src={modalImg} alt="Large" className={styles.modalImg} />
            <button className={styles.closeBtn} onClick={handleCloseModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;