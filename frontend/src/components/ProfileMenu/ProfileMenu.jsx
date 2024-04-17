import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="h-96 flex flex-col pt-24 gap-5">
        <div>
          <div
            className="ProfileMenuOption h-10 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>
          <div
            className="ProfileMenuOption h-10 cursor-pointer"
            onClick={() => navigate("/orders")}
          >
            Orders
          </div>
          <div
            className="ProfileMenuOption3 h-10 cursor-pointer"
            onClick={() => navigate("/address")}
          >
            Address
          </div>
        </div>
        <div>
          <div className="ProfileMenuOption h-10 bg-red-500 text-white cursor-pointer">
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
