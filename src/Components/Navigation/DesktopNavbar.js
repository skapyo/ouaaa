import React from "react";
import { Menu, Container } from "semantic-ui-react";
import UserLeftItems from "./Items/UserLeftItems";
import LoggedInAdminRightItems from "./Items/AdminRightItems";

const DesktopNavbar = ({ fixed, cartIconClickHandler }) => {
  return (
    <Menu
      fixed={fixed ? "top" : null}
      inverted
      pointing
      secondary
      color="teal"
      size="large"
    >
      <Container>
        {/*  Left items of the navbar*/}
        <UserLeftItems cartIconClickHandler={cartIconClickHandler} />

        {/* Add test to identify loggeg user */}
        <LoggedInAdminRightItems />
      </Container>
    </Menu>
  );
};

export default DesktopNavbar;
