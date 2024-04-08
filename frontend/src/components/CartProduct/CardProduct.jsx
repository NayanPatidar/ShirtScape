import React, { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { SizeSelectionContext } from "../../contexts/CartSizeSelection";
import {
  FindSizeByIdFromLocalStorage,
  ChangeSizeInLocalStorage,
  FindQuantityeByIdFromLocalStorage,
  ChangeQuantityInLocalStorage,
} from "../../services/storageOperations";

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
    totalMRPRef.current = totalMRPRef.current + products.cloths.mrp;
    totalDiscountRef.current = totalDiscountRef.current + products.cloths.price;
    setTotalPrice(totalMRPRef.current);
    setTotalSellingPrice(totalDiscountRef.current);
  }, [mainQuantity]);

  return (
    <div
      className="ProductsBlockMain text-black flex flex-row cursor-default"
      key={index}
    >
      <img className="ImageOfCartItem" src={products.cloths.photo1}></img>
      <div className="CartItemDetails flex flex-col">
        <span className="CartItemTitle">{products.cloths.product_name}</span>
        <span className="CartItemDescription">
          {products.cloths.genericdesc}
        </span>
        <span className="SizeQty mt-6 flex flex-row justify-start gap-4">
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
