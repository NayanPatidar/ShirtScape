import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Nav";

const Product = () => {
  let { productId } = useParams();

  useEffect(() => {});

  async function fetchProductData() {
    // const productData = await fetch("") 
  }

  return (
    <div>
      <Navbar />
      <div className=" flex flex-row justify-around pt-16">
        <div className=" bg-black w-1/2 h-96">
          <div className=" bg-white grid grid-cols-2"></div>
        </div>
        <div className=" bg-slate-600 w-1/2 h-96"></div>
      </div>
    </div>
  );
};

export default Product;
