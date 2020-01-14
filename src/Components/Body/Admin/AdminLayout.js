import React from "react";
import { Switch, Route } from "react-router-dom";

import CategoriesAdmin from "./CategoriesAdmin/CategoriesAdmin";
import AddProductAdmin from "./ProductsAdmin/AddProductAdmin";
import ModifyProductAdmin from './ProductsAdmin/ModifyProductAdmin';
import ArticlesPicturesAdmin from "./ArticlesPicturesAdmin";
import SelectProductAdmin from './ProductsAdmin/SelectProductAdmin';

const AdminLayout = () => {
  return (
    <Switch>
      <Route path="/admin/categories" component={() => <CategoriesAdmin />} />
      <Route
        path="/admin/articles/add"
        component={() => <AddProductAdmin />}
      />
      <Route
        path="/admin/articles/select/"
        component={() => <SelectProductAdmin />}
      />
      <Route
        path="/admin/articles/modify/:productId"
        component={() => <ModifyProductAdmin />}
      />
      <Route
        path="/admin/articles/pictures"
        component={() => <ArticlesPicturesAdmin />}
      />
      <Route path="/admin/articles/display" component={() => null} />
      {/* <Route path="/admin/commandes" component={() => null} />
      <Route path="/admin/utilisateurs" component={() => null} /> */}
      <Route path="/admin" component={() => <CategoriesAdmin />} />
    </Switch>
  );
};

export default AdminLayout;
