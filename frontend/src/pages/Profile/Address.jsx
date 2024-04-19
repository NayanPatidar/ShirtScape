import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Nav";
import "./Menu.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { SearchContext } from "../../contexts/contexts";

const Address = () => {
  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  return (
    <div>
      <div className=" flex flex-row gap-4 pt-24 justify-center">
        <div className="w-1/6">
          <ProfileMenu />
        </div>
        <div className="MyProfile h-96 w-4/6 pl-10">
          <span className=" MyProfileTitle">ADDRESS</span>
          <div className="address-container pd-lg">
            <AddressList />
            {showForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
                className="address-form"
              >
                <input
                  onChange={formHandler}
                  value={address.name}
                  name="name"
                  className="input is-input-primary"
                  type="text"
                  placeholder="Name"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.street}
                  type="text"
                  className="input is-input-primary mg-top"
                  name="street"
                  placeholder="Street"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.city}
                  type="text"
                  className="input is-input-primary mg-top"
                  name="city"
                  placeholder="City"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.state}
                  type="text"
                  className="input is-input-primary mg-top"
                  name="state"
                  placeholder="State"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.country}
                  type="text"
                  className="input is-input-primary mg-top"
                  name="country"
                  setShowForm
                  placeholder="Country"
                  required
                />
                <input
                  onChange={formHandler}
                  value={address.zipCode}
                  type="number"
                  className="input is-input-primary mg-top"
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
                  className="input is-input-primary mg-top"
                  type="number"
                  placeholder="10-digit phone number"
                  required
                />
                {errors.mobile && (
                  <p style={{ color: "red" }}>{errors.mobile}</p>
                )}
                <div className="button-container">
                  <button
                    type="submit"
                    disabled={Object.keys(errors).length === 0 ? false : true}
                    className="btn is-solid"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setAddress(defaultAddress);
                    }}
                    className="btn is-outline mg-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddress(dummyAddress)}
                    className="btn is-btn-secondary mg-sm"
                  >
                    Fill dummy data
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="btn is-solid"
              >
                + Add Address
              </button>
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Address;
