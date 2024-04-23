import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "../../services/cookieOperations";
import "./UserAddressCard.css";
import { AuthContext } from "../../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import { AddressUpdateContext } from "../../contexts/contexts";
import { MdClose } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { DeleteAddress } from "../../handlers/AddressHandlers";
import { AddressContext } from "../../contexts/AddressContext";

export const AddressList = () => {
  const [Address, setAddress] = useState("");
  const { logout } = useContext(AuthContext);
  const { AddressUpdate, SetAddressUpdate } = useContext(AddressUpdateContext);
  const {
    setAddressInForm,
    setShowForm,
    setAddressID,
    AllowEdit,
    setAllowEdit,
  } = useContext(AddressContext);

  const HandleClose = (AddressID) => {
    DeleteAddress(AddressID);
    setTimeout(() => {
      SetAddressUpdate(!AddressUpdate);
    }, 1000);
  };

  const HandleEdit = (AddressID, Address) => {
    setAddressInForm(Address);
    setAddressID(AddressID);
    setAllowEdit(true);
    setShowForm(true);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = getCookie("sscape");
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
          console.log("Fetch : ", data);
          setAddress(data.Address[0].address.address);
        }
      } catch (error) {
        console.error("Error during login: ", error.message);
      }
    };
    fetchAddress();
  }, [AddressUpdate]);

  const navigate = useNavigate();

  return (
    <div className=" grid grid-cols-2 justify-center items-center">
      {Address != "" ? (
        Address.map((item, index) => (
          <div key={index} className="AddressCard">
            <span className="AddressUserName flex flex-row justify-between items-center">
              <span>{item.name}</span>
              <span className=" flex flex-row gap-2">
                <FaPencilAlt
                  className=" size-3 cursor-pointer"
                  onClick={() => HandleEdit(index, item)}
                />
                <MdClose
                  className=" size-3 cursor-pointer"
                  onClick={() => HandleClose(index)}
                />
              </span>
            </span>
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
                <span className=" text-red-500 font-medium">{item.mobile}</span>
              </small>
            </p>
          </div>
        ))
      ) : (
        <span className="NoAddressFoundText text-xl ">No Address Found !</span>
      )}
    </div>
  );
};
