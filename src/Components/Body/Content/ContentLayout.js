import React from "react";
import ShopCardGroup from "./ShopCards/ShopCardGroup";
import ProductPage from "./ProductPage/ProductPage";
import HomePage from "./HomePage/HomePage";
import Cart from './Cart/Cart';
import {Switch, Route, Link} from "react-router-dom";
import {Menu} from "semantic-ui-react";

const ContentLayout = () => {

  return (

    <Switch>

      <Route path="/categorie/:categoryId" component={() => <ShopCardGroup />} />
      <Route path="/produit/:productId" component={() => <ProductPage />} />
      <Route path="/cart" component={() => <Cart />} />
      <HomePage />
    </Switch>
  );
};


export default ContentLayout;
