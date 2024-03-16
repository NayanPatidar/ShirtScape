import React from "react";
import Navbar from "../../components/Navbar/Nav";
import banner from "../../assets/banner.jpg"

function Home() {
  return (
    <div>
      <Navbar />
      <div><img src={banner} /></div>
    </div>
  );
}

export default Home;
