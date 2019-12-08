import React from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import UserLeftItems from "./Items/UserLeftItems";

const MobileSidebar = ({ onHide, visible }) => {
  return (
    <Sidebar
      as={Menu}
      animation="push"
      inverted
      onHide={onHide}
      vertical
      visible={visible}
    >
      <UserLeftItems />
    </Sidebar>
  );
};

export default MobileSidebar;
