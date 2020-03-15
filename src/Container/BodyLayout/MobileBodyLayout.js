import React from "react";
import { Responsive, Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import { getWidth } from "./../../Utils/utils";
import ContentLayout from "./../../Components/Body/Content/ContentLayout";
import {PrivateRoute,SignedoutRoute,PrivateAdminRoute} from './../../Components/Auth/PrivateRoute';
import Login from './../../Components/Auth/Login';
import Signup from './../../Components/Auth/Signup';

const MobileBodyLayout = () => {
  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Container>
        {/* <ContentLayout itemsPerRow={1} /> */}
        <Switch>
          <SignedoutRoute
              path="/login"
              component={() => <Login />}
            />
            <SignedoutRoute
              path="/signup"
              component={() => <Signup />}
            />
        </Switch>
      </Container>
    </Responsive>
  );
};

export default MobileBodyLayout;
