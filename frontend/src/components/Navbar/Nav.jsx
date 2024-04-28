import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
import "./Nav.css";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { SearchContext } from "../../contexts/contexts";
import { AuthContext } from "../../contexts/AuthContexts";
import { IoHomeSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";

function Navbar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { isUserLoggedIn } = useContext(AuthContext);
  const { cartVisibility, setCartVisibility } = useContext(SearchContext);

  const searchHandler = (e) => {
    navigate("/men");
    setSearchTerm(e.target.value);
  };

  function preventEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  const debounce = (cb, delay) => {
    let timer;
    return (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = cb(e);
      }, delay);
    };
  };

  const searchProcess = debounce(searchHandler, 400);

  const navigate = useNavigate();

  return (
    <>
      {cartVisibility ? (
        <div className="NavBarMain flex flex-col fixed shadow-md ">
          <div className=" h-16 pl-5 flex flex-row items-center justify-between">
            <div className="flex flex-row justify-start items-center w-3/5">
              <img
                src={logo}
                alt="LOGO"
                className="logo"
                onClick={() => navigate("/")}
              />
              <div className="NavBarObj flex flex-row justify-start gap-40 w-8/12 text-black">
                <div className=" flex flex-row gap-10">
                  <div
                    className="TextNavbarCategories cursor-pointer mt-2 flex flex-col justify-center items-center"
                    onClick={() => navigate("/")}
                  >
                    <IoHomeSharp className=" HomeShopIcons  text-black" />
                    <span className=" HomeTitle">HOME</span>
                  </div>
                  <div
                    className="TextNavbarCategories cursor-pointer mt-2 flex flex-col justify-center items-center"
                    onClick={() => navigate("/men")}
                  >
                    <FaShoppingBag className=" HomeShopIcons  text-black" />
                    <span className=" HomeTitle">SHOP</span>
                  </div>
                </div>

                <div className=" text-black text-md pb-4 flex justify-center items-center">
                  <form className="SearchBox">
                    <label className=" flex w-96 items-center justify-center">
                      <input
                        type="text"
                        className="inputBoxNavBar  rounded-md border border-black"
                        placeholder={" What are you looking for ? "}
                        onChange={searchProcess}
                        onKeyDown={preventEnter}
                      />
                      <IoSearch className=" searchIcon" />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center w-1/6">
              <FaRegUserCircle
                className=" size-6 text-black"
                onClick={
                  isUserLoggedIn
                    ? () => navigate("/profile")
                    : () => navigate("/signin")
                }
              />
              <FaRegHeart
                className="IconNavbarTypes size-6 text-black"
                onClick={() => navigate("/wishlist")}
              />
              <LuShoppingCart
                className="IconNavbarTypes size-6 text-black"
                onClick={() => {
                  navigate("/cart");
                  setCartVisibility(false);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
}

export default Navbar;
