import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "../../services/cookieOperations";
import "./UserAddressCard.css";
import { AuthContext } from "../../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

export const AddressList = () => {
  const [Address, setAddress] = useState("");
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = getCookie("sscape");
        console.log("Here In the Fetch Address");
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        let UserAddress = await fetch(
          `http://localhost:8080/FetchAddress`,
          options
        );
        const data = await UserAddress.json();

        if (!UserAddress.ok || UserAddress.message) {
          console.log(`Error: ${data.error}`);
          logout();
          navigate("/signin");
        } else {
          // console.log(data.Address[0].address.address);
          console.log("Fetch : ", data);
          setAddress(data.Address[0].address.address);
        }
      } catch (error) {
        console.error("Error during login: ", error.message);
      }
    };
    fetchAddress();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {Address != "" &&
        Address.map((item, index) => (
          <div key={index} className="AddressCard">
            <p className="AddressUserName">{item.name}</p>
            <p>
              <small>{item.street}</small>
            </p>
            <p>
              <small>{item.city}, </small>
              <small>{item.state}, </small>
              <small>{item.zipCode}</small>
            </p>
            <p>
              <small>{item.country}</small>
            </p>
            <p>
              <small className=" flex flex-row gap-1">
                Mobile :
                <p className=" text-red-500 font-medium">{item.mobile}</p>
              </small>
            </p>
          </div>
        ))}
    </div>
  );
};
