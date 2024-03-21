import React from "react";
import "./ProductsCard.css";

const Cards = ({ photo, name, description, price, mrp, discount }) => {
  return (
    <div className=" flex flex-col ">
      <img className="rounded-3xl cursor-pointer" src={photo} />
      <div className=" flex flex-col">
        <span className="ProductName">{name}</span>
        <span className="ProductDesc">{description}</span>
        <span className="ProductPrice">₹{price}</span>
      </div>
    </div>
  );
};

export default Cards;
