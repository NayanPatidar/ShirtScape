import React, { Component, useContext, useEffect, useState } from "react";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Home.css";
import Cards from "../../components/ProductsCard/HomeProductsCard";
import Navbar from "../../components/Navbar/Nav";
import { SearchContext } from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";

function Home() {
  const [TShirts, setTShirts] = useState();
  const [Categories, setCategory] = useState();
  const [NewArrivals, setNewArrivals] = useState();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log(backendUrl);

      const TshirtData = await fetch(`${backendUrl}mainpage/TShirts`);
      const NewArrivalsData = await fetch(`${backendUrl}mainpage/NewArrivals`);
      const categories = await fetch(`${backendUrl}mainpage/images`);
      console.log(TshirtData);

      if (!TshirtData.ok || !categories.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await TshirtData.json();
      const categoryData = await categories.json();
      const newArrivalData = await NewArrivalsData.json();
      setCategory(categoryData.images);
      setNewArrivals(newArrivalData.tshirtsDetails);

      if (JSON.stringify(data) !== JSON.stringify(TShirts)) {
        setTShirts(data.tshirtsDetails);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const navigate = useNavigate();
  const ProductIdCheck = (ProductId) => {
    navigate(`/products/${ProductId}`);
  };

  useEffect(() => {
    var counter = 2;
    const interval = setInterval(() => {
      document.getElementById("radio" + counter).checked = true;

      counter++;
      if (counter > 3) {
        counter = 1;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" cursor-default">
      <div className=" containerSlider">
        <div className="slider-wrapper ">
          <div className="slider">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />

            <img id="slide-1" src={banner1} className="first" />
            <img id="slide-2" src={banner2} />
            <img id="slide-3" src={banner3} />

            <div className="navigation-auto">
              <div className="auto-btn1"></div>
              <div className="auto-btn2"></div>
              <div className="auto-btn3"></div>
            </div>
          </div>
          <div className="slider-nav">
            <label for="radio1" className="manual-btn"></label>
            <label for="radio2" className="manual-btn"></label>
            <label for="radio3" className="manual-btn"></label>
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center align-middle mt-16">
        <span className="Categories">CATEGORIES</span>
        <div className="CategoryTypes">
          {Categories &&
            Categories.map((category, index) => (
              <div className=" CategoriesMainCard relative" key={index}>
                <div className=" EachCategoryProp relative flex flex-col">
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
        <div className="TopSellingProds flex flex-row gap-5 justify-around items-center mt-3">
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

        <span className="Categories mt-20">NEW ARRIVALS</span>
        <div className="NewArrivalsTypes mb-10 mt-6">
          {NewArrivals &&
            NewArrivals.map((category, index) => (
              <div
                className=" NewArrivalsMainCard relative"
                key={index}
                onClick={() => ProductIdCheck(category.tshirts.product_id)}
              >
                <div className=" relative flex flex-col">
                  <img
                    src={category.tshirts.photo1}
                    className=" EachImageCategory"
                  />
                  <span className="ProductName">
                    {category.tshirts.product_name}
                  </span>
                  <span className="ProductDesc">
                    {category.tshirts.genericdesc}
                  </span>
                  <div>
                    <span className="ProductPrice">
                      ₹{category.tshirts.price}
                    </span>
                    <span className="ProductDiscount">
                      ₹{category.tshirts.mrp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
