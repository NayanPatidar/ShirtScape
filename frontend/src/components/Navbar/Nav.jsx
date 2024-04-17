import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import "./Nav.css";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AuthContext, SearchContext } from "../../contexts/contexts";

function Navbar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { isUserLoggedIn, setIsUserLogIn } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 800);
    return () => clearTimeout(delaySearch);
  }, [inputValue]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

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
              className=" hover:underline text-black cursor-pointer mt-2"
              onClick={() => navigate("/men")}
            >
              MEN
            </div>
            <div className=" hover:underline text-black cursor-pointer mt-2">
              NEW ARRIVALS
            </div>
            <div className=" text-black text-md pb-4">
              <form className="SearchBox">
                <label className=" flex w-96 items-center justify-center">
                  <input
                    type="text"
                    className="inputBoxNavBar  rounded-md border border-black"
                    placeholder=" What are you looking for ? "
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                  <IoSearch className=" searchIcon" />
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around items-center w-1/6">
          <CiUser
            className=" size-8 text-black"
            onClick={
              isUserLoggedIn
                ? () => navigate("/profile")
                : () => navigate("/signin")
            }
          />
          <CiHeart
            className=" size-8 text-black"
            onClick={() => navigate("/wishlist")}
          />
          <CiShoppingCart
            className=" size-8 text-black"
            onClick={() => navigate("/checkout/cart")}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
