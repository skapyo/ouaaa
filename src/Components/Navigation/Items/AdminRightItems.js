import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link, Switch, Route } from "react-router-dom";

const LoggedInAdminRightItems = () => {
  return (
    <Menu.Item position="right">
      <Switch>
        <Route
          path="/admin"
          component={() => (
            <Button as={Link} to="/admin" inverted active icon>
              <Icon name="setting" />
              Admin
            </Button>
          )}
        />
        <Route
          path="/"
          component={() => (
            <Button as={Link} to="/admin" inverted icon>
              <Icon name="setting" />
              Admin
            </Button>
          )}
        />
      </Switch>

      <Button
        as={Link}
        to="/logout"
        inverted
        style={{ marginLeft: "0.5em" }}
        icon
      >
        <Icon name="sign out" />
        Déconnexion
      </Button>
    </Menu.Item>
  );
};

export default LoggedInAdminRightItems;
