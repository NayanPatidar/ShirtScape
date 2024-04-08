import React from "react";
import "./Coupon.css";

const CouponBox = () => {
  return (
    <div className=" MainCoupon flex flex-col gap-5 justify-around">
      <div className="flex flex-col gap-5">
        <div className=" flex flex-row justify-start items-center gap-3">
          <input
            type="checkbox"
            //   checked={isChecked}
            //   onChange={handleCheckboxChange}
          />
          <div className=" Coupons flex flex-col justify-center">
            <span className=" CouponName h-1/2">Festive Offer</span>
            <span className=" CouponBoxDescription h-1/2">
              Get Off UPTO ₹100 on shopping of ₹200
            </span>
          </div>
        </div>
        <div className=" flex flex-row justify-start items-center gap-3">
          <input
            type="checkbox"
            //   checked={isChecked}
            //   onChange={handleCheckboxChange}
          />
          <div className=" Coupons flex flex-col justify-center ">
            <span className=" CouponName">MUSTGRAB8</span>
            <span className=" CouponBoxDescription">
              Get 8% OFF ON SHOPPING
            </span>
          </div>
        </div>
      </div>
      <div className=" SelectionSubmit flex justify-center items-center">
        APPLY
      </div>
    </div>
  );
};

export default CouponBox;
