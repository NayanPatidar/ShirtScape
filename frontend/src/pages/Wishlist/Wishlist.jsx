import React, { useContext, useEffect, useState } from "react";
import "./Wishlist.css";
import { getCookie } from "../../services/cookieOperations";
import { AuthContext } from "../../contexts/AuthContexts";
import { IoCloseCircleOutline } from "react-icons/io5";

const Wishlist = () => {
  const [WishlistProducts, SetWishlistProducts] = useState("");
  const { isUserLoggedIn } = useContext(AuthContext);

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
        console.log("Data from the Wishlist : ", data.products);
        SetWishlistProducts(data.products);
      })
      .catch((error) => {
        console.error("Error Adding product to wishlist :", error.message);
      });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      FetchTheWishlistProducts();
    }
  }, []);

  return (
    <div>
      <div className="MainWishlistBox">
        <span className=" WishlistAreaTitle">My Wishlist</span>
        <div className=" grid grid-cols-4 gap-10 mt-5">
          {WishlistProducts != "" &&
            WishlistProducts.map((product, index) => (
              <div key={index} className=" WishlistProductCard ">
                <div className=" flex flex-col justify-end items-end ">
                  <IoCloseCircleOutline className="text-black z-100 flex items-end translate-y-5" />
                  <img
                    src={product.cloths.photo1}
                    className=" WishlsitProductPhoto"
                  />
                </div>
                <div className=" flex flex-col justify-center pl-3 pr-3">
                  <span className="WishlistProductName mt-2">
                    {product.cloths.product_name}
                  </span>
                  <span className="WishlistProductDesc">
                    {product.cloths.genericdesc}
                  </span>
                  <span className="WishlistProductPrice flex flex-row gap-2">
                    <span className=" CurrentPrice">
                      ₹{product.cloths.price}
                    </span>
                    <span className=" CurrentMRP">₹{product.cloths.mrp}</span>
                  </span>
                </div>
                <div className="MoveToCartButton flex flex-row cursor-pointer">
                  <span className=" ButtonTextMoveToCart">MOVE TO CART</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
