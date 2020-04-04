import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";


const divStyle = {
    padding: "0",
    "border-bottom": "0.5px solid ligh grey",
    "backgound-color": "white",
    height: "50px"
};

const headerStyle = {
    "font-family": "Pacifico, cursive",
    "font-size": "24px",
    "font-weight": "lighter",
    color: "#009C95",
    border:0
};

const MobileNavbar = ({ toggleHandler }) => {
    return (
        <Menu style={divStyle}>
            <Menu.Item onClick={toggleHandler} >
                <Icon name="sidebar" />
            </Menu.Item>
            <Menu.Item as={Link} to={`/`} header style={headerStyle}>
                L'atelier d'Elisabeth
            </Menu.Item>
        </Menu>
    );
};

export default MobileNavbar;
