import React from "react";
import ShopCardGroup from "./ShopCards/ShopCardGroup";
import ProductPage from "./ProductPage/ProductPage";
import HomePage from "./HomePage/HomePage";
import Cart from './Cart/Cart';
import {Switch, Route, Link} from "react-router-dom";
import PrivateRoute from "../../Auth/PrivateRoute";
import {useSessionState} from '../../../Context/Session/session';

const ContentLayout = () => {
    const auth = useSessionState();

  return (

      <Switch>
          <Route path="/categorie/:categoryId/page/:pageNumber" component={ShopCardGroup} />
          <Route path="/categorie/:categoryId/" component={ShopCardGroup} />
          <Route path="/produit/:productId" component={ProductPage} />
          {auth && (<Route path="/favoris" render={(props) => <ShopCardGroup {...props} action='favorites'/>} />)}
          {/* <PrivateRoute path="/favoris" component={(props) => <ShopCardGroup {...props} action='favorites'/>} /> */}

          <Route path="/cart" component={Cart} />
          <HomePage />
      </Switch>
  );
};


export default ContentLayout;
