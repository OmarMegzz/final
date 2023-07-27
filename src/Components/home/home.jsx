import React from "react";
import styles from "./Home.module.css";
import FeaturedProudcts from "../FeaturedProudcts/FeaturedProudct";
import CategorySlider from "../categorySlider/categorySlider";
import Mainslider from "../Mainslider/Mainslider";

export default function Home() {
  return (
    <>
      <Mainslider /> 
      <CategorySlider />
      <FeaturedProudcts />
    </>
  );
}
