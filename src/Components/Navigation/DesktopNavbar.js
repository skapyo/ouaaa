import React from "react";
import { Menu, Container, Icon, Dropdown} from "semantic-ui-react";
import { Link } from "react-router-dom";
import config from './../../config.json';
import {removeItemsFromLS} from './../../Session/sessionHelpers';
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

const DesktopNavbar = React.memo(() => {

    const session = useSessionState();
    const sessionDispatch = useSessionDispatch();

    const logoutHandler = () => {
        removeItemsFromLS();
      sessionDispatch({ type: "logout" });
    };

    return (
      <>
        <Menu icon fixed="top" style={divStyle} className="borderless">
          <Container>
            <Menu.Item as={Link} to={`/`} header style={headerStyle}>
              Schipper Horticulture
            </Menu.Item>
              <a href="https://static.commande.schipper-horticulture.fr/Bon_de_commande.xlsx" class="downloadLink"  target="_blank" >Télécharger directement la liste des produits à renvoyer à schipper.horti@wanadoo.fr </a>
            <Menu.Menu position="right">
              {session && session.role === 'admin' ?(<Menu.Item name="admin" as={Link} to={`/admin`}>
                <Icon name="options" size="large" />
              </Menu.Item>):null}
              

              {session?(<Menu.Item name="cart" as={Link} to={`/cart`}>
                <Icon name="cart" size="large" />
              </Menu.Item>):null}


                  <Dropdown
                item
                icon={null}
                trigger={session?<Icon name="user" color='teal' size="large" />:<Icon name="user outline"  size="large" />}
              >
                <Dropdown.Menu>
                  {!session ? (
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
