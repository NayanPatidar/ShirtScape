import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  let { productId } = useParams();

  return (
    <div>
      <h3>{productId}</h3>
      Abcdefghijlklmnopqrstuvwxyz
    </div>
  );
};

export default Product;
