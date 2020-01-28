import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import UserLeftItems from "./Items/UserLeftItems";
import LoggedInAdminRightItems from "./Items/AdminRightItems";
import { Link } from "react-router-dom";

const divStyle = {
  padding: "0 2em 0 2em",
  "border-bottom": "0.5px solid ligh grey",
  "backgound-color": "white",
  height: "50px"
};

const div2Style = {
  padding: "0 2em 0 2em",
  // "border-bottom": "0.5px solid ligh grey",
  "backgound-color": "white",
  fixed: "top",
  // "z-index": "101",
  "margin-top": "50px",
  position: "fixed",
  "min-height": "30px",
  color: "grey"
};

const itemStyle = {
  border: "none"
};

const headerStyle = {
  "font-family": "Pacifico, cursive",
  "font-size": "20px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
};

const DesktopNavbar = ({ fixed, cartIconClickHandler }) => {
  return (
    <>
      {/* <div style={divStyle}>

      </div> */}
      <Menu
        // size="large"
        icon
        fixed="top"
        style={divStyle}
        className="borderless"
      >
        <Container>
          <Menu.Item as={Link} to={`/`} header style={headerStyle}>
            L'atelier d'Elisabeth
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              name="closest"
              as={Link}
              to={`/admin`}
              // active={activeItem === 'closest'}
              // onClick={this.handleItemClick}
            >
              <Icon name="options" size="large" />
            </Menu.Item>
            <Menu.Item
              name="closest"
              // active={activeItem === 'closest'}
              // onClick={this.handleItemClick}
            >
              <Icon name="user outline" size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <Menu
        fixed="top"
        size="tiny"
        icon
        style={div2Style}
        className="borderless"
      >
        <Container style={{ display: "flex", "align-items": "center" }}>
          <Icon name="home" size="large" />
          <div style={{ display: "flex", "align-items": "center" }}>
            &nbsp;&nbsp;>&nbsp;&nbsp;Admin &nbsp;&nbsp;>&nbsp;&nbsp; test
          </div>
        </Container>
      </Menu>
      {/* <Menu
        fixed={fixed ? "top" : null}
        inverted
        pointing
        secondary
        color="teal"
        size="large"
      > */}
      {/* <Container> */}
      {/*  Left items of the navbar*/}
      {/* <UserLeftItems cartIconClickHandler={cartIconClickHandler} /> */}

      {/* Add test to identify loggeg user */}
      {/* <LoggedInAdminRightItems />
        </Container>
      </Menu> */}
    </>
  );
};

export default DesktopNavbar;
