import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isRegister ? "Registered!" : "Logged in!");
    setForm({ email: "", password: "", name: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {isRegister && (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            autoComplete="off"
            className={styles.input}
          />
        )}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          autoComplete="off"
          className={styles.input}
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          autoComplete="off"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <div className={styles.switch}>
        {isRegister ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className={styles.link}
              onClick={() => setIsRegister(false)}
            >
              Login
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              className={styles.link}
              onClick={() => setIsRegister(true)}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
