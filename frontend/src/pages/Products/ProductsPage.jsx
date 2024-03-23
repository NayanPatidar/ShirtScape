import React from "react";
import "./ProductsPage.css";
import banner4 from "../../assets/banner4.png";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "400px",
  backgroundSize: "cover",
};

const ProductsPage = () => {
  return (
    <div className="ProductsPageMain flex flex-col pt-16">
      {/* <div style={{ ...divStyle }}>
        <img src={banner4} />
      </div> */}
      <div className=" ProductDescriptionArea"></div>
      <div className=" flex flex-row">
        <div className="FilterTableMain"></div>
        <div className="ProductsListMain"></div>
      </div>
    </div>
  );
};

export default ProductsPage;
