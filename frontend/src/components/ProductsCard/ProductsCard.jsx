import React from "react";

const Cards = () => {
  return (
    <div className=" flex flex-col ">
      <img
        className=" rounded-3xl"
        src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13622286/2024/2/19/a0794667-e541-4526-958d-6c9536a0009b1708340067741RoadsterMenGreenWhiteColourblockedRoundNeckPureCottonT-shirt1.jpg"
      />
      <div className=" text-md flex flex-col">
        <span className="ProductName pl-3 pr-3 ">Naruto: Jiyara</span>
        <span className="ProductDesc pl-3 pr-3 ">dsfs</span>
        <span className="ProductPrice pl-3 pr-3 ">$599</span>
      </div>
    </div>
  );
};

export default Cards;
