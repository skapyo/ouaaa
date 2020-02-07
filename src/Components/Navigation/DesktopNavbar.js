import React, { useRef, useEffect, useState, useCallback } from "react";
import { Menu, Container, Icon, Dropdown, Input ,Label} from "semantic-ui-react";
import UserLeftItems from "./Items/UserLeftItems";
import LoggedInAdminRightItems from "./Items/AdminRightItems";
import { Link } from "react-router-dom";
import config from './../../config.json';

import {
  CountProvider,
  useCountState,
  useCountDispatch
} from "./../../count-context";

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
  "z-index": "10",
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
  "font-size": "24px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
};

const DesktopNavbar = React.memo(({ fixed, cartIconClickHandler }) => {

    // const { isLogged, userInfo, login, logout } = userAuth;
    const state = useCountState();
    const stateDispatch = useCountDispatch();

    const logoutHandler = () => {
      localStorage.removeItem(config.SESSION_STORAGE.AUTH_TOKEN);
      localStorage.removeItem(config.SESSION_STORAGE.REFRESH_TOKEN);
      localStorage.removeItem(config.SESSION_STORAGE.SUB);
      localStorage.removeItem(config.SESSION_STORAGE.ROLE);
      localStorage.removeItem(config.SESSION_STORAGE.PERSISTENT_CO);
      stateDispatch({ type: "logout" })
    }

    return (
      <>
        <Menu icon fixed="top" style={divStyle} className="borderless">
          <Container>
            <Menu.Item as={Link} to={`/`} header style={headerStyle}>
              L'atelier d'Elisabeth
            </Menu.Item>

            <Menu.Menu position="right">
              {state && state.role === 'admin' ?(<Menu.Item name="admin" as={Link} to={`/admin`}>
                <Icon name="options" size="large" />
              </Menu.Item>):null}
              

              {state?(<Menu.Item name="cart" as={Link} to={`/cart`}>
                <Icon name="cart" size="large" />
              </Menu.Item>):null}

              {state?(<Menu.Item name="heart" as={Link} to={`/heart`}>
                <Icon name="heart" size="large" />
              </Menu.Item>):null}

              <Dropdown
                item
                icon={null}
                trigger={state?<Icon name="user" color='teal' size="large" />:<Icon name="user outline"  size="large" />}
              >
                <Dropdown.Menu>
                  {!state ? (
                    <>
                      <Dropdown.Item
                        icon="sign-in"
                        text="S'authentifier"
                        as={Link} 
                        to={`/login`}
                        // onClick={() => stateDispatch({ type: "increment" })}
                      />
                      <Dropdown.Item 
                        icon="add user" 
                        text="Créer un compte" 
                        as={Link} 
                        to={`/signup`}
                      />
                    </>
                  ) : (
                    <>
                      <Dropdown.Item 
                        icon="user" 
                        text="Mon compte" 
                        as={Link} 
                        to={`/account`}
                      />
                      <Dropdown.Item
                        icon="sign-out"
                        text="Se déconnecter"
                        onClick={logoutHandler}
                      />
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>

        {/* <Menu
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
        </Menu> */}
      </>
    );
  }
);

DesktopNavbar.whyDidYouRender = true;

export default DesktopNavbar;
