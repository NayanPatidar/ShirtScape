import React, { useContext, useEffect, useState } from "react";
import "./Wishlist.css";
import { getCookie } from "../../services/cookieOperations";
import { AuthContext } from "../../contexts/AuthContexts";
import { IoClose } from "react-icons/io5";
import {
  MoveProductToCart,
  RemoveProductFromWishlist,
} from "../../handlers/WishlistHandlers";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [WishlistProducts, SetWishlistProducts] = useState("");
  const { isUserLoggedIn } = useContext(AuthContext);
  const [WishlistChanged, setWishlistChange] = useState(false);

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

  const FetchWishlistProductsFromLocalStorage = async () => {
    let LocalCartData = JSON.parse(localStorage.getItem("ShirtScape_Wishlist"));
    if (!LocalCartData) {
      return;
    }
    try {
      const productIds = LocalCartData.map((item) => parseInt(item.id));
      let FetchedLocalCartData = await fetch(
        "http://localhost:8080/cart/tempUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        }
      );
      if (FetchedLocalCartData.ok) {
        const data = await FetchedLocalCartData.json();
      }
    } catch (error) {
      console.log("Error fetching the data: ", error.message);
    }
  };

  const HandleRemoveProductFromWishlist = (product_id) => {
    if (isUserLoggedIn) {
      RemoveProductFromWishlist(product_id);
      setWishlistChange(!WishlistChanged);
    }
  };

  const ProductClickeOnWishlist = (product_id) => {
    navigate(`/products/${product_id}`);
  };

  const MoveProductToWishlist = (product_id) => {
    if (isUserLoggedIn) {
      MoveProductToCart(product_id);
      setTimeout(() => {
        setWishlistChange(!WishlistChanged);
      }, 1000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      FetchTheWishlistProducts();
    } else {
      FetchWishlistProductsFromLocalStorage();
    }
  }, [WishlistChanged]);

  return (
    <div>
      <div className="MainWishlistBox">
        <span className=" WishlistAreaTitle">My Wishlist</span>
        <div className=" grid grid-cols-4 gap-10 mt-5">
          {WishlistProducts != "" &&
            WishlistProducts.map((product, index) => (
              <div key={index} className=" WishlistProductCard ">
                <div className=" flex flex-col justify-end items-end relative">
                  <IoClose
                    className="text-white z-100 absolute top-2 right-2 size-5 cursor-pointer"
                    onClick={() => {
                      HandleRemoveProductFromWishlist(
                        product.cloths.product_id
                      );
                    }}
                  />
                  <img
                    src={product.cloths.photo1}
                    className=" WishlsitProductPhoto cursor-pointer"
                    onClick={() =>
                      ProductClickeOnWishlist(product.cloths.product_id)
                    }
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
                <div
                  className="MoveToCartButton flex flex-row cursor-pointer"
                  onClick={() =>
                    MoveProductToWishlist(product.cloths.product_id)
                  }
                >
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
