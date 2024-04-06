import React, { useContext, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { SizeSelectionContext } from "../../contexts/CartSizeSelection";

const CartProduct = ({ products, index }) => {
  const { setIsModalOpen, setProduct } = useContext(SizeSelectionContext);

  const handleSizeSelectionClick = (product) => {
    setIsModalOpen(true);
    setProduct(product);
  };

  return (
    <div className="ProductsBlockMain text-black flex flex-row " key={index}>
      <img className="ImageOfCartItem" src={products.cloths.photo1}></img>
      <div className="CartItemDetails flex flex-col">
        <span className="CartItemTitle">{products.cloths.product_name}</span>
        <span className="CartItemDescription">
          {products.cloths.genericdesc}
        </span>
        <span className="SizeQty mt-6 flex flex-row justify-start gap-4">
          <div className=" flex flex-col w-5/12">
            <div
              className=" SizeBox flex flex-row justify-center gap-1 cursor-pointer"
              onClick={() => handleSizeSelectionClick(products)}
            >
              <div className=" SizeTab">Size:</div>
              <div className=" flex items-center">
                <MdArrowDropDown className=" size-4" />
              </div>
            </div>
          </div>

          <div className=" flex flex-col w-5/12">
            <div className=" SizeBox flex flex-row justify-center gap-1 cursor-pointer">
              <div className=" SizeTab">Qty: </div>
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
