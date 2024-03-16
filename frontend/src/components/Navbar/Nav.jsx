import React from "react";
import logo from "../../assets/logo/logo.png";
import "./Nav.css";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

function Navbar() {
  return (
    <div className=" w-screen flex flex-col ">
      <div className=" h-20 bg-white pl-5 flex flex-row items-center justify-between w-screen">
        <div className="flex flex-row justify-start items-center w-3/5">
          <img src={logo} alt="LOGO" className="logo w-24" />
          <div className="NavBarObj flex flex-row justify-around w-8/12 text-black">
            <div className=" hover:underline text-black">MEN</div>
            <div className=" hover:underline text-black">NEW ARRIVALS</div>
            <div className=" text-black text-md">
              <form className="SearchBox">
                <label>
                  <input
                    type="text"
                    autocomplete="off"
                    className="inputBoxNavBar  rounded-md border border-black"
                    placeholder=" What are you looking for ?"
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around items-center w-1/6">
          <CiUser className=" size-8 text-black" />
          <CiHeart className=" size-8 text-black" />
          <CiShoppingCart className=" size-8 text-black" />
        </div>
      </div>
      <div className=" h-3 bg-black"></div>
    </div>
  );
}

export default Navbar;
