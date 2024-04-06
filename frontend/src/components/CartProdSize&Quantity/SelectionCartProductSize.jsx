import React, { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import {
  CartDropdownContext,
  SizeSelectionContext,
} from "../../contexts/CartSizeSelection";
import { IoMdClose } from "react-icons/io";
import "./SelectionCartProduct.css";

const CartProductSize = ({ products, index }) => {
  const [selectedSize, setTempSize] = useState(null);
  const { isModalOpen, setIsModalOpen, product, setProduct } =
    useContext(SizeSelectionContext);

  const handleSizeClick = (size) => {
    setTempSize(size);
  };

  const handleCloseModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="SizeSelectionBox flex flex-col justify-between ">
        <div className=" ClothData flex flex-row justify-start">
          <div className="ImageCloth w-1/6">
            {products && (
              <img
                className="SizeSelectionPhoto"
                src={products.cloths.photo1}
              />
            )}
          </div>
          <div className="Description flex flex-col pt-1 justify-around pl-2 w-5/12">
            <span className=" SizeSelectionTitle flex flex-row  justify-between">
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
          <div className=" flex flex-row w-5/12 justify-end">
            <span>
              <IoMdClose
                onClick={handleCloseModal}
                className="cursor-pointer"
              />
            </span>
          </div>
        </div>
        <div className=" flex flex-col ">
          <span className=" SelectSizeHeading">Select Size</span>
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
        </div>
        <div className=" submitSize flex justify-center align-middle items-center">
          <button className=" SelectionSubmit ">DONE</button>
        </div>
      </div>
    </div>
  );
};

export default CartProductSize;
