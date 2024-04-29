import React, { useEffect, useContext } from "react";
import { SearchContext } from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "./Checkout.css";

const CheckoutPage = () => {
  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(false);
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
                  <span className=" CheckoutPriceField">Total MRP</span>
                  {/* <span className=" CheckoutPriceField">₹{totalPrice}</span> */}
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" CheckoutPriceField">Discount on MRP</span>
                  <span className=" DiscountField text-green-400">
                    {/* -₹{totalPrice - totalSellingPrice} */}
                  </span>
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" CheckoutPriceField">Coupon Discount</span>
                  {/* <span>
                    {couponDiscount != 0 ? (
                      <span className=" DiscountField text-green-400 flex justify-end items-center">
                        -₹{couponDiscount}
                      </span>
                    ) : (
                      <div
                        className="ApplyCouponPrice cursor-pointer"
                        // onClick={() => handleCouponMenuOpen()}
                      >
                        APPLY COUPON
                      </div>
                    )}
                  </span> */}
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" CheckoutPriceField">Platform Fee</span>
                  <span className=" DiscountField">FREE</span>
                </div>
                <div className=" flex flex-row justify-between ">
                  <span className=" CheckoutPriceField">Shipping Fee</span>
                  <span className=" CheckoutCheckoutPriceField flex flex-row gap-1">
                    <span className=" line-through">₹79 </span>
                    <span className=" DiscountField"> FREE</span>
                  </span>
                </div>
              </div>
              <div className="TotalAmount flex flex-row justify-between pt-3">
                <span className=" TotalAmountText">Total Amount</span>
                <span className=" TotalAmountText">
                  {/* ₹{totalSellingPrice - couponDiscount} */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
