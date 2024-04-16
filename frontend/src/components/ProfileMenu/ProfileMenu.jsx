import React from "react";

const ProfileMenu = () => {
  return (
    <div>
      <div className="h-96 flex flex-col pt-24 gap-5">
        <div>
          <div className="ProfileMenuOption h-10 cursor-pointer">Profile</div>
          <div className="ProfileMenuOption h-10 cursor-pointer">Orders</div>
          <div className="ProfileMenuOption3 h-10 cursor-pointer">Address</div>
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
