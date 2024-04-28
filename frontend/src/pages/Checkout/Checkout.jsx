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
        <div>
          <div className=" AddressSelection"></div>
          <div className=" OrderDetails"></div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
