import React, { Component, useContext, useEffect, useState } from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Home.css";
import Cards from "../../components/ProductsCard/HomeProductsCard";
import Navbar from "../../components/Navbar/Nav";
import { SearchContext } from "../../contexts/contexts";

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

  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const TshirtData = await fetch("http://localhost:8080/mainpage/TShirts");
      const categories = await fetch("http://localhost:8080/mainpage/images");

      if (!TshirtData.ok || !categories.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await TshirtData.json();
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
    <div className=" cursor-default">
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
              <div className=" CategoriesMainCard relative">
                <div
                  key={index}
                  className=" EachCategoryProp relative flex flex-col"
                >
                  <img
                    src={category.photos.photo1}
                    className=" EachImageCategory"
                  />
                </div>
                <div className="CategoryNameEachCard z-100 h-5 absolute bottom-5">
                  {category.photos.category}
                </div>
              </div>
            ))}
        </div>

        <span className="TopSellingTitle mt-20">TOP SELLING</span>
        <div className="TopSellingProds flex flex-row gap-5 justify-around items-center mt-3 mb-3">
          {TShirts &&
            TShirts.map((tShirt, index) => (
              <div key={index} className="" style={{ width: "23.5%" }}>
                <Cards
                  photo={tShirt.tshirts.photo1}
                  name={tShirt.tshirts.product_name}
                  description={tShirt.tshirts.genericdesc}
                  price={tShirt.tshirts.price}
                  mrp={tShirt.tshirts.mrp}
                  discount={tShirt.tshirts.discount}
                  ProductId={tShirt.tshirts.product_id}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
