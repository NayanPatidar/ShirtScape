import React, { useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const FetchCartData = async () => {
    try {
      let LocalCartData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
      const productIds = LocalCartData.map((item) => parseInt(item.id));
      console.log(productIds);
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
        console.log(data);
      }
      console.log(FetchedLocalCartData);
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
        <div className=" bg-gray-800 h-16"></div>
        <div className=" flex flex-row justify-center gap-6 p-5">
          <div className=" w-3/6 flex flex-col gap-4">
            <div className="ProductsBlockMain text-black"></div>
          </div>
          <div className="ProductsPricesBlock w-2/6 text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
