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
import {
  AddProduct,
  DeleteProductOfWishlistFromLocalStorage,
} from "../../services/storageOperations";
import { SearchContext } from "../../contexts/contexts";

const Wishlist = () => {
  const [WishlistProducts, SetWishlistProducts] = useState(null);
  const { isUserLoggedIn } = useContext(AuthContext);
  const [WishlistChanged, setWishlistChange] = useState(false);
  const { setCartVisibility } = useContext(SearchContext);

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
        "http://localhost:8080/wishlist/tempUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        }
      );
      if (FetchedLocalCartData.ok) {
        const data = await FetchedLocalCartData.json();
        if (data.CartData != undefined) {
          SetWishlistProducts(data.CartData);
        } else {
          SetWishlistProducts({
            products: [],
          });
        }
      }
    } catch (error) {
      console.log("Error fetching the data: ", error.message);
    }
  };

  const HandleRemoveProductFromWishlist = (product_id) => {
    if (isUserLoggedIn) {
      RemoveProductFromWishlist(product_id);
      setWishlistChange(!WishlistChanged);
    } else {
      DeleteProductOfWishlistFromLocalStorage(product_id);
      setWishlistChange(!WishlistChanged);
    }
  };

  const ProductClickeOnWishlist = (product_id) => {
    navigate(`/products/${product_id}`);
  };

  const MoveProductToCartFunction = (product_id) => {
    if (isUserLoggedIn) {
      MoveProductToCart(product_id);
      setTimeout(() => {
        setWishlistChange(!WishlistChanged);
      }, 1000);
    } else {
      AddProduct({ product_id: product_id, size: `S` });
      DeleteProductOfWishlistFromLocalStorage(product_id);
      setTimeout(() => {
        setWishlistChange(!WishlistChanged);
      }, 1000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    setCartVisibility(true);
    if (isUserLoggedIn) {
      FetchTheWishlistProducts();
    } else {
      FetchWishlistProductsFromLocalStorage();
    }
  }, [WishlistChanged]);

  return (
    <div>
      <div className="MainWishlistBox">
        {WishlistProducts ? (
          WishlistProducts.length > 0 ? (
            <div>
              <span className=" WishlistAreaTitle">My Wishlist</span>
              <div className=" grid grid-cols-4 gap-10 mt-5">
                {WishlistProducts != "" &&
                  WishlistProducts &&
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
                          <span className=" CurrentMRP">
                            ₹{product.cloths.mrp}
                          </span>
                        </span>
                      </div>
                      <div
                        className="MoveToCartButton flex flex-row cursor-pointer"
                        onClick={() =>
                          MoveProductToCartFunction(product.cloths.product_id)
                        }
                      >
                        <span className=" ButtonTextMoveToCart">
                          MOVE TO CART
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className=" flex flex-col gap-5 justify-center items-center align-middle mt-52">
              <span className="text-3xl font-semibold  ">
                Nothing in the Wishlist ! Shop to add it
              </span>
              <div
                className=" bg-black w-52 h-12 justify-center items-center flex cursor-pointer text-white text-xl"
                onClick={() => navigate("/men")}
              >
                SHOP NOW
              </div>
            </div>
          )
        ) : (
          <div className=" flex flex-col gap-5 justify-center items-center align-middle mt-52">
            <span className="text-3xl font-semibold  ">Loading ...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
