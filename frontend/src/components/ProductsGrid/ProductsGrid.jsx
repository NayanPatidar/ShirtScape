import React from "react";
import ProductsPageCard from "../ProductsCard/ProductsPageCards";

const ProductGrid = ({ productsData }) => {
  return (
    <div className="ProductsListMain p-5">
      <div className=" ProductsArea grid grid-cols-4 gap-y-24 justify-items-center">
        {productsData &&
          productsData.map((product, index) => (
            <div key={index} className=" ProductBoxMain z-0">
              <ProductsPageCard
                Image={product.cloths.photo1}
                Name={product.cloths.product_name}
                Description={product.cloths.genericdesc}
                Price={product.cloths.price}
                MRP={product.cloths.mrp}
                Discount={product.cloths.discount}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
