import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Notfound from "./components/Notfound/Notfound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Shop} />
        <Route path="/shop" component={Shop} />
        <Route path="/review" component={Review} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/product/:productKey" component={ProductDetails} />
        <Route path="/login" component={Login} />
        <Route path="*" component={Notfound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
