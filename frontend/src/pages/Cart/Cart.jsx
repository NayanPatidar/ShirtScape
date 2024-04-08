import React, { useEffect, useRef, useState } from "react";
import CartProductSize from "../../components/CartProdSize&Quantity/SelectionCartProductSize";
import CartProduct from "../../components/CartProduct/CardProduct";
import { SizeSelectionContext } from "../../contexts/CartSizeSelection";
import Logo from "../../assets/logo/Logo.png";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import CartProductQuantity from "../../components/CartProdSize&Quantity/SelectionCartProductQty";
import { IoIosPricetags } from "react-icons/io";

const Cart = () => {
  // This is the Cart Complete Data
  const [CartItems, SetCartItems] = useState(null);

  // This are the requirements
  const [isSizeMenuOpen, setIsSizeMenu] = useState(false);
  const [isQuantityMenuOpen, setIsQuantityMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [reference, setReference] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [SizeMenuDone, setSizeMenuDone] = useState(false);
  const [QuantityMenuDone, setQuantityMenuDone] = useState(false);
  const [itemsNum, setItemsNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const totalMRPRef = useRef(0);
  const totalDiscountRef = useRef(0);
  // const totalCouponDiscountRef = useRef(0);

  const navigate = useNavigate();

  const handleCloseSizeMenu = () => {
    if (isSizeMenuOpen) {
      setIsSizeMenu(false);
    }
  };

  const handleCloseQuantityMenu = () => {
    if (isQuantityMenuOpen) {
      setIsQuantityMenuOpen(false);
    }
  };

  const FetchCartData = async () => {
    let LocalCartData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
    if (!LocalCartData) {
      return;
    }
    try {
      const productIds = LocalCartData.map((item) => parseInt(item.id));
      let FetchedLocalCartData = await fetch(
        "http://localhost:8080/cart/tempUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        }
      );
      if (FetchedLocalCartData.ok) {
        const data = await FetchedLocalCartData.json();
        SetCartItems(data.CartData);
        setItemsNum(data.CartData.length);
      }
    } catch (error) {
      console.log("Error fetching the data: ", error.message);
    }
  };

  useEffect(() => {
    FetchCartData();
  }, []);

  return (
    <SizeSelectionContext.Provider
      value={{
        isSizeMenuOpen,
        setIsSizeMenu,
        product,
        setProduct,
        size,
        setSize,
        reference,
        setReference,
        itemIndex,
        setItemIndex,
        SizeMenuDone,
        setSizeMenuDone,
        quantity,
        setQuantity,
        isQuantityMenuOpen,
        setIsQuantityMenuOpen,
        productId,
        setProductId,
        QuantityMenuDone,
        setQuantityMenuDone,
        totalMRPRef,
        setTotalPrice,
        setTotalDiscount,
        totalDiscountRef,
      }}
    >
      <div
        className="MainCartPage flex flex-col"
        style={{
          filter:
            isSizeMenuOpen || isQuantityMenuOpen ? "brightness(0.8)" : "none",
          backgroundColor:
            isSizeMenuOpen || isQuantityMenuOpen ? "rgba(0,0,0,0.2)" : "",
          height: itemsNum > 2 ? "100%" : "100vh",
        }}
      >
        <div className="TopBarCartPage h-16 p-10 flex flex-row justify-between align-middle items-center cursor-default">
          <div className="">
            <img
              src={Logo}
              alt="LOGO"
              className="logo w-16"
              onClick={() => navigate("/")}
            />
          </div>
          <div className=" BagLogoDesscription">
            <span className="BAGTitle">BAG</span>
            <span className=" font-thin text-xs"> -------- </span>
            <span className="BAGAddress">ADDRESS</span>
            <span className=" font-thin text-xs "> -------- </span>
            <span className="BAGPayment">PAYMENT</span>
          </div>
          <span className="BAGSecurity">100% SECURE</span>
        </div>
        <div
          className="MainBackgroundCart flex flex-row justify-center gap-6 p-5 "
          onClick={() => {
            handleCloseSizeMenu();
            handleCloseQuantityMenu();
          }}
        >
          <div className=" w-6/12 flex flex-col gap-4">
            {CartItems &&
              CartItems.map((products, index) => (
                <CartProduct products={products} key={index} index={index} />
              ))}
          </div>
          <div className="ProductsPricesBlock text-black cursor-default">
            <div className=" pl-5 pt-4 flex flex-col">
              <div className=" flex flex-col gap-4">
                <span className="CouponsTitle">COUPONS</span>
                <div className="CouponsApplication flex flex-row justify-between">
                  <div className=" flex flex-row gap-4 justify-end items-center">
                    <IoIosPricetags />
                    <span className="ApplyCouponsText">Apply Coupons</span>
                  </div>
                  <div className="ApplyCouponText p-1 cursor-pointer">
                    APPLY
                  </div>
                </div>
                <span className="CouponDescription flex gap-1">
                  <span className=" LoginCoupDesc  cursor-pointer">Login</span>
                  <span>to get upto ₹200 OFF on first order</span>
                </span>
              </div>
              <div className="CartItemsPriceDetails">
                <div className=" flex flex-col pt-4">
                  <span className="priceDetailsTitle">PRICE DETAILS</span>
                  <div className="PriceCalcBox flex flex-col gap-2 pt-5">
                    <div className=" flex flex-row justify-between ">
                      <span className=" PriceField">Total MRP</span>
                      <span className=" PriceField">₹{totalPrice}</span>
                    </div>
                    <div className=" flex flex-row justify-between ">
                      <span className=" PriceField">Discount on MRP</span>
                      <span className=" DiscountField text-green-400">
                        -₹{totalPrice - totalDiscount}{" "}
                      </span>
                    </div>
                    <div className=" flex flex-row justify-between ">
                      <span className=" PriceField">Coupon Discount</span>
                      <span></span>
                    </div>
                    <div className=" flex flex-row justify-between ">
                      <span className=" PriceField">Platform Fee</span>
                      <span></span>
                    </div>
                    <div className=" flex flex-row justify-between ">
                      <span className=" PriceField">Shipping Fee</span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="TotalAmount flex flex-row justify-between pt-3">
                <span className=" TotalAmountText">Total Amount</span>
                <span></span>
              </div>
              <div className=" CheckOutButton flex justify-center align-middle items-center pt-2">
                <button className=" CheckoutClick ">PLACE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSizeMenuOpen && <div className=" fixed">{<CartProductSize />}</div>}
      {isQuantityMenuOpen && (
        <div className=" fixed">{<CartProductQuantity />}</div>
      )}
    </SizeSelectionContext.Provider>
  );
};

export default Cart;
