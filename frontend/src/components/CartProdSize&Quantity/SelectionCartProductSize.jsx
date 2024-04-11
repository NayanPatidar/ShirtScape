import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/contexts";
import { IoMdClose } from "react-icons/io";
import "./SelectionCartProduct.css";

const CartProductSize = () => {
  const [selectedSize, setTempSize] = useState("S");
  const {
    isSizeMenuOpen,
    setIsSizeMenu,
    product,
    setSize,
    setReference,
    itemIndex,
    SizeMenuDone,
    setSizeMenuDone,
  } = useContext(CartContext);

  const handleTempSizeClick = (size) => {
    setTempSize(size);
  };

  const handleDone = () => {
    setSize(selectedSize);
    setReference(itemIndex);
    setSizeMenuDone(!SizeMenuDone);
    console.log("Reference has been set");
    handleCloseSizeMenu();
  };

  const handleCloseSizeMenu = () => {
    if (isSizeMenuOpen) {
      setIsSizeMenu(false);
    }
  };

  return (
    <div>
      <div className="SizeSelectionBox flex flex-col justify-between ">
        <div className=" ClothData flex flex-row justify-start">
          <div className="ImageCloth w-1/6">
            {product && (
              <img className="SizeSelectionPhoto" src={product.cloths.photo1} />
            )}
          </div>
          <div className="Description flex flex-col pt-1 justify-around pl-2 w-5/12">
            <span className=" SizeSelectionTitle flex flex-row  justify-between">
              {product.cloths.product_name}
            </span>
            <span className=" SizeSelectionAbout">
              {product.cloths.genericdesc}
            </span>
            <span className=" SizeSelectionPrices flex flex-row gap-2">
              <span className=" MainPrice">₹{product.cloths.price}</span>
              <span className=" MRPCart line-through">
                ₹{product.cloths.mrp}
              </span>
              <span className=" DiscountCart">
                {product.cloths.discount}% OFF
              </span>
            </span>
          </div>
          <div className=" flex flex-row w-5/12 justify-end">
            <span>
              <IoMdClose
                onClick={handleCloseSizeMenu}
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
              onClick={() => handleTempSizeClick("S")}
            >
              S
            </span>
            <span
              className={`sizeDot ${selectedSize === "M" ? "active" : ""}`}
              onClick={() => handleTempSizeClick("M")}
            >
              M
            </span>
            <span
              className={`sizeDot ${selectedSize === "L" ? "active" : ""}`}
              onClick={() => handleTempSizeClick("L")}
            >
              L
            </span>
            <span
              className={`sizeDot ${selectedSize === "XL" ? "active" : ""}`}
              onClick={() => handleTempSizeClick("XL")}
            >
              XL
            </span>
          </div>
        </div>
        <div className=" submitSize flex justify-center align-middle items-center">
          <button className=" SelectionSubmit " onClick={() => handleDone()}>
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductSize;
