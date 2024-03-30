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
      <div className=" flex flex-row justify-around pt-36 ">
        <div className="  w-7/12 grid grid-cols-2 justify-items-center items-center p-4 pl-10 gap-5 ">
          <div>
            {product && (
              <img
                src={product.productData[0].product.photo1}
                alt="Image One"
              />
            )}
          </div>
          <div>
            {product && (
              <img
                src={product.productData[0].product.photo2}
                alt="Image One"
              />
            )}
          </div>
          <div>
            {product && (
              <img
                src={product.productData[0].product.photo3}
                alt="Image One"
              />
            )}
          </div>
          <div>
            {product && (
              <img
                src={product.productData[0].product.photo4}
                alt="Image One"
              />
            )}
          </div>
        </div>
        <div className=" w-5/12 "></div>
      </div>
    </div>
  );
};

export default Product;
