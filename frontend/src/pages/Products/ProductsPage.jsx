import React, { useState } from "react";
import "./ProductsPage.css";
import { useEffect } from "react";
import ProductsPageCard from "../../components/ProductsCard/ProductsPageCards";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "400px",
  backgroundSize: "cover",
};

const ProductsPage = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchProductsData();
  }, []);

  function shuffleArray(array, seed) {
    const seededRandom = (min, max) => {
      let localSeed = seed % 2147483647;
      localSeed = localSeed < 0 ? localSeed + 2147483646 : localSeed;
      return (
        min + ((localSeed = (localSeed * 16807) % 2147483647) % (max - min + 1))
      );
    };

    for (let i = array.length - 1; i > 0; i--) {
      const j = seededRandom(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const seed = 2413;

  const fetchProductsData = async () => {
    const response = await fetch("http://localhost:8080/products/men");
    const ProductsData = await response.json();
    const shuffledData = shuffleArray(ProductsData.clothsData.slice(), seed);
    // console.log(shuffledData);
    setProducts(shuffledData);
  };

  return (
    <div className="ProductsPageMain flex flex-col pt-16">
      {/* <div style={{ ...divStyle }}>
        <img src={banner4} />
      </div> */}
      <div className=" ProductDescriptionArea"></div>
      <div className=" flex flex-row">
        <div className="FilterTableMain"></div>
        <div className="ProductsListMain p-5">
          <div className=" ProductsArea grid grid-cols-4 gap-y-24 justify-items-center">
            {products &&
              products.map((product, index) => (
                <div key={index} className=" ProductBoxMain">
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
      </div>
    </div>
  );
};

export default ProductsPage;