import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserLeftItems = ({ cartIconClickHandler }) => {
  const [activeItem, setActiveitem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveitem(name);

  return (
    <>
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      >
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item
        as="a"
        name="cart"
        active={activeItem === "cart"}
        onClick={() => {
          cartIconClickHandler();
          handleItemClick();
        }}
      >
        <Icon name="cart" />
        Panier
      </Menu.Item>
    </>
  );
};

export default UserLeftItems;
