import React from "react";
import { Switch, Route } from "react-router-dom";

import CategoriesAdmin from "./CategoriesAdmin/CategoriesAdmin";
import AddProductAdmin from "./ProductsAdmin/AddProductAdmin";
import ModifyProductAdmin from './ProductsAdmin/ModifyProductAdmin';
import ArticlesPicturesAdmin from "./ArticlesPicturesAdmin";
import SelectProductAdmin from './ProductsAdmin/SelectProductAdmin';

import PrivateRoute from './../../Auth/PrivateRoute';

const AdminLayout = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin/categories" component={() => <CategoriesAdmin />} />
      <PrivateRoute
        path="/admin/articles/add"
        component={() => <AddProductAdmin />}
      />
      <PrivateRoute
        path="/admin/articles/select/"
        component={() => <SelectProductAdmin />}
      />
      <PrivateRoute
        path="/admin/articles/modify/:productId"
        component={() => <ModifyProductAdmin />}
      />
      <PrivateRoute
        path="/admin/articles/pictures"
        component={() => <ArticlesPicturesAdmin />}
      />
      <PrivateRoute path="/admin/articles/display" component={() => null} />
      {/* <Route path="/admin/commandes" component={() => null} />
      <Route path="/admin/utilisateurs" component={() => null} /> */}
      <PrivateRoute path="/admin" component={() => <CategoriesAdmin />} />
    </Switch>
  );
};

export default AdminLayout;
