import React, { useEffect, useState } from "react";
import "./Cart.css";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";

const Cart = () => {
  const [CartItems, SetCartItems] = useState(null);
  const [Size, setSize] = useState(false);
  const [SizeOption, setSizeOption] = useState("S");
  const [Qty, setQty] = useState(false);
  const [QtyOption, setQtyOption] = useState(1);

  const sizeToggle = () => {
    setSize(!Size);
  };

  const sizeToggleOff = () => {
    if (Size) {
      setSize(false);
    }
  };

  const qtyToggle = () => {
    setQty(!Qty);
  };

  const qtyToggleOff = () => {
    if (Qty) {
      setQty(false);
    }
  };

  const setQtyType = (SortType) => {
    setQtyOption(SortType);
  };

  const setSizeType = (SortType) => {
    setSizeOption(SortType);
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
        // console.log(data.CartData[0].cloths.price);
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
      <div className=" w-screen flex flex-col" onClick={sizeToggleOff}>
        <div className=" bg-gray-800 h-16"></div>
        <div
          className=" flex flex-row justify-center gap-6 p-5"
          onClick={() => {
            sizeToggleOff();
            qtyToggleOff();
          }}
        >
          <div className=" w-6/12 flex flex-col gap-4">
            {CartItems &&
              CartItems.map((products, index) => (
                <div
                  className="ProductsBlockMain text-black flex flex-row"
                  key={index}
                >
                  <img
                    className="ImageOfCartItem"
                    src={products.cloths.photo1}
                  ></img>
                  <div className="CartItemDetails flex flex-col">
                    <span className="CartItemTitle">
                      {products.cloths.product_name}
                    </span>
                    <span className="CartItemDescription">
                      {products.cloths.genericdesc}
                    </span>
                    <span className="SizeQty mt-6 flex flex-row justify-start gap-4">
                      <div className=" flex flex-col w-5/12">
                        <div
                          className=" SizeBox flex flex-row justify-center gap-1 cursor-pointer"
                          onClick={sizeToggle}
                        >
                          <div className=" SizeTab">Size: {SizeOption}</div>
                          <div className=" flex items-center">
                            <MdArrowDropDown className=" size-4" />
                          </div>
                        </div>
                      </div>

                      <div className=" flex flex-col w-5/12">
                        <div
                          className=" SizeBox flex flex-row justify-center gap-1 cursor-pointer"
                          onClick={qtyToggle}
                        >
                          <div className=" SizeTab">Qty: {QtyOption}</div>
                          <div className=" flex items-center">
                            <MdArrowDropDown className=" size-4" />
                          </div>
                        </div>
                      </div>
                    </span>
                    <span className="PriceCartItem flex flex-row gap-2 pt-5">
                      <span className=" MainPrice">
                        ₹{products.cloths.price}
                      </span>
                      <span className=" MRPCart line-through">
                        ₹{products.cloths.mrp}
                      </span>
                      <span className=" DiscountCart">
                        {products.cloths.discount}% OFF
                      </span>
                    </span>
                    <span className=" CartPorductInfo flex mt-1">
                      <IoIosReturnLeft className=" size-4 flex align-middle items-center justify-center" />
                      <span>
                        <span className=" CartProductInfoStyle">14 days </span>
                        return available
                      </span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="ProductsPricesBlock w-4/12 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
