import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
import "./Nav.css";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AuthContext, SearchContext } from "../../contexts/contexts";

function Navbar() {
  const { searchTerm, setSearchTerm,  } =
    useContext(SearchContext);
  const { isUserLoggedIn } = useContext(AuthContext);

  const searchHandler = (e) => {
    navigate("/men");
    setSearchTerm(e.target.value);
  };

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

  useEffect(() => {
    console.log(`searchTerm - ${searchTerm}`);
  }, [searchTerm]);

  const navigate = useNavigate();

  return (
    <div className="NavBarMain flex flex-col fixed shadow-md">
      <div className=" h-16 bg-white pl-5 flex flex-row items-center justify-between">
        <div className="flex flex-row justify-start items-center w-3/5">
          <img
            src={logo}
            alt="LOGO"
            className="logo w-16"
            onClick={() => navigate("/")}
          />
          <div className="NavBarObj flex flex-row justify-around w-8/12 text-black">
            <div
              className="TextNavbarCategories cursor-pointer mt-2"
              onClick={() => navigate("/men")}
            >
              MEN
            </div>
            <div className="TextNavbarCategories cursor-pointer mt-2">
              NEW ARRIVALS
            </div>
            <div className=" text-black text-md pb-4">
              <form className="SearchBox">
                <label className=" flex w-96 items-center justify-center">
                  <input
                    type="text"
                    className="inputBoxNavBar  rounded-md border border-black"
                    placeholder={
                      " What are you looking for ? "
                    }
                    onChange={searchProcess}
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
            onClick={() => navigate("/checkout/cart")}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
