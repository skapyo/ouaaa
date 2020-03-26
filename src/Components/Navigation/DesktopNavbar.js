import React from "react";
import { Menu, Container, Icon, Dropdown} from "semantic-ui-react";
import { Link } from "react-router-dom";
import config from './../../config.json';
import {useSessionState,useSessionDispatch} from "./../../Session/session";

const divStyle = {
  padding: "0 2em 0 2em",
  "border-bottom": "0.5px solid ligh grey",
  "backgound-color": "white",
  height: "50px"
};

const headerStyle = {
  "font-family": "folks",
  "font-size": "24px",
  "font-weight": "lighter",
  color: "#009C95"
};
const linkStyle = {
    "text-align":"center",
    "vertical-align": "middle",
    color: "#009C95",
    "padding-top": "14px",
    "padding-left": "100px"
};
const DesktopNavbar = React.memo(() => {

    const state = useSessionState();
    const stateDispatch = useSessionDispatch();

    const logoutHandler = () => {
      localStorage.removeItem(config.SESSION_STORAGE.AUTH_TOKEN);
      localStorage.removeItem(config.SESSION_STORAGE.REFRESH_TOKEN);
      localStorage.removeItem(config.SESSION_STORAGE.SUB);
      localStorage.removeItem(config.SESSION_STORAGE.ROLE);
      localStorage.removeItem(config.SESSION_STORAGE.PERSISTENT_CO);
      stateDispatch({ type: "logout" });
    };

    return (
      <>
        <Menu icon fixed="top" style={divStyle} className="borderless">
          <Container>
            <Menu.Item as={Link} to={`/`} header style={headerStyle}>
              Schipper Horticulture
            </Menu.Item>
              <Link position="middle"  style={linkStyle} to= "/commande.xlsx"  target="_blank" download> Télécharger directement la liste des produits à renvoyer à schipper.horti@wanadoo.fr </Link>

            <Menu.Menu position="right">
              {state && state.role === 'admin' ?(<Menu.Item name="admin" as={Link} to={`/admin`}>
                <Icon name="options" size="large" />
              </Menu.Item>):null}
              

              {state?(<Menu.Item name="cart" as={Link} to={`/cart`}>
                <Icon name="cart" size="large" />
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
                        icon="truck" 
                        text="Mes commandes" 
                        as={Link} 
                        to={`/commandes`}
                      />
                      <Dropdown.Item
                        icon="sign-out"
                        text="Déconnexion"
                        onClick={logoutHandler}
                      />
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    );
  }
);

export default DesktopNavbar;
