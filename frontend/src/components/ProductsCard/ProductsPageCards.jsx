import React from "react";
import "./ProductsPageCards.css";

const ProductsPageCard = ({
  Image,
  Name,
  Description,
  Price,
  MRP,
  Discount,
  ProductId,
}) => {
  const ProductIdCheck = () => {
    console.log(ProductId);
  };

  return (
    <div
      className=" ProductsPageCardsMain flex flex-col"
      onClick={ProductIdCheck}
    >
      <img className=" ProductsPageImage cursor-pointer z-0" src={Image} />
      <div className=" flex flex-col">
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
