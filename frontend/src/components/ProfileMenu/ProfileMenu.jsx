import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/contexts";

const ProfileMenu = () => {
  const { login, logout, isUserLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/signin");
    logout();
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      {isUserLoggedIn ? (
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
            <div
              className="ProfileMenuOptionLogout h-10  text-white cursor-pointer"
              onClick={() => Logout()}
            >
              Log out
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default ProfileMenu;
