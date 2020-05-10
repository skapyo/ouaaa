import React from "react";
import { Switch, Route } from "react-router-dom";
import CategoriesAdmin from "./CategoriesAdmin/CategoriesAdmin";
import AddProductAdmin from "./ProductsAdmin/AddProductAdmin";
import ModifyProductAdmin from './ProductsAdmin/ModifyProductAdmin';
import SelectProductAdmin from './ProductsAdmin/SelectProductAdmin';
import OrdersAdmin from './OrdersAdmin/OrdersAdmin';
import ProductDisplayAdmin from './ProductsAdmin/display/ProductDisplayAdmin';
import UsersAdmin from './UsersAdmin/UsersAdmin';
import StockAdmin from './Stock/StockAdmin';

import PrivateAdminRoute from './../../Auth/PrivateRoute';

const AdminLayout = () => {
  return (
    <Switch>
      <PrivateAdminRoute path="/admin/categories" component={() => <CategoriesAdmin />} />
      <PrivateAdminRoute
        path="/admin/articles/add"
        component={() => <AddProductAdmin />}
      />
      <PrivateAdminRoute
        path="/admin/articles/select/"
        component={() => <SelectProductAdmin />}
      />
      <PrivateAdminRoute
        path="/admin/articles/modify/:productId"
        component={() => <ModifyProductAdmin />}
      />
      <PrivateAdminRoute path="/admin/products/" component={() => <ProductDisplayAdmin/>} />
      <PrivateAdminRoute path="/admin/orders" component={() =>  <OrdersAdmin/>} />
      <PrivateAdminRoute path="/admin/users" component={() => <UsersAdmin />} />
      <PrivateAdminRoute path="/admin/stock/:productId" component={() => <StockAdmin />} />
      <PrivateAdminRoute path="/admin" component={() => <CategoriesAdmin />} />
    </Switch>
  );
};

export default AdminLayout;
