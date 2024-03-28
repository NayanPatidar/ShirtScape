import React from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Nav";
import { Route, Router, Routes } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
