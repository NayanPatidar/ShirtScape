import React from "react";
import "./ProductsCard.css";

const Cards = ({ imageLink }) => {
  console.log(imageLink);
  return (
    <div className=" flex flex-col ">
      <img className=" rounded-3xl" src={imageLink} />
      <div className=" flex flex-col">
        <span className="ProductName">Naruto: Jiyara</span>
        <span className="ProductDesc">Oversized T-Shirt</span>
        <span className="ProductPrice">$ 599</span>
      </div>
    </div>
  );
};

export default Cards;
