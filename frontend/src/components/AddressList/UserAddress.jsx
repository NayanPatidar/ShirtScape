import React, { useEffect, useState } from "react";
import { getCookie } from "../../services/cookieOperations";
import "./UserAddressCard.css";

export const AddressList = () => {
  const [Address, setAddress] = useState("");

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
        console.log(UserAddress);
        const data = await UserAddress.json();

        if (!UserAddress.ok || UserAddress.message) {
          console.log(`Error: ${data.message}`);
        } else {
          console.log(data);
          setAddress(data.Address);
        }
      } catch (error) {
        console.error("Error during login: ", error.message);
      }
    };
    fetchAddress();
  }, []);

  return (
    <div>
      {Address != "" &&
        Address.map((item, index) => (
          <div key={index} className="AddressCard">
            <p className="AddressUserName">
              {item.address.address[index].name}
            </p>
            <p>
              <small>{item.address.address[index].street}</small>
            </p>
            <p>
              <small>{item.address.address[index].city}, </small>
              <small>{item.address.address[index].state}, </small>
              <small>{item.address.address[index].zipCode}</small>
            </p>
            <p>
              <small>{item.address.address[index].country}</small>
            </p>
            <p className=" flex flex-row ">
              <small className=" flex flex-row">
                Mobile :
                <p className=" text-red-500 font-medium">
                   {item.address.address[index].mobile}
                </p>
              </small>
            </p>
          </div>
        ))}
    </div>
  );
};
