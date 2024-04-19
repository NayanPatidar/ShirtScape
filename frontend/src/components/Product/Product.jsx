import React, { useContext, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Navbar from "../Navbar/Nav";
import "./Product.css";
import { AddProduct } from "../../services/storageOperations";
import { AuthContext } from "../../contexts/contexts";
import { getCookie } from "../../services/cookieOperations";
import { toBeChecked } from "@testing-library/jest-dom/matchers";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const { login, isUserLoggedIn } = useContext(AuthContext);

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

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const productData = () => {
    let ProductAdditionToCart = AddProduct({
      product_id: `${product.product.product_id}`,
    });
  };

  const AddProductToDB = () => {
    if (isUserLoggedIn) {
      const token = getCookie("sscape");
      console.log(token);
      const data = {
        product_id: productId,
        quantity: 1,
        size: `${selectedSize}`,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      fetch(`http://localhost:8080/AddUserCart`, options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div>
      <Navbar />
      <div className=" flex flex-row justify-around pt-28 cursor-default">
        <div className="  w-7/12 grid grid-cols-2 justify-items-center items-center p-4 pl-10 gap-2 ">
          <div>
            {product && <img src={product.product.photo1} alt="Image One" />}
          </div>
          <div>
            {product && <img src={product.product.photo2} alt="Image Two" />}
          </div>
          <div>
            {product && <img src={product.product.photo3} alt="Image Three" />}
          </div>
          <div>
            {product && <img src={product.product.photo4} alt="Image Four" />}
          </div>
        </div>
        <div className=" w-5/12 mt-5 ml-5">
          {product && (
            <div className=" flex flex-col">
              <div className="flex flex-col leading-6 border-b border-gray-200 w-5/6 pb-3">
                <span className="Product_Name">
                  {product.product.product_name}
                </span>
                <span className="Product_Main_Description">
                  {product.product.maindescription}
                </span>
              </div>
              <div className=" flex flex-col">
                <div className=" flex flex-row gap-3 justify-start pt-4 text-xl">
                  <span className=" Product_Price">
                    ₹{product.product.price}
                  </span>
                  <span className=" Product_MRP_Desc">
                    MRP{" "}
                    <span className=" Product_MRP">₹{product.product.mrp}</span>
                  </span>
                  <span className=" Product_Discount">
                    ({product.product.discount}%) OFF
                  </span>
                </div>
                <span className=" text-md text-green-500 font-medium mt-1 ml-1">
                  inclusive of all taxes
                </span>
              </div>
              <div className=" Product_Size mt-10 ">
                <span className=" tracking-wide ">SHIRT SIZE</span>
                <div className=" flex gap-10 mt-5 cursor-pointer">
                  <span
                    className={`dot ${selectedSize === "S" ? "active" : ""}`}
                    onClick={() => handleSizeClick("S")}
                  >
                    S
                  </span>
                  <span
                    className={`dot ${selectedSize === "M" ? "active" : ""}`}
                    onClick={() => handleSizeClick("M")}
                  >
                    M
                  </span>
                  <span
                    className={`dot ${selectedSize === "L" ? "active" : ""}`}
                    onClick={() => handleSizeClick("L")}
                  >
                    L
                  </span>
                  <span
                    className={`dot ${selectedSize === "XL" ? "active" : ""}`}
                    onClick={() => handleSizeClick("XL")}
                  >
                    XL
                  </span>
                </div>
              </div>
              <div className=" flex flex-row gap-5 w-10/12  justify-start items-start mt-6 cursor-pointer">
                <div
                  className="Add_To_Card_Button w-6/12"
                  onClick={(() => productData, AddProductToDB)}
                >
                  <CiShoppingCart className=" size-6 w-1/6" />
                  <span>ADD TO CART</span>
                </div>
                <div className="Add_To_Wishlist_Button w-2/5 flex flex-row">
                  <CiHeart className=" size-5 w-1/6" />
                  <span className=" w-5/12">WISHLIST</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
