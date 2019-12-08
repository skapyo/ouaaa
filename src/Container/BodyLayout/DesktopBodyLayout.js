import React, { createRef } from "react";
import { Container, Grid, Responsive, Sticky, Ref } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import getWidth from "./../../Utils/utils";

import DesktopAdminContentMenu from "./../../Components/Body/BodyNavigation/DesktopAdminContentMenu";
import DesktopContentMenu from "./../../Components/Body/BodyNavigation/DesktopContentMenu";

import ShopCardGroup from "./../../Components/Body/ShopCards/ShopCardGroup";
import AdminLayout from "./../../Components/Body/Admin/AdminLayout";

const DesktopBodyLayout = ({ children }) => {
  const contextRef = createRef();

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Container>
        <Grid>
          <Ref innerRef={contextRef}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Sticky context={contextRef} offset={70}>
                  <Switch>
                    <Route
                      path="/admin"
                      component={() => <DesktopAdminContentMenu />}
                    />
                    <Route path="/" component={() => <DesktopContentMenu />} />
                  </Switch>
                </Sticky>
              </Grid.Column>
              <Grid.Column width={13}>
                <Switch>
                  <Route path="/admin" component={() => <AdminLayout />} />
                  <Route
                    path="/"
                    component={() => <ShopCardGroup itemsPerRow={3} />}
                  />
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Ref>
        </Grid>
      </Container>
    </Responsive>
  );
};

export default DesktopBodyLayout;
