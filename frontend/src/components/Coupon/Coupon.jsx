import React, { useContext, useEffect, useState } from "react";
import "./Coupon.css";
import { CartContext } from "../../contexts/contexts";
import { IoMdClose } from "react-icons/io";
import { getCookie } from "../../services/cookieOperations";
import { jwtDecode } from "jwt-decode";
import { addCouponToLocalStorage } from "../../services/CouponDetails";
import { AuthContext } from "../../contexts/AuthContexts";

const CouponBox = () => {
  const { setCouponDiscount, setIsCouponMenuOpen } = useContext(CartContext);
  const { login, isUserLoggedIn } = useContext(AuthContext);
  const [done, SetDone] = useState(false);
  const [userData, setUserData] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  const handleApply = () => {
    SetDone(!done);
  };

  const handleClose = () => {
    setIsCouponMenuOpen(false);
  };

  useEffect(() => {
    let newDiscount = 0;
    if (checkboxes.checkbox1) {
      newDiscount += 70;
    }
    if (checkboxes.checkbox2) {
      newDiscount += 50;
    }

    if (done) {
      if (isUserLoggedIn) {
        const userData = jwtDecode(getCookie("sscape"));
        setUserData(userData.userData);
        addCouponToLocalStorage(userData.userData.user_id, newDiscount);
      } else {
        addCouponToLocalStorage("Local", newDiscount);
      }

      setCouponDiscount(newDiscount);
      setIsCouponMenuOpen(false);
    }
  }, [done]);

  return (
    <div className=" MainCoupon flex flex-col gap-5 justify-around">
      <div className="flex flex-col gap-5">
        <div className=" flex flex-row justify-start items-center gap-3">
          <input
            type="checkbox"
            name="checkbox1"
            checked={checkboxes.checkbox1}
            onChange={handleCheckboxChange}
            className=""
          />
          <div className=" Coupons flex flex-col justify-center w-full">
            <div className=" flex flex-row justify-between">
              <span className=" CouponName h-1/2">Festive Offer</span>
              <span>
                <IoMdClose onClick={handleClose} />
              </span>
            </div>
            <span className=" CouponBoxDescription h-1/2">
              Get Off UPTO ₹100 on shopping of ₹200
            </span>
          </div>
        </div>
        <div className=" flex flex-row justify-start items-center gap-3">
          <input
            type="checkbox"
            name="checkbox2"
            checked={checkboxes.checkbox2}
            onChange={handleCheckboxChange}
          />
          <div className=" Coupons flex flex-col  justify-center w-full ">
            <span className=" CouponName">MUSTGRAB50</span>
            <span className=" CouponBoxDescription">
              Get ₹50 OFF ON SHOPPING
            </span>
          </div>
        </div>
      </div>
      <div
        className=" SelectionSubmit flex justify-center items-center"
        onClick={handleApply}
      >
        APPLY
      </div>
    </div>
  );
};

export default CouponBox;
