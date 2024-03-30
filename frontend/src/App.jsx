import React from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Nav";
import { Route, Router, Routes } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/checkout/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
