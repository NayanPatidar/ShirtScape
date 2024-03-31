import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import Navbar from "../Navbar/Nav";
import "./Product.css";

const Product = () => {
  const [product, setProduct] = useState(null);
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
      setProduct(jsonProduct.productData[0]);
    } catch (error) {
      console.error(
        `Encountered Error while fetching the data : ${error.message}`
      );
    }
  }

  return (
    <div>
      <Navbar />
      <div className=" flex flex-row justify-around pt-28 ">
        <div className="  w-7/12 grid grid-cols-2 justify-items-center items-center p-4 pl-10 gap-2 ">
          <div>
            {product && <img src={product.product.photo1} alt="Image One" />}
          </div>
          <div>
            {product && <img src={product.product.photo2} alt="Image One" />}
          </div>
          <div>
            {product && <img src={product.product.photo3} alt="Image One" />}
          </div>
          <div>
            {product && <img src={product.product.photo4} alt="Image One" />}
          </div>
        </div>
        <div className=" w-5/12 mt-5 ml-5">
          {product && (
            <div className=" flex flex-col">
              <div className="flex flex-col leading-6 border-b border-gray-200 w-3/4 pb-3">
                <span className="Product_Name">
                  {product.product.product_name}
                </span>
                <span className="Product_Main_Description">
                  {product.product.maindescription}
                </span>
              </div>
              <div className=" flex flex-row gap-3 justify-start pt-4 text-xl">
                <span className=" Product_Price">₹{product.product.price}</span>
                <span className=" Product_MRP_Desc">
                  MRP{" "}
                  <span className=" Product_MRP">₹{product.product.mrp}</span>
                </span>
                <span className=" Product_Discount">
                  ({product.product.discount}%) OFF
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
