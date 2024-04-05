import React, { useEffect, useState } from "react";
import "./Cart.css";
import { CartDropdownContext } from "../../contexts/CartDropDown";
import CartProduct from "../../components/CartProduct/CartProduct";

const Cart = () => {
  const [CartItems, SetCartItems] = useState(null);
  const [DropDown, SetDropdown] = useState(false);

  const ToggleDropdown = () => {
    SetDropdown(true);
    console.log("Body has been clicked");
  };

  const UpdatedDropDown = (val) => {
    SetDropdown(val);
  };

  const FetchCartData = async () => {
    try {
      let LocalCartData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
      const productIds = LocalCartData.map((item) => parseInt(item.id));
      let FetchedLocalCartData = await fetch(
        "http://localhost:8080/cart/tempUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        }
      );
      if (FetchedLocalCartData.ok) {
        const data = await FetchedLocalCartData.json();
        SetCartItems(data.CartData);
      }
    } catch (error) {
      console.log("Error fetching the data: ", error.message);
    }
  };

  useEffect(() => {
    FetchCartData();
  }, []);

  return (
    <div>
      <div className=" w-screen flex flex-col">
        <div className=" bg-gray-400 h-16"></div>
        <div
          className=" flex flex-row justify-center gap-6 p-5 "
          onClick={() => ToggleDropdown()}
        >
          <div className=" w-6/12 flex flex-col gap-4 ">
            {CartItems &&
              CartItems.map((products, index) => (
                <CartDropdownContext.Provider
                  key={index}
                  value={{ products, DropDown, UpdatedDropDown }}
                >
                  <CartProduct index={index} />
                </CartDropdownContext.Provider>
              ))}
          </div>
          <div className="ProductsPricesBlock w-4/12 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
