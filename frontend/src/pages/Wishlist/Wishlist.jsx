import React, { useState } from "react";
import "./Wishlist.css";
import { getCookie } from "../../services/cookieOperations";

const Wishlist = () => {
  const [WishlistProducts, SetWishlistProducts] = useState("");

  const FetchTheWishlistProducts = () => {
    const token = getCookie("sscape");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://localhost:8080/wishlist/allProducts", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from the Wishlist : ", data);
      })
      .catch((error) => {
        console.error("Error Adding product to wishlist :", error.message);
      });
  };

  return (
    <div>
      <div className="MainWishlistBox">
        <span className=" WishlistAreaTitle">My Wishlist</span>
        <div></div>
      </div>
    </div>
  );
};

export default Wishlist;
