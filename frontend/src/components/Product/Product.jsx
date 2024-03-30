import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import Navbar from "../Navbar/Nav";

const Product = () => {
  const [product, setProduct] = useState("");
  let { productId } = useParams();

  useEffect(() => {
    fetchProductData();
  }, []);

  async function fetchProductData() {
    try {
      const productData = await fetch(
        `http://localhost:8080/product/${productId}`
      );
      if (!productData.ok) {
        console.error("Product Data Not Valid");
      }
      const jsonProduct = await productData.json();
      setProduct(jsonProduct);
    } catch (error) {
      console.error(
        `Encountered Error while fetching the data : ${error.message}`
      );
    }
  }

  return (
    <div>
      <Navbar />
      <div className=" flex flex-row justify-around pt-16">
        <div className=" bg-black w-1/2 h-96">
          <img src={product.productData[0].product.photo1} alt="" className=" " />
        </div>
        <div className=" bg-slate-600 w-1/2 h-96"></div>
      </div>
    </div>
  );
};

export default Product;
