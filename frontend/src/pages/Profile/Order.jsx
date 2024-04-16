import React from "react";
import Navbar from "../../components/Navbar/Nav";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

const Order = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="  h-96 w-4/6"></div>
      </div>
    </div>
  );
};

export default Order;
