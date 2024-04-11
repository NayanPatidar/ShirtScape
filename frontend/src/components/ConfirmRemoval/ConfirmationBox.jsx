import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/contexts";
import { IoMdClose } from "react-icons/io";
import "./Confirmation.css";
import { RiErrorWarningFill } from "react-icons/ri";
import { DeleteProductFromLocalStorage } from "../../services/storageOperations";

const ItemRemovalBox = () => {
  const {
    IsItemRemovalMenuOpen,
    setIsItemRemovalMenuOpen,
    productId,
    ItemRemovalDone,
    setRemovalDone,
  } = useContext(CartContext);

  const handleYes = () => {
    DeleteProductFromLocalStorage(productId);
    setRemovalDone(!ItemRemovalDone);
    handleCloseRemovalBox();
  };

  const handleNo = () => {
    handleCloseRemovalBox();
  };

  const handleCloseRemovalBox = () => {
    if (IsItemRemovalMenuOpen) {
      setIsItemRemovalMenuOpen(false);
    }
  };

  return (
    <div className="ItemRemovalBox flex flex-col justify-between ">
      <div className=" flex flex-row w-full justify-between items-center">
        <span className=" RemovalTitle flex items-center gap-2">
          <RiErrorWarningFill />
          Remove the Item from the Cart
        </span>
        <span>
          <IoMdClose
            onClick={handleCloseRemovalBox}
            className="cursor-pointer"
          />
        </span>
      </div>
      <span className=" RemovalDesc">
        Are you sure you want to remove the item from the cart ?
      </span>
      <div className=" submitSize flex justify-center align-middle items-center gap-10">
        <button className=" SubmitRemoval " onClick={() => handleYes()}>
          YES
        </button>
        <button className=" SubmitRemoval " onClick={() => handleNo()}>
          NO
        </button>
      </div>
    </div>
  );
};

export default ItemRemovalBox;
