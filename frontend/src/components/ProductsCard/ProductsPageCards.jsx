import React from "react";
import "./ProductsPageCards.css";
import { useNavigate } from "react-router-dom";

const ProductsPageCard = ({
  Image,
  Name,
  Description,
  Price,
  MRP,
  Discount,
  ProductId,
}) => {
  const navigate = useNavigate();
  const ProductIdCheck = () => {
    navigate(`/products/${ProductId}`);
  };

  return (
    <div
      className=" ProductsPageCardsMain flex flex-col justify-evenly items-start h-full"
      onClick={ProductIdCheck}
    >
      <div className="ProductsPageImage h-3/4">
        <img className="  cursor-pointer z-0 h-full" src={Image} />
      </div>
      <div className="ProductsPageAbout flex flex-col h-1/4">
        <span className="ProductsPageName">{Name}</span>
        <span className="ProductsPageDesc">{Description}</span>
        <div className=" flex flex-row justify-start gap-2">
          <span className="ProductsPagePrice">Rs. {Price}</span>
          <span className="ProductsPageMRP">Rs. {MRP}</span>
          <span className="ProductsPageDiscount">{Discount}% OFF</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageCard;
