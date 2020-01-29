import React,{useRef, useEffect,useState,useCallback} from "react";
import { Menu, Container, Icon, Dropdown, Input } from "semantic-ui-react";
import UserLeftItems from "./Items/UserLeftItems";
import LoggedInAdminRightItems from "./Items/AdminRightItems";
import { Link } from "react-router-dom";
import { withAuth } from "./../../Hooks/useAuth";
import useTraceUpdate from './../../Hooks/useTraceUpdate';
import LoginModal from "../Auth/LoginModal";

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
  "font-size": "20px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
};


const DesktopNavbar = ({ fixed, cartIconClickHandler, userAuth }) => {

  useTraceUpdate({ fixed, cartIconClickHandler, userAuth });

  const { isLogged, userInfo, login, logout } = userAuth;


  const [loginModalOpen, setLoginModalOpenInd] = useState(false);

  const onCloseHandler = useCallback(() => {
    setLoginModalOpenInd(false);
  },[]);

  return (
    <>
      <Menu
  
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
              name="admin"
              as={Link}
              to={`/admin`}
            >
              <Icon name="options" size="large" />
            </Menu.Item>

            <Menu.Item
              name="cart"
              as={Link}
              to={`/cart`}
            >
              <Icon name="cart" size="large" />
            </Menu.Item>

            <Dropdown
              item
              icon={null}
              trigger={<Icon name="user outline" size="large" />}
            >
              <Dropdown.Menu>

                { !isLogged ? (              
                <>  
                  <Dropdown.Item
                    icon="sign-in"
                    text="S'authentifier"
                    onClick={() => setLoginModalOpenInd(true)}
                  />
                  <Dropdown.Item icon="add user" text="Créer un compte" />
                </>
                ):(      
                <>          
                  <Dropdown.Item icon="user" text="Mon compte" />
                  <Dropdown.Item
                    icon="sign-out"
                    text="Se déconnecter"
                    onClick={() => logout()}
                  />
                </>
                )}
              </Dropdown.Menu>
            </Dropdown>
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

      <LoginModal open={loginModalOpen} onCloseHandler={onCloseHandler} userAuth={userAuth}/>

    </>
  );
};

DesktopNavbar.whyDidYouRender = true;

export default withAuth(DesktopNavbar);
