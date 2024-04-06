import React, { useEffect, useState } from "react";
import CartProductSize from "../../components/CartProdSize&Quantity/SelectionCartProductSize";
import CartProduct from "../../components/CartProduct/CardProduct";
import { SizeSelectionContext } from "../../contexts/CartSizeSelection";
import Logo from "../../assets/logo/Logo.png";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // This is the Cart Complete Data
  const [CartItems, SetCartItems] = useState(null);

  // This are the requirements
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [reference, setReference] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [done, setDone] = useState(false);

  const [size, setFinalSize] = useState("");

  const navigate = useNavigate();

  const handleCloseModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const FetchCartData = async () => {
    try {
      let LocalCartData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
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
        isModalOpen,
        setIsModalOpen,
        product,
        setProduct,
        size,
        setFinalSize,
        reference,
        setReference,
        itemIndex,
        setItemIndex,
        done,
        setDone,
      }}
    >
      <div
        className="MainCartPage flex flex-col "
        style={{
          filter: isModalOpen ? "brightness(0.8)" : "none",
          backgroundColor: isModalOpen ? "rgba(0,0,0,0.2)" : "",
        }}
      >
        <div className=" bg-gray-200 h-16 flex flex-row align-middle items-center">
          <div className=" w-1/2 pl-5">
            <img
              src={Logo}
              alt="LOGO"
              className="logo w-16"
              onClick={() => navigate("/")}
            />
          </div>
          <div className=" flex flex-row justify-between items-center w-1/2 pr-5">
            <span className="BAGTitle">BAG</span>
            <span className="BAGSecurity">100% SECURE</span>
          </div>
        </div>
        <div
          className="MainBackgroundCart flex flex-row justify-center gap-6 p-5 "
          onClick={handleCloseModal}
        >
          <div className=" w-6/12 flex flex-col gap-4">
            {CartItems &&
              CartItems.map((products, index) => (
                <CartProduct products={products} key={index} index={index} />
              ))}
          </div>
          <div className="ProductsPricesBlock w-4/12 text-black"></div>
        </div>
      </div>
      {isModalOpen && <div className=" fixed">{<CartProductSize />}</div>}
    </SizeSelectionContext.Provider>
  );
};

export default Cart;
