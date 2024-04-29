import React, { useContext, useEffect, useRef, useState } from "react";
import CartProductSize from "../../components/CartProdSize&Quantity/SelectionCartProductSize";
import CartProduct from "../../components/CartProduct/CardProduct";
import Logo from "../../assets/logo/logo.png";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import CartProductQuantity from "../../components/CartProdSize&Quantity/SelectionCartProductQty";
import { IoIosPricetags } from "react-icons/io";
import CouponBox from "../../components/Coupon/Coupon";
import ItemRemovalBox from "../../components/ConfirmRemoval/ConfirmationBox";
import { getCookie } from "../../services/cookieOperations";
import { CartContext, SearchContext } from "../../contexts/contexts";
import { AuthContext } from "../../contexts/AuthContexts";
import { getItemAndCouponPrice } from "../../services/CouponDetails";
import { jwtDecode } from "jwt-decode";

const Cart = () => {
  // This is the Cart Complete Data
  const [CartItems, SetCartItems] = useState(null);

  // This are the requirements
  const [isSizeMenuOpen, setIsSizeMenu] = useState(false);
  const [isQuantityMenuOpen, setIsQuantityMenuOpen] = useState(false);
  const [IsCouponMenuOpen, setIsCouponMenuOpen] = useState(false);
  const [IsItemRemovalMenuOpen, setIsItemRemovalMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [reference, setReference] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [SizeMenuDone, setSizeMenuDone] = useState(false);
  const [ItemRemovalDone, setRemovalDone] = useState(false);
  const [QuantityMenuDone, setQuantityMenuDone] = useState(false);
  const [itemsNum, setItemsNum] = useState(-1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponDiscountFromLocalStorage, setDiscountFromLocalStorage] =
    useState(0);
  const [CartItemID, setCartItemID] = useState(0);

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const totalMRPRef = useRef(0);
  const totalDiscountRef = useRef(0);

  const { isUserLoggedIn, logout } = useContext(AuthContext);

  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(false);
  }, []);

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

  const handleCouponMenuOpen = () => {
    setIsCouponMenuOpen(true);
  };

  const GetPermUserCartData = async () => {
    if (isUserLoggedIn) {
      const token = getCookie("sscape");
      console.log(`Fetching Data for the Cart ${token}`);

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let FetchedLPermCartData = await fetch(
        `http://localhost:8080/cart/PermUserData`,
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
        console.log(data.CartData);
        SetCartItems(data.CartData);
        setItemsNum(data.CartData.length);
      }
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
        setItemsNum(LocalCartData.length);
      }
    } catch (error) {
      console.log("Error fetching the data: ", error.message);
    }
  };

  useEffect(() => {
    const userData = jwtDecode(getCookie("sscape"));
    setDiscountFromLocalStorage(
      getItemAndCouponPrice(userData.userData.user_id).couponPrice
    );
  }, [couponDiscount]);

  useEffect(() => {
    if (isUserLoggedIn) {
      GetPermUserCartData();
    } else {
      FetchCartData();
    }
  }, [ItemRemovalDone]);

  return (
    <CartContext.Provider
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
        setTotalSellingPrice,
        totalDiscountRef,
        couponDiscount,
        setCouponDiscount,
        IsCouponMenuOpen,
        setIsCouponMenuOpen,
        IsItemRemovalMenuOpen,
        setIsItemRemovalMenuOpen,
        ItemRemovalDone,
        setRemovalDone,
        CartItemID,
        setCartItemID,
      }}
    >
      <div
        className="MainCartPage flex flex-col h-full"
        style={{
          filter:
            isSizeMenuOpen ||
            isQuantityMenuOpen ||
            IsCouponMenuOpen ||
            IsItemRemovalMenuOpen
              ? "brightness(0.8)"
              : "none",
          backgroundColor:
            isSizeMenuOpen ||
            isQuantityMenuOpen ||
            IsCouponMenuOpen ||
            IsItemRemovalMenuOpen
              ? "rgba(0,0,0,0.2)"
              : "",
          height: itemsNum > 2 ? "100%" : "100%",
        }}
      >
        <div className="TopBarCartPage h-16 p-10 flex flex-row justify-between align-middle items-center cursor-default">
          <div className="">
            <img
              src={Logo}
              alt="LOGO"
              className=" w-32"
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

        {itemsNum > 0 ? (
          <div
            className="MainBackgroundCart flex flex-row justify-center gap-6 pt-5"
            onClick={() => {
              handleCloseSizeMenu();
              handleCloseQuantityMenu();
            }}
          >
            <div className=" w-6/12 flex flex-col gap-4 pb-3">
              {CartItems.map((products, index) => (
                <CartProduct products={products} key={index} index={index} />
              ))}
            </div>
            <div className="ProductsPricesBlock text-black cursor-default">
              <div className=" p-2 flex flex-col">
                <div className=" flex flex-col gap-4">
                  <span className="CouponsTitle">COUPONS</span>
                  <div className="CouponsApplication flex flex-row justify-between">
                    <div className=" flex flex-row gap-4 justify-end items-center">
                      <IoIosPricetags />
                      <span className="ApplyCouponsText">Apply Coupons</span>
                    </div>
                    <div
                      className="ApplyCouponText p-1 cursor-pointer"
                      onClick={() => handleCouponMenuOpen()}
                    >
                      APPLY
                    </div>
                  </div>
                  <span className="CouponDescription flex gap-1">
                    <span className=" LoginCoupDesc  cursor-pointer">
                      Login
                    </span>
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
                          -₹{totalPrice - totalSellingPrice}
                        </span>
                      </div>
                      <div className=" flex flex-row justify-between ">
                        <span className=" PriceField">Coupon Discount</span>
                        <span>
                          {couponDiscountFromLocalStorage != 0 || null ? (
                            <span className=" DiscountField text-green-400 flex justify-end items-center">
                              -₹{couponDiscountFromLocalStorage}
                            </span>
                          ) : (
                            <div
                              className="ApplyCouponPrice cursor-pointer"
                              onClick={() => handleCouponMenuOpen()}
                            >
                              APPLY COUPON
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
                  </div>
                </div>
                <div className="TotalAmount flex flex-row justify-between pt-3">
                  <span className=" TotalAmountText">Total Amount</span>
                  <span className=" TotalAmountText">
                    ₹{totalSellingPrice - couponDiscountFromLocalStorage}
                  </span>
                </div>
                <div
                  className=" CheckOutButton flex justify-center align-middle items-center pt-2"
                  onClick={() => navigate("/checkout")}
                >
                  <button className=" CheckoutClick ">PLACE ORDER</button>
                </div>
              </div>
            </div>
          </div>
        ) : itemsNum == -1 ? (
          " "
        ) : (
          <span className="NoItemDiv text-4xl font-semibold flex justify-center items-center align-middle h-3/5">
            No Item in the cart
          </span>
        )}
      </div>
      {isSizeMenuOpen && <div className=" fixed">{<CartProductSize />}</div>}
      {isQuantityMenuOpen && (
        <div className=" fixed">{<CartProductQuantity />}</div>
      )}
      {IsCouponMenuOpen && <div className=" fixed">{<CouponBox />}</div>}
      {IsItemRemovalMenuOpen && (
        <div className=" fixed">{<ItemRemovalBox />}</div>
      )}
    </CartContext.Provider>
  );
};

export default Cart;
