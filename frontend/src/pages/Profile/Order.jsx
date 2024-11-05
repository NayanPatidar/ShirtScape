import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Nav";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { SearchContext } from "../../contexts/contexts";
import { getCookie } from "../../services/cookieOperations";
import { AuthContext } from "../../contexts/AuthContexts";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Order = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const { isUserLoggedIn } = useContext(AuthContext);
  const [OrderDetails, setOrderDetails] = useState();

  const FetchOrder = async () => {
    const token = getCookie("sscape");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response = await fetch(`${backendUrl}FetchOrders`, options);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      } else {
        const Data = await response.json();
        setOrderDetails(Data.CartData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    setCartVisibility(true);
    if (isUserLoggedIn) {
      FetchOrder();
    }
  }, []);

  return (
    <div>
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="MyProfile h-96 w-4/6 pl-10">
          <span className=" MyProfileTitle">ORDERS</span>
          <div className=" flex flex-col gap-5 pb-5">
            {OrderDetails != "" && OrderDetails ? (
              OrderDetails.map((item, index) => (
                <div key={index} className=" flex flex-row border">
                  <img className="ImageOfCartItem " src={item.orders.photo1} />
                  <div className="CartItemDetails flex flex-col w-full">
                    <div className=" flex flex-row justify-between pr-5">
                      <span className="CartItemTitle ">
                        {item.orders.product_name}
                      </span>
                    </div>
                    <span className="CartItemDescription ">
                      {item.orders.genericdesc}
                    </span>
                    <span className="SizeQty mt-6 flex flex-row justify-start gap-4 w-2/5">
                      <div className=" flex flex-col w-5/12">
                        <div className=" SizeBox flex flex-row justify-center ">
                          <div className=" SizeTab flex justify-center">
                            Size: {item.orders.size}
                          </div>
                          <div className=" flex items-center"></div>
                        </div>
                      </div>

                      <div className=" flex flex-col w-5/12">
                        <div className=" SizeBox flex flex-row justify-center ">
                          <div className=" SizeTab flex justify-center">
                            Qty: {item.orders.quantity}
                          </div>
                          <div className=" flex items-center"></div>
                        </div>
                      </div>
                    </span>
                    <span className="PriceCartItem flex flex-row gap-2 pt-5">
                      <span className=" MainPrice">₹{item.orders.price}</span>
                      <span className=" MRPCart line-through">
                        ₹{item.orders.mrp}
                      </span>
                      <span className=" DiscountCart">
                        {item.orders.discount}% OFF
                      </span>
                    </span>
                    <span className=" CartPorductInfo flex mt-1">
                      <span>
                        <span className=" CartProductInfoStyle">14 days </span>
                        return available
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="NoAddressFoundText text-xl ">
                No Orders Found !
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
