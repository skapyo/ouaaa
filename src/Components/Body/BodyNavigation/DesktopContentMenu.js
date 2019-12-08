import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

const DesktopContentMenu = () => {
  const [activeItem, setActiveitem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveitem(name);

  return (
    <Menu fluid vertical>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="messages"
        active={activeItem === "messages"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="friends"
        active={activeItem === "friends"}
        onClick={handleItemClick}
      />
    </Menu>
  );
};

export default DesktopContentMenu;
