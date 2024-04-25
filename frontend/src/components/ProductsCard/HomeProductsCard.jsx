import React from "react";
import "./HomeProductsCard.css";
import { useNavigate } from "react-router-dom";

const Cards = ({
  photo,
  name,
  description,
  price,
  mrp,
  discount,
  ProductId,
}) => {
  const navigate = useNavigate();
  const ProductIdCheck = () => {
    navigate(`/products/${ProductId}`);
  };
  return (
    <div className=" flex flex-col" onClick={ProductIdCheck}>
      <img
        className="ImageHomePageCard rounded-2xl cursor-pointer "
        src={photo}
      />
      <div className=" flex flex-col">
        <span className="ProductName">{name}</span>
        <span className="ProductDesc">{description}</span>
        <div>
          <span className="ProductPrice">₹{price}</span>
          <span className="ProductDiscount">₹{mrp}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
