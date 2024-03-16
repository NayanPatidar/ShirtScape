import React from "react";
import logo from "../../assets/logo/logo.png";
import "./Nav.css";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <div className=" w-screen flex flex-col ">
      <div className=" h-24 bg-red-500 pl-5 flex flex-row items-center justify-between w-screen">
        <div className="flex flex-row justify-start items-center w-3/5">
          <img src={logo} alt="LOGO" className="logo w-24" />
          <div className="NavBarObj flex flex-row justify-around w-8/12">
            <div className=" hover:underline">MEN</div>
            <div className=" hover:underline">NEW ARRIVALS</div>
            <div className=" text-black text-md">
              <form className="SearchBox">
                <label>
                  <input
                    type="text"
                    autocomplete="off"
                    className="inputBoxNavBar  rounded-md"
                    placeholder=" What are you looking for ?"
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around items-center w-1/5">
          <FaUser className=" size-10 text-white" />
          <CiHeart className=" size-10 text-white" />
          <CiShoppingCart className=" size-10 text-white" />
        </div>
      </div>
      <div className=" h-3" style={{ backgroundColor: "#2D2926FF" }}></div>
    </div>
  );
}

export default Navbar;
