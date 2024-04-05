import React, { useEffect, useState } from "react";
import "./Cart.css";
import { MdArrowDropDown } from "react-icons/md";

const Cart = () => {
  const [CartItems, SetCartItems] = useState(null);
  const [Size, setSize] = useState(true);
  const [SizeOption, setSizeOption] = useState("S");

  const sizeToggle = () => {
    setSize(!Size);
  };

  const sizeToggleOff = () => {
    if (Size) {
      setSize(false);
    }
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
        SetCartItems(data);
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
        <div className=" flex flex-row justify-center gap-6 p-5">
          <div className=" w-6/12 flex flex-col gap-4">
            <div
              className="ProductsBlockMain text-black flex flex-row"
              onClick={sizeToggleOff}
            >
              <img
                className="ImageOfCartItem"
                src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/25072090/2023/9/30/6be97619-12fc-40c3-a91b-b5d5f13ba8181696013416163StormbornMenBlackPrintedRawEdgeT-shirt1.jpg"
              ></img>
              <div className="CartItemDetails flex flex-col">
                <span className="CartItemTitle">Stormborn</span>
                <span className="CartItemDescription">
                  Seeleves Tshirt Cotton Printed
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
                    {Size ? (
                      <ul className=" SizeDropDown mt-2 flex flex-col items-center bg-white z-10 cursor-pointer">
                        <li className="flex w-full justify-center text-xs hover:bg-slate-300">
                          S
                        </li>
                        <li className="flex w-full justify-center text-xs hover:bg-slate-300">
                          M
                        </li>
                        <li className="flex w-full justify-center text-xs hover:bg-slate-300">
                          L
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className=" QtyBox w-5/12">
                    <div className=" QtyTab"></div>
                  </div>
                </span>
                <span className="PriceCartItem"></span>
              </div>
            </div>
          </div>
          <div className="ProductsPricesBlock w-4/12 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
