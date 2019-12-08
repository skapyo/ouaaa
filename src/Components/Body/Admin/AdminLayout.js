import React from "react";
import { Switch, Route } from "react-router-dom";

import CategoriesAdmin from "./CategoriesAdmin";
import ArticlesAddAdmin from "./ArticlesAddAdmin";
import ArticlesModifyAdmin from "./ArticlesModifyAdmin";
import ArticlesPicturesAdmin from "./ArticlesPicturesAdmin";

const AdminLayout = () => {
  return (
    <Switch>
      <Route path="/admin/categories" component={() => <CategoriesAdmin />} />
      <Route
        path="/admin/articles/add"
        component={() => <ArticlesAddAdmin />}
      />
      <Route
        path="/admin/articles/modify"
        component={() => <ArticlesModifyAdmin />}
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
