import React, { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { CartDropdownContext } from "../../contexts/CartDropDown";

const CartProduct = ({ index }) => {
  const [Size, setSize] = useState(false);
  const [SizeOption, setSizeOption] = useState("S");
  const [Qty, setQty] = useState(false);
  const [QtyOption, setQtyOption] = useState(1);

  const { products, DropDown, UpdatedDropDown } =
    useContext(CartDropdownContext);

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

  useEffect(() => {
    sizeToggleOff();
    qtyToggleOff();
    UpdatedDropDown(false);
    console.log("Toggle Off the Size and Quantity");
  }, [DropDown]);

  return (
    <div>
      <div className="ProductsBlockMain text-black flex flex-row" key={index}>
        <img className="ImageOfCartItem" src={products.cloths.photo1}></img>
        <div className="CartItemDetails flex flex-col">
          <span className="CartItemTitle">{products.cloths.product_name}</span>
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
              {Size ? (
                <ul className=" SizeDropDown mt-2 flex flex-col items-center bg-white z-10 cursor-pointer">
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setSizeOption("S")}
                  >
                    S
                  </li>
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setSizeOption("M")}
                  >
                    M
                  </li>
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setSizeOption("L")}
                  >
                    L
                  </li>
                </ul>
              ) : (
                ""
              )}
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
              {Qty ? (
                <ul className=" SizeDropDown mt-2 flex flex-col items-center bg-white z-10 cursor-pointer">
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setQtyOption(1)}
                  >
                    1
                  </li>
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setQtyOption(2)}
                  >
                    2
                  </li>
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setQtyOption(3)}
                  >
                    3
                  </li>
                  <li
                    className="flex w-full justify-center text-xs hover:bg-slate-300"
                    onClick={() => setQtyOption(4)}
                  >
                    4
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </span>
          <span className="PriceCartItem flex flex-row gap-2 pt-5">
            <span className=" MainPrice">₹{products.cloths.price}</span>
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
    </div>
  );
};

export default CartProduct;
