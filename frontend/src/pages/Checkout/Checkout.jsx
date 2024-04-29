import React, { useEffect, useContext, useState } from "react";
import { SearchContext } from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "./Checkout.css";
import { AuthContext } from "../../contexts/AuthContexts";
import { getCookie } from "../../services/cookieOperations";
import { jwtDecode } from "jwt-decode";
import { getItemAndCouponPrice } from "../../services/CouponDetails";

const CheckoutPage = () => {
  const { setCartVisibility } = useContext(SearchContext);
  const { isUserLoggedIn, logout } = useContext(AuthContext);
  const [priceDetails, setPriceDetails] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

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
        `http://localhost:8080/checkout/PermUserData/Details`,
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
        console.log(data.CartData[0].pricedetails);
        setPriceDetails(data.CartData[0].pricedetails);
      }
    }
  };

  useEffect(() => {
    const userData = jwtDecode(getCookie("sscape"));
    setCouponDiscount(
      getItemAndCouponPrice(userData.userData.user_id).couponPrice
    );
  });

  useEffect(() => {
    setCartVisibility(false);
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      CartItemsPriceDetailsFetch();
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
        <div className="DetailsSectionCheckout flex flex-row gap-10 justify-center items-center">
          <div className=" AddressSelection w-3/5 "></div>
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
                      <div
                        className="ApplyCouponPrice cursor-pointer"
                        // onClick={() => handleCouponMenuOpen()}
                      ></div>
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
              // onClick={() => navigate("/checkout")}
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
