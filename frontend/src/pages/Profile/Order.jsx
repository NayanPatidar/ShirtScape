import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Nav";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { SearchContext } from "../../contexts/contexts";
import { getCookie } from "../../services/cookieOperations";
import { AuthContext } from "../../contexts/AuthContexts";

const Order = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const { isUserLoggedIn } = useContext(AuthContext);

  const FetchOrder = async () => {
    if (isUserLoggedIn) {
      const token = getCookie("sscape");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        let response = await fetch(
          `http://localhost:8080/FetchOrders`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  useEffect(() => {
    setCartVisibility(true);
    FetchOrder();
  }, []);

  return (
    <div>
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="MyProfile h-96 w-4/6 pl-10">
          <span className=" MyProfileTitle">ORDERS</span>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Order;
