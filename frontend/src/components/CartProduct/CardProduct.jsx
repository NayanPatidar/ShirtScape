import React, { useContext, useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { SizeSelectionContext } from "../../contexts/CartSizeSelection";
import { IoClose } from "react-icons/io5";
import {
  FindSizeByIdFromLocalStorage,
  ChangeSizeInLocalStorage,
  FindQuantityeByIdFromLocalStorage,
  ChangeQuantityInLocalStorage,
} from "../../services/storageOperations";
import { useNavigate } from "react-router-dom";

const CartProduct = ({ products, index }) => {
  const {
    setIsSizeMenu,
    setProduct,
    size,
    reference,
    setItemIndex,
    SizeMenuDone,
    quantity,
    setIsQuantityMenuOpen,
    setProductId,
    QuantityMenuDone,
    totalMRPRef,
    totalDiscountRef,
    setTotalPrice,
    setTotalSellingPrice,
  } = useContext(SizeSelectionContext);

  const [mainSize, setMainSize] = useState();
  const [mainQuantity, setMainQuantity] = useState(1);
  const prevQuantity = useRef(1);

  const handleSizeSelectionClick = (product) => {
    setIsSizeMenu(true);
    setProduct(product);
    setItemIndex(index);
  };

  const handleQuantitySelectionClick = (product_id) => {
    setIsQuantityMenuOpen(true);
    setProductId(product_id);
    setItemIndex(index);
  };

  const ProductIdCheck = () => {
    console.log("Navigate Clicked");
    navigate(`/products/${products.cloths.product_id}`);
  };

  const ItemDeleteFromCart = () => {
    console.log("Call For Item Delete");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (index == reference) {
      setMainSize(size);
    }
  }, [SizeMenuDone]);

  useEffect(() => {
    if (index == reference) {
      setMainQuantity(quantity);
    }
  }, [QuantityMenuDone]);

  useEffect(() => {
    const size = FindSizeByIdFromLocalStorage(products.cloths.product_id);
    const quantity = FindQuantityeByIdFromLocalStorage(
      products.cloths.product_id
    );
    setMainSize(size);
    setMainQuantity(quantity);
  }, []);

  useEffect(() => {
    if (mainSize !== undefined) {
      ChangeSizeInLocalStorage(products.cloths.product_id, mainSize);
    }
  }, [mainSize]);

  useEffect(() => {
    if (mainQuantity !== undefined) {
      ChangeQuantityInLocalStorage(products.cloths.product_id, mainQuantity);
    }
    if (prevQuantity.current == mainQuantity) {
      totalMRPRef.current =
        totalMRPRef.current + products.cloths.mrp * mainQuantity;
      totalDiscountRef.current =
        totalDiscountRef.current + products.cloths.price * mainQuantity;
      setTotalPrice(totalMRPRef.current);
      setTotalSellingPrice(totalDiscountRef.current);
      prevQuantity.current = mainQuantity;
    } else if (prevQuantity.current < mainQuantity) {
      totalMRPRef.current =
        totalMRPRef.current +
        products.cloths.mrp * (mainQuantity - prevQuantity.current);
      totalDiscountRef.current =
        totalDiscountRef.current +
        products.cloths.price * (mainQuantity - prevQuantity.current);

      setTotalPrice(totalMRPRef.current);
      setTotalSellingPrice(totalDiscountRef.current);
      prevQuantity.current = mainQuantity;
    } else {
      totalMRPRef.current =
        totalMRPRef.current -
        products.cloths.mrp * (prevQuantity.current - mainQuantity);
      totalDiscountRef.current =
        totalDiscountRef.current -
        products.cloths.price * (prevQuantity.current - mainQuantity);
      setTotalPrice(totalMRPRef.current);
      setTotalSellingPrice(totalDiscountRef.current);
      prevQuantity.current = mainQuantity;
    }
  }, [mainQuantity]);

  return (
    <div
      className="ProductsBlockMain text-black flex flex-row cursor-default"
      key={index}
    >
      <img
        className="ImageOfCartItem cursor-pointer"
        src={products.cloths.photo1}
        onClick={() => ProductIdCheck()}
      />
      <div className="CartItemDetails flex flex-col w-full">
        <div className=" flex flex-row justify-between pr-5">
          <span className="CartItemTitle ">{products.cloths.product_name}</span>
          <span
            className=" cursor-pointer"
            onClick={() => ItemDeleteFromCart()}
          >
            {<IoClose />}
          </span>
        </div>
        <span
          className="CartItemDescription cursor-pointer"
          onClick={() => ProductIdCheck()}
        >
          {products.cloths.genericdesc}
        </span>
        <span className="SizeQty mt-6 flex flex-row justify-start gap-4 w-2/5">
          <div className=" flex flex-col w-5/12">
            <div
              className=" SizeBox flex flex-row justify-center cursor-pointer"
              onClick={() => handleSizeSelectionClick(products)}
            >
              <div className=" SizeTab flex justify-center">
                Size: {mainSize}
              </div>
              <div className=" flex items-center">
                <MdArrowDropDown className=" size-4" />
              </div>
            </div>
          </div>

          <div className=" flex flex-col w-5/12">
            <div
              className=" SizeBox flex flex-row justify-center cursor-pointer"
              onClick={() =>
                handleQuantitySelectionClick(products.cloths.product_id)
              }
            >
              <div className=" SizeTab flex justify-center">
                Qty: {mainQuantity}
              </div>
              <div className=" flex items-center">
                <MdArrowDropDown className=" size-4" />
              </div>
            </div>
          </div>
        </span>
        <span className="PriceCartItem flex flex-row gap-2 pt-5">
          <span className=" MainPrice">₹{products.cloths.price}</span>
          <span className=" MRPCart line-through">₹{products.cloths.mrp}</span>
          <span className=" DiscountCart">{products.cloths.discount}% OFF</span>
        </span>
        <span className=" CartPorductInfo flex mt-1">
          <IoIosReturnLeft className=" size-4 flex align-middle items-center justify-center" />
          <span>
            <span className=" CartProductInfoStyle">14 days </span>
            return available
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
