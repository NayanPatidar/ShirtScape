import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./Confirmation.css";
import { RiErrorWarningFill } from "react-icons/ri";
import { DeleteProductFromLocalStorage } from "../../services/storageOperations";
import { getCookie } from "../../services/cookieOperations";
import { AuthContext } from "../../contexts/AuthContexts";
import { CartContext } from "../../contexts/contexts";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ItemRemovalBox = () => {
  const {
    IsItemRemovalMenuOpen,
    setIsItemRemovalMenuOpen,
    productId,
    ItemRemovalDone,
    setRemovalDone,
    CartItemID,
  } = useContext(CartContext);

  const { isUserLoggedIn } = useContext(AuthContext);

  const handleYes = () => {
    if (isUserLoggedIn) {
      console.log(CartItemID);
      AllowDelete();
    } else {
      DeleteProductFromLocalStorage(productId);
    }
    setRemovalDone(!ItemRemovalDone);
    window.location.reload();
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

  const AllowDelete = async () => {
    const token = getCookie("sscape");
    const data = {
      cart_item_id: CartItemID,
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    console.log("Delete Item from Cart");
    try {
      let response = await fetch(`${backendUrl}DeleteUserCartItem`, options);
      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
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
