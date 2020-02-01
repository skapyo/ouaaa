import React from "react";
import ShopCardGroup from "./ShopCards/ShopCardGroup";
import ProductPage from "./ProductPage/ProductPage";
import { Switch, Route } from "react-router-dom";

const ContentLayout = () => {

  return (
    <Switch>
      <Route
        path="/categorie/:categoryId"
        component={() => <ShopCardGroup itemsPerRow={3}/>}
      />
      <Route path="/produit/:productId" component={() => <ProductPage />} />
    </Switch>
  );
};


export default ContentLayout;
