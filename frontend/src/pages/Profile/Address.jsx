import React, { useContext, useEffect, useState } from "react";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { AddressUpdateContext, SearchContext } from "../../contexts/contexts";
import { IoIosAdd } from "react-icons/io";
import { omit } from "lodash";

import { AddressContext, useAddress } from "../../contexts/AddressContext";
import { AddressList } from "../../components/AddressList/UserAddress";
import { AddAddress, UpdateAddress } from "../../handlers/AddressHandlers";

const Address = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const {
    addressInForm,
    setAddressInForm,
    showForm,
    setShowForm,
    AllowEdit,
    setAllowEdit,
    AddressID,
  } = useContext(AddressContext);
  const [errors, setErrors] = useState({});
  const [AddressUpdate, SetAddressUpdate] = useState(false);

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  const submitHandler = () => {
    if (!AllowEdit) {
      AddAddress(addressInForm);
    } else {
      // Update the Original Address using AddressID
      UpdateAddress(AddressID, addressInForm);
    }
    setShowForm(false);
    setAddressInForm("");
    setErrors("");
    setTimeout(() => {
      SetAddressUpdate(!AddressUpdate);
    }, 1000);
    setAllowEdit(false);
  };

  const formHandler = (e) => {
    setAddressInForm({ ...addressInForm, [e.target.name]: e.target.value });
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
    <AddressUpdateContext.Provider value={{ AddressUpdate, SetAddressUpdate }}>
      <div>
        <div className=" flex flex-row gap-4 pt-24 justify-center ">
          <div className="w-1/6">
            <ProfileMenu />
          </div>
          <div className="MyProfile w-4/6 pl-10 h-fit">
            <span className=" MyProfileTitle">ADDRESS</span>
            <AddressList />
            <div className="AddressContainer">
              {showForm ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                  }}
                  className="AddresFormMain flex flex-col gap-2 mb-10"
                >
                  <input
                    onChange={formHandler}
                    value={addressInForm.name}
                    name="name"
                    className="InputAddressForm"
                    type="text"
                    placeholder="Name"
                    required
                  />
                  <input
                    onChange={formHandler}
                    value={addressInForm.street}
                    type="text"
                    className="InputAddressForm"
                    name="street"
                    placeholder="Street"
                    required
                  />
                  <input
                    onChange={formHandler}
                    value={addressInForm.city}
                    type="text"
                    className="InputAddressForm"
                    name="city"
                    placeholder="City"
                    required
                  />
                  <input
                    onChange={formHandler}
                    value={addressInForm.state}
                    type="text"
                    className="InputAddressForm"
                    name="state"
                    placeholder="State"
                    required
                  />
                  <input
                    onChange={formHandler}
                    value={addressInForm.country}
                    type="text"
                    className="InputAddressForm"
                    name="country"
                    placeholder="Country"
                    required
                  />
                  <input
                    onChange={formHandler}
                    value={addressInForm.zipCode}
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
                    value={addressInForm.mobile}
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
                        setAddressInForm("");
                        setErrors("");
                        setAllowEdit(false);
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
    </AddressUpdateContext.Provider>
  );
};

export default Address;
