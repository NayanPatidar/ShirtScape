import React, { useContext, useEffect, useState } from "react";
import { SizeSelectionContext } from "../../contexts/CartSizeSelection";
import { IoMdClose } from "react-icons/io";
import "./SelectionCartProduct.css";

const CartProductQuantity = () => {
  const [selectedQuantity, setTempQuantity] = useState("");
  const {
    setReference,
    itemIndex,
    done,
    setDone,
    quantity,
    setQuantity,
    isQuantityMenuOpen,
    setIsQuantityMenuOpen,
  } = useContext(SizeSelectionContext);

  //   const handleDone = () => {
  //     setSize(selectedSize);
  //     setReference(itemIndex);
  //     setDone(!done);
  //     console.log("Reference has been set");
  //     handleCloseSizeMenu();
  //   };

  const handleCloseQuantityMenu = () => {
    if (isQuantityMenuOpen) {
      setIsQuantityMenuOpen(false);
    }
  };

  const handleTempQuantityClick = (size) => {
    setTempQuantity(size);
  };

  useEffect(() => {
    console.log("Selection Cart Product Quantity");
  }, []);

  return (
    <div>
      <div className="QuantitySelectionBox flex flex-col justify-between ">
        <div className=" ClothData flex flex-row justify-start">
          <div className=" flex flex-row w-5/12 justify-end">
            <span>
              <IoMdClose
                onClick={handleCloseQuantityMenu}
                className="cursor-pointer"
              />
            </span>
          </div>
        </div>
        <div className=" flex flex-col ">
          <span className=" SelectQuantityHeading">Select Quantity</span>
          <div className=" flex gap-10 mt-5 cursor-pointer self-center">
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
        <div className=" submitQuantity flex justify-center align-middle items-center">
          <button
            className=" SelectionSubmit "
            //   onClick={() => handleDone()}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductQuantity;
