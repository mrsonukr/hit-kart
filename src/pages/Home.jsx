import React from "react";
import Header from "../components/Header";
import CatScroll from "../components/ui/CatScroll";
import BannerSlider from "../components/ui/BannerSlider";
import ProductGrid from "../components/ui/ProductGrid";

const Home = () => {
  return (
    <div>
      <Header />
      <CatScroll />
      <BannerSlider />
      <div className="min-h-screen bg-gray-100">
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
