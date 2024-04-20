import React, { useContext, useEffect, useState } from "react";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { SearchContext } from "../../contexts/contexts";
import { IoIosAdd } from "react-icons/io";
import { omit } from "lodash";

import { AddressContext, useAddress } from "../../contexts/AddressContext";
import { editAddressHandler } from "../../handlers/AddressHandlers";

const Address = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const { address, setAddress, showForm, setShowForm } =
    useContext(AddressContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  

  const formHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "mobile":
        if (e.target.value.length !== 10) {
          setErrors({
            ...errors,
            mobile: "Enter 10 digit mobile number",
          });
        } else {
          const newObj = omit(errors, "mobile");
          setErrors(newObj);
        }
        break;
      case "zipCode": {
        if (e.target.value.length !== 6) {
          setErrors({
            ...errors,
            zipCode: "Invalid pincode",
          });
        } else {
          const newObj = omit(errors, "zipCode");
          setErrors(newObj);
        }
      }
    }
  };

  return (
    <div>
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="MyProfile h-96 w-4/6 pl-10">
          <span className=" MyProfileTitle">ADDRESS</span>
          <div className="AddressContainer ">
            {showForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // submitHandler();
                }}
                className="AddresFormMain flex flex-col gap-2 "
              >
                <input
                  onChange={formHandler}
                  value={address.name}
                  name="name"
                  className="InputAddressForm"
                  type="text"
                  placeholder="Name"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.street}
                  type="text"
                  className="InputAddressForm"
                  name="street"
                  placeholder="Street"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.city}
                  type="text"
                  className="InputAddressForm"
                  name="city"
                  placeholder="City"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.state}
                  type="text"
                  className="InputAddressForm"
                  name="state"
                  placeholder="State"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.country}
                  type="text"
                  className="InputAddressForm"
                  name="country"
                  setShowForm
                  placeholder="Country"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.zipCode}
                  type="number"
                  className="InputAddressForm"
                  name="zipCode"
                  placeholder="6-digit zipcode"
                  maxLength="6"
                  required
                />
                {errors.zipCode && (
                  <p style={{ color: "red" }}>{errors.zipCode}</p>
                )}
                <input
                  onChange={formHandler}
                  value={address.mobile}
                  maxLength="10"
                  name="mobile"
                  className="InputAddressForm"
                  type="number"
                  placeholder="10-digit phone number"
                  required
                />
                {errors.mobile && (
                  <p style={{ color: "red" }}>{errors.mobile}</p>
                )}
                <div className="ButtonContainer ">
                  <button
                    type="submit"
                    disabled={Object.keys(errors).length === 0 ? false : true}
                    className="ButtonAddressFormSave "
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      // setAddress(defaultAddress);
                    }}
                    className="ButtonAddressFormCancel  mg-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="AddAdressButton "
              >
                <IoIosAdd className="AddIcon size-5" /> Add Address
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
