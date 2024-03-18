import React from "react";
import "./ProductsCard.css"

const Cards = () => {
  return (
    <div className=" flex flex-col ">
      <img
        className=" rounded-3xl"
        src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13622286/2024/2/19/a0794667-e541-4526-958d-6c9536a0009b1708340067741RoadsterMenGreenWhiteColourblockedRoundNeckPureCottonT-shirt1.jpg"
      />
      <div className=" flex flex-col">
        <span className="ProductName">Naruto: Jiyara</span>
        <span className="ProductDesc">Oversized T-Shirt</span>
        <span className="ProductPrice">$ 599</span>
      </div>
    </div>
  );
};

export default Cards;
