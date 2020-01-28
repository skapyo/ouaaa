import React, { useState, useEffect } from "react";
import ShopCardGroup from "./ShopCards/ShopCardGroup";
import ProductPage from "./ProductPage/ProductPage";
import { Switch, Route } from "react-router-dom";

import { ScaleLoader } from "halogenium";
import update from "immutability-helper";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  //   console.log(width);
  //   console.log("true height");
  //   console.log(height);
  return {
    width,
    height
  };
};



const ContentLayout = () => {
  
//   console.log(loading);

//   useEffect(() => {
//     // let stateTemp = [];
//     const test = ["img1", "img2", "img3"];
//     test.map(object => {
//       addListener(object);
//     });
//     changeListenerValue("img2", false);
//     changeListenerValue("img1", false);
//     changeListenerValue("img3", false);
//     changeListenerValue("img3", true);
//   }, []);

  //   useEffect(() => {
  //     addListener("img2");
  //   },[]);
  //   useEffect(() => {
  //     addListener("img3");
  //   },[]);

  const { width, height } = getWindowDimensions();
  const midHeight = (height - 230 - 230 - 10) / 2;
  const midHeightString = `${midHeight}px 0 0 0`;

//   if (loading) return <Loader midHeightString={midHeightString} />;

  return (
    <Switch>
      <Route
        path="/categorie/:categoryId"
        component={() => <ShopCardGroup />}
      />
      <Route path="/produit/:productId" component={() => <ProductPage />} />
    </Switch>
  );
};

const Loader = ({ midHeightString }) => {
  return (
    <div
      style={{ width: "100%", "text-align": "center", margin: midHeightString }}
    >
      <div style={{ display: "inline-block" }}>
        <ScaleLoader color="#10A29B" size="20px" margin="2px" />
      </div>
    </div>
  );
};

export default ContentLayout;
