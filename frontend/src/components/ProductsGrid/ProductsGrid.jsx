import React from "react";
import ProductsPageCard from "../ProductsCard/ProductsPageCards";

const ProductGrid = ({ productsData }) => {
  return (
    <div className="ProductsListMain ">
      {productsData &&
        (productsData.length > 0 ? (
          <div className=" ProductsArea p-2 pb-40 grid grid-cols-4 gap-y-40 justify-items-center overflow-hidden">
            {productsData.map((product, index) => (
              <div key={index} className=" ProductBoxMain z-0 ">
                <ProductsPageCard
                  Image={product.cloths.photo1}
                  Name={product.cloths.product_name}
                  Description={product.cloths.genericdesc}
                  Price={product.cloths.price}
                  MRP={product.cloths.mrp}
                  Discount={product.cloths.discount}
                  ProductId={product.cloths.product_id}
                />
              </div>
            ))}
          </div>
        ) : (
          <span className=" flex w-full text-3xl font-semibold justify-center items-center">
            No Cloths Available
          </span>
        ))}
    </div>
  );
};

export default ProductGrid;
