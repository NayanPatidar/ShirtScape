import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/contexts";
import { IoMdClose } from "react-icons/io";
import "./SelectionCartProduct.css";

const CartProductQuantity = () => {
  const [selectedQuantity, setTempQuantity] = useState("");
  const {
    setReference,
    itemIndex,
    setQuantity,
    isQuantityMenuOpen,
    setIsQuantityMenuOpen,
    QuantityMenuDone,
    setQuantityMenuDone,
  } = useContext(CartContext);

  const handleCloseQuantityMenu = () => {
    if (isQuantityMenuOpen) {
      setIsQuantityMenuOpen(false);
    }
  };

  const handleTempQuantityClick = (size) => {
    setTempQuantity(size);
  };

  const handleDone = () => {
    setQuantity(selectedQuantity);
    setReference(itemIndex);
    setQuantityMenuDone(!QuantityMenuDone);
    handleCloseQuantityMenu();
  };

  return (
    <div>
      <div className="QuantitySelectionBox flex flex-col justify-between ">
        <div>
          <div className=" ClothData flex flex-row justify-start">
            <div className=" flex flex-row w-full justify-end">
              <span>
                <IoMdClose
                  onClick={handleCloseQuantityMenu}
                  className="cursor-pointer"
                />
              </span>
            </div>
          </div>
          <span className=" SelectQuantityHeading">Select Quantity</span>
        </div>
        <div>
          <div className=" flex flex-col ">
            <div className=" flex gap-10 mt-5 cursor-pointer self-center pb-5">
              <span
                className={`quantityDot ${
                  selectedQuantity === 1 ? "active" : ""
                }`}
                onClick={() => handleTempQuantityClick(1)}
              >
                1
              </span>
              <span
                className={`quantityDot ${
                  selectedQuantity === 2 ? "active" : ""
                }`}
                onClick={() => handleTempQuantityClick(2)}
              >
                2
              </span>
              <span
                className={`quantityDot ${
                  selectedQuantity === 3 ? "active" : ""
                }`}
                onClick={() => handleTempQuantityClick(3)}
              >
                3
              </span>
              <span
                className={`quantityDot ${
                  selectedQuantity === 4 ? "active" : ""
                }`}
                onClick={() => handleTempQuantityClick(4)}
              >
                4
              </span>
            </div>
          </div>
          <div className=" submitQuantity flex justify-center align-middle items-center ">
            <button className=" SelectionSubmit " onClick={() => handleDone()}>
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductQuantity;
