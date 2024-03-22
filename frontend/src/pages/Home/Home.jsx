import React, { Component, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Nav";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Home.css";
import Cards from "../../components/ProductsCard/HomeProductsCard";

const slideImages = [
  {
    url: banner1,
  },
  {
    url: banner2,
  },
  {
    url: banner3,
  },
];

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "400px",
  backgroundSize: "cover",
};

function Home() {
  const [TShirts, setTShirts] = useState();
  const [Categories, setCategory] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/mainpage/TShirts");
      const categories = await fetch("http://localhost:8080/mainpage/images");
      if (!response.ok || !categories.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const categoryData = await categories.json();
      setCategory(categoryData.images);
      if (JSON.stringify(data) !== JSON.stringify(TShirts)) {
        setTShirts(data.tshirtsDetails);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="slide-container pt-16">
        <Fade>
          {slideImages.map((image, index) => (
            <div key={index}>
              <div
                style={{ ...divStyle, backgroundImage: `url(${image.url})` }}
              ></div>
            </div>
          ))}
        </Fade>
      </div>
      <div className=" h-1 bg-black"></div>

      <div className=" flex flex-col justify-center items-center align-middle mt-14">
        <span className="Categories">CATEGORIES</span>
        <div className="CategoryTypes">
          {Categories &&
            Categories.map((category, index) => (
              <div key={index} className=" EachCategoryProp" >
                <img src={category.photo1} className=" EachImageCategory"/>
              </div>
            ))}
        </div>

        <span className="TopSellingTitle mt-20">TOP SELLING</span>
        <div className="TopSellingProds flex flex-row justify-around items-center mt-3 mb-3">
          {
            TShirts &&
              TShirts.map((tShirt, index) => (
                <div key={index} className="" style={{ width: "23.5%" }}>
                  <Cards
                    photo={tShirt.tshirts.photo1}
                    name={tShirt.tshirts.product_name}
                    description={tShirt.tshirts.genericdesc}
                    price={tShirt.tshirts.price}
                    mrp={tShirt.tshirts.mrp}
                    discount={tShirt.tshirts.discount}
                  />
                </div>
              ))
            // console.log(TShirts.tShirt.product_name)
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
