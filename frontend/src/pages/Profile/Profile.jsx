import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Nav";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { AuthContext, SearchContext } from "../../contexts/contexts";
import { getCookie } from "../../services/cookieOperations";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    try {
      const userData = jwtDecode(getCookie("sscape"));
      setUserData(userData.userData);
      setCartVisibility(true);
    } catch (error) {
      logout();
      navigate("/signin");
      console.log(error.message);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="MyProfile h-96 w-4/6 pl-10">
          <span className=" MyProfileTitle">MY PROFILE</span>
          <div className=" MyProfileBox">
            <div className="DetailsProfile">
              <div className=" flex flex-row gap-2">
                <span>Username </span>{" "}
                <span className=" text-red-500"> {userData.username}</span>
              </div>
              <div className=" flex flex-row gap-2">
                <span>Email </span>{" "}
                <span className=" text-red-500"> {userData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
