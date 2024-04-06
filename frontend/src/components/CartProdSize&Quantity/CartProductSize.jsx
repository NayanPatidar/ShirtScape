import React, { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { CartDropdownContext } from "../../contexts/CartDropDown";
import "./CartProduct.css";

const CartProductSize = ({ products, index }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <div className="SizeSelectionBox flex flex-col justify-between ">
        <div className=" ClothData flex flex-row ">
          <div className="ImageCloth">
            {products && (
              <img
                className="SizeSelectionPhoto"
                src={products.cloths.photo1}
              />
            )}
          </div>
          <div className="Description flex flex-col pt-1 justify-around pl-2">
            <span className=" SizeSelectionTitle">
              {products.cloths.product_name}
            </span>
            <span className=" SizeSelectionAbout">
              {products.cloths.genericdesc}
            </span>
            <span className=" SizeSelectionPrices flex flex-row gap-2">
              <span className=" MainPrice">₹{products.cloths.price}</span>
              <span className=" MRPCart line-through">
                ₹{products.cloths.mrp}
              </span>
              <span className=" DiscountCart">
                {products.cloths.discount}% OFF
              </span>
            </span>
          </div>
        </div>
        <div className=" flex gap-10 mt-5 cursor-pointer self-center">
          <span
            className={`sizeDot ${selectedSize === "S" ? "active" : ""}`}
            onClick={() => handleSizeClick("S")}
          >
            S
          </span>
          <span
            className={`sizeDot ${selectedSize === "M" ? "active" : ""}`}
            onClick={() => handleSizeClick("M")}
          >
            M
          </span>
          <span
            className={`sizeDot ${selectedSize === "L" ? "active" : ""}`}
            onClick={() => handleSizeClick("L")}
          >
            L
          </span>
          <span
            className={`sizeDot ${selectedSize === "XL" ? "active" : ""}`}
            onClick={() => handleSizeClick("XL")}
          >
            XL
          </span>
        </div>
        <div className=" submitSize flex justify-center align-middle items-center">
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default CartProductSize;
