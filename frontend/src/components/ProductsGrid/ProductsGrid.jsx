import React from "react";
import ProductsPageCard from "../ProductsCard/ProductsPageCards";
import "./ProductsGrid.css"

const ProductGrid = ({ productsData }) => {
  return (
    <div className="ProductsListMain ">
      {productsData != null ? (
        productsData.length > 0 ? (
          <div className=" ProductsArea p-2  pt-8 pb-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-y-5 justify-items-center align-middle items-center justify-center overflow-hidden">
            {productsData.map((product, index) => (
              <div key={index} className=" ProductBoxMain z-0">
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
        )
      ) : (
        <span className=" flex w-full text-3xl mt-5 font-semibold justify-center items-center">
          Loading ...
        </span>
      )}
    </div>
  );
};

export default ProductGrid;
