import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const LoggedInRightItems = () => {
  return (
    <Menu.Item position="right">
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

export const LoggedOutRightItems = () => {
  return (
    <Menu.Item position="right">
      <Button as={Link} to="/login" inverted icon>
        <Icon name="sign in" />
        Connexion
      </Button>
      <Button
        as={Link}
        to="/signup"
        inverted
        style={{ marginLeft: "0.5em" }}
        icon
      >
        <Icon name="signup" />
        Inscription
      </Button>
    </Menu.Item>
  );
};
