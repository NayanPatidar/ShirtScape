import React, { useEffect, useContext, useState } from "react";
import { SearchContext } from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "./Checkout.css";
import { AuthContext } from "../../contexts/AuthContexts";
import { getCookie } from "../../services/cookieOperations";
import { jwtDecode } from "jwt-decode";
import {
  getItemAndCouponPrice,
  setUserCouponDetails,
} from "../../services/CouponDetails";
import { ConfirmOrder } from "../../handlers/OrderConfirmation";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CheckoutPage = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const { isUserLoggedIn, logout } = useContext(AuthContext);
  const [priceDetails, setPriceDetails] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [Address, setAddress] = useState("");
  const [AddressIndex, setAddressIndex] = useState(-1);

  function handleAddressSelection(index) {
    setAddressIndex(index);
  }

  const ConfirmationOfOrder = () => {
    const userData = jwtDecode(getCookie("sscape"));
    if (AddressIndex != -1) {
      const orderPlaced = ConfirmOrder(AddressIndex);
      if (orderPlaced) {
        console.log("Order Placed");
        setUserCouponDetails(userData.userData.user_id);
        navigate("/men");
      } else {
        console.log("Failed to place order");
      }
    }
  };

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
        `${backendUrl}FetchAddress`,
        options
      );
      const data = await UserAddress.json();

      if (!UserAddress.ok || UserAddress.message) {
        console.log(`Error: ${data.error}`);
        logout();
        navigate("/signin");
      } else {
        setAddress(data.Address[0].address.address);
      }
    } catch (error) {
      console.error("Error during login: ", error.message);
    }
  };

  const CartItemsPriceDetailsFetch = async () => {
    if (isUserLoggedIn) {
      const token = getCookie("sscape");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let FetchedLPermCartData = await fetch(
        `${backendUrl}checkout/PermUserData/Details`,
        options
      );

      if (!FetchedLPermCartData.ok) {
        if (FetchedLPermCartData.status == 403) {
          console.log("Either invalid Token or User Not Present");
          logout();
          navigate("/login");
        }
      }

      if (FetchedLPermCartData.ok) {
        const data = await FetchedLPermCartData.json();
        if (data.CartData[0].pricedetails.total_mrp == null) {
          navigate("/cart");
        }
        setPriceDetails(data.CartData[0].pricedetails);
      }
    }
  };

  useEffect(() => {
    setCartVisibility(false);

    if (isUserLoggedIn) {
      fetchAddress();
      const userData = jwtDecode(getCookie("sscape"));
      const CouponPrice = getItemAndCouponPrice(userData.userData.user_id);
      if (CouponPrice != null) {
        setCouponDiscount(CouponPrice.couponPrice);
      }

      CartItemsPriceDetailsFetch();
    } else {
      navigate("/signin");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className=" flex flex-col">
        <div className="TopBarCartPage h-16 p-10 flex flex-row justify-between align-middle items-center cursor-default">
          <div className="">
            <img
              src={Logo}
              alt="LOGO"
              className=" w-32"
              onClick={() => navigate("/")}
            />
          </div>
          <div className=" CheckoutLogoDesscription">
            <span className="CheckoutTitle">BAG</span>
            <span className=" font-thin text-xs"> -------- </span>
            <span className="CheckoutAddress">ADDRESS</span>
            <span className=" font-thin text-xs "> -------- </span>
            <span className="CheckoutPayment">PAYMENT</span>
          </div>
          <span className="CheckoutSecurity">100% SECURE</span>
        </div>
        <div className="DetailsSectionCheckout flex flex-row gap-10 justify-center">
          <div className=" w-3/5 flex flex-col gap-5 ">
            <span>ADDRESS</span>
            {Address ? (
              Address != "" ? (
                Address.map((item, index) => (
                  <div key={index} className="CheckoutAddressCard">
                    <label>
                      <span className="AddressUserName flex flex-row justify-between items-center">
                        <span>{item.name}</span>
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={index}
                          onChange={() => handleAddressSelection(index)}
                        />
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
                          <span className=" text-red-500 font-medium">
                            {item.mobile}
                          </span>
                        </small>
                      </p>
                    </label>
                  </div>
                ))
              ) : (
                <span className="NoAddressFoundText text-xl ">
                  No Address Found !
                </span>
              )
            ) : (
              <span className="NoAddressFoundText text-xl ">
                Loading ...
              </span>
            )}
          </div>
          <div className=" OrderDetails w-4/12 flex flex-col">
            BILLING DETAILS
            <div className=" OrderDetailsCheckout mt-5">
              <div className="PriceCalcBox flex flex-col gap-2">
                <div className=" flex flex-row justify-between ">
                  <span className=" PriceField">Total MRP</span>
                  <span className=" PriceField">₹{priceDetails.total_mrp}</span>
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" PriceField">Discount on MRP</span>
                  <span className=" DiscountField text-green-400">
                    -₹{priceDetails.total_mrp - priceDetails.total_price}
                  </span>
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" PriceField">Coupon Discount</span>
                  <span>
                    {couponDiscount != 0 ? (
                      <span className=" DiscountField text-green-400 flex justify-end items-center">
                        -₹{couponDiscount}
                      </span>
                    ) : (
                      <div className="ApplyCouponPrice cursor-pointer">
                        ------
                      </div>
                    )}
                  </span>
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" PriceField">Platform Fee</span>
                  <span className=" DiscountField">FREE</span>
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" PriceField">Shipping Fee</span>
                  <span className=" PriceField flex flex-row gap-1">
                    <span className=" line-through">₹79 </span>
                    <span className=" DiscountField"> FREE</span>
                  </span>
                </div>
              </div>
              <div className="TotalAmount flex flex-row justify-between pt-3">
                <span className=" TotalAmountText">Total Amount</span>
                <span className=" TotalAmountText">
                  ₹{priceDetails.total_price - couponDiscount}
                </span>
              </div>
            </div>
            <div
              className=" CheckOutButton flex justify-center align-middle items-center pt-2"
              onClick={() => ConfirmationOfOrder()}
            >
              <button className=" CheckoutClick ">CONFIRM ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
