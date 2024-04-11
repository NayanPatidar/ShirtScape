import React, { useState } from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import Wishlist from "./components/Wishlist/Wishlist";
import Product from "./components/Product/Product";
import Cart from "./pages/Cart/Cart";
import { SearchContext } from "./contexts/contexts";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<ProductsPage />} />
          <Route path="/products">
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
