import React from "react";
import Navbar from "../../components/Navbar/Nav";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

const Address = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="MyProfile h-96 w-4/6 pl-10">
          <span className=" MyProfileTitle">ADDRESS</span>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Address;
