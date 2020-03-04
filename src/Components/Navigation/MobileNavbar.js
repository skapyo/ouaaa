import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import LoggedInAdminRightItems from "./Items/AdminRightItems";

const MobileNavbar = ({ toggleHandler }) => {
  return (
    <Menu inverted pointing secondary size="large">
      <Menu.Item onClick={toggleHandler}>
        <Icon name="sidebar" />
      </Menu.Item>
      <LoggedInAdminRightItems />
    </Menu>
  );
};

export default MobileNavbar;
