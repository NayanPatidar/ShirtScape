import React, { Component, useEffect } from "react";
import Navbar from "../../components/Navbar/Nav";
import banner1 from "../../assets/banner1.jpg";
import banner3 from "../../assets/banner2.png";
import banner2 from "../../assets/banner3.jpg";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Home.css";

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
  useEffect(() => {
    
  });

  return (
    <div>
      <Navbar />
      <div className="slide-container">
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
      <div className=" flex flex-col justify-center items-center align-middle mt-16">
        <span className="TopSellingTitle">TOP SELLING</span>
        <div className="TopSellingProds">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
