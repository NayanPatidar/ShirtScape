import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import Wishlist from "./components/Wishlist/Wishlist";
import Product from "./components/Product/Product";
import Cart from "./pages/Cart/Cart";
import { AuthContext, SearchContext } from "./contexts/contexts";
import Signin from "./pages/SignIn/Signin";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Profile/Order";
import Address from "./pages/Profile/Address";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserLoggedIn, setIsUserLogIn] = useState(false);

  useEffect(() => {
    console.log(`User Login Status Changed - ${isUserLoggedIn}`);
  }, [isUserLoggedIn]);

  return (
    <div>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLogIn }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<ProductsPage />} />
            <Route path="/products">
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/checkout/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/address" element={<Address />} />
          </Routes>
        </AuthContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
