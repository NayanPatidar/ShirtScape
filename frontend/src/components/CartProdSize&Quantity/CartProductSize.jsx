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
      <div className="SizeSelectionBox flex flex-col justify-center align-middle items-center">
        <div className=" ClothData flex flex-col">
          <div className="ImgageCloth">
            {products && <img src={products.cloths.photo1} />}
          </div>
          <div className=""></div>
        </div>
        <div className=" flex gap-10 mt-5 cursor-pointer">
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
