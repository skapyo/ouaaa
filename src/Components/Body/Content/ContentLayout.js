import React from "react";
import ShopCardGroup from "./ShopCards/ShopCardGroup";
import ProductPage from "./ProductPage/ProductPage";
import Cart from './Cart/Cart';
import { Switch, Route } from "react-router-dom";

const ContentLayout = () => {

  return (
    <Switch>
      <Route
        path="/categorie/:categoryId"
        component={() => <ShopCardGroup itemsPerRow={3}/>}
      />
      <Route path="/produit/:productId" component={() => <ProductPage />} />
      <Route path="/cart" component={() => <Cart />} />
    </Switch>
  );
};


export default ContentLayout;
