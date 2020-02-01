import React, { createRef } from "react";
import { Container, Grid, Responsive, Sticky, Ref } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import {getWidth} from "./../../Utils/utils";
import DesktopAdminContentMenu from "./../../Components/Body/BodyNavigation/DesktopAdminContentMenu";
import DesktopContentMenu from "./../../Components/Body/BodyNavigation/DesktopContentMenu";
import ContentLayout from "./../../Components/Body/Content/ContentLayout";
import AdminLayout from "./../../Components/Body/Admin/AdminLayout";
import Login from './../../Components/Auth/Login';
import Signup from './../../Components/Auth/Signup';
import AccountPage from './../../Components/Auth/AccountPage';
import {PrivateRoute,SignedoutRoute,PrivateAdminRoute} from './../../Components/Auth/PrivateRoute';

const DesktopBodyLayout = () => {

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Container >
        <Switch>
        <PrivateAdminRoute
          path="/admin"
          component={() => <DesktopBodyLayoutWithMenu />}
        />
        <Route
          path="/produit"
          component={() => <ContentLayout />}
        />
        <SignedoutRoute
          path="/login"
          component={() => <Login />}
        />
        <SignedoutRoute
          path="/signup"
          component={() => <Signup />}
        />
        <PrivateRoute
          path="/account"
          component={() => <AccountPage />}
        />
        <PrivateRoute
          path="/favories"
          component={() => <AccountPage />}
        />
        <Route
          path="/"
          component={() => <DesktopBodyLayoutWithMenu />}
        />
        </Switch>
      </Container>
    </Responsive>
  );
};

const DesktopBodyLayoutWithMenu = () => {

  const contextRef = createRef();

  return (
    <Grid>
      <Ref innerRef={contextRef}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sticky  context={contextRef} offset={100} position='left'>
              <Switch>
                <PrivateAdminRoute
                  path="/admin"
                  component={() => <DesktopAdminContentMenu />}
                />
                <Route path="/" component={() => <DesktopContentMenu />} />
              </Switch>
            </Sticky>
          </Grid.Column>
          <Grid.Column width={12}>
            <Switch>
              <PrivateAdminRoute path="/admin" component={() => <AdminLayout />} />
              <Route
                path="/produit"
                component={() => <ContentLayout />}
              />
              <Route
                path="/"
                component={() => <ContentLayout />}
              />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Ref>
    </Grid>
  );
}

export default DesktopBodyLayout;
