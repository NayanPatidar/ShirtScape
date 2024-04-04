import React from "react";
import "./Cart.css";

const Cart = () => {
  return (
    <div>
      <div className=" w-screen flex flex-col">
        <div className=" bg-gray-800 h-16"></div>
        <div className=" flex flex-row justify-center gap-4 p-5">
          <div className="  w-3/6">
            <div className="ProductsBlockMain text-black"></div>
          </div>
          <div className="ProductsPricesBlock w-2/6 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
