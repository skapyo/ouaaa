import React,{useState, useCallback} from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {useSessionState,useSessionDispatch} from "./../../Session/session";
import {removeItemsFromLS} from './../../Session/sessionHelpers';
import Hidden from './../../Hoc/HiddenComponent';
import {useQuery} from '@apollo/react-hooks';
import {GET_CATEGORYS_LIST} from './../../Queries/contentQueries';
import cogoToast from 'cogo-toast';

const MobileCategoriesMenuItems = ({backButtonHandler,onClickHandler}) => {

    const {data, loading, error} = useQuery(GET_CATEGORYS_LIST);

    if(error) {
        cogoToast.error("Il y a eu une erreur pendant le chargement de la liste des catégories...",{position:'top-right'});
        backButtonHandler();
    };

    if(loading)
        return 'chargement...';

    return (
        <>
        <Menu.Item
    onClick={backButtonHandler}
        >
        <Icon name="long arrow alternate left" />
        Menu principal
    </Menu.Item>

    {data.categorys.filter((category) => category.activated).map((category) => (
    <Menu.Item
    as={Link}
        to={`/categorie/${category.id}`}
        onClick={onClickHandler}
            >
            {/* <Icon name="long arrow alternate left" /> */}
        {category.label}
    </Menu.Item>
    ))}


</>
);

};

const MobileSidebar = ({ onHide, visible,handleSidebarHide }) => {

    const [activeItem, setActiveitem] = useState("home");
    const [displayCategoriesMenu, setShowCategoriesMenuInd] = useState(false);
    const handleItemClick = (e, { name }) => {
        setActiveitem(name);
        handleSidebarHide();
    };

    const session = useSessionState();
    const stateDispatch = useSessionDispatch();

    const logoutHandler = () => {
        removeItemsFromLS();
        stateDispatch({ type: "logout" });
    };

    const showCategoriesMenu = useCallback(() => {
        setShowCategoriesMenuInd(true);
},[setShowCategoriesMenuInd]);

    const hideCategoriesMenu = useCallback(() => {
        setShowCategoriesMenuInd(false);
},[setShowCategoriesMenuInd]);

    const hideMenu = useCallback(() => {
        handleSidebarHide();
},[handleSidebarHide]);

    return (
    <Sidebar
    as={Menu}
    animation="push"
    onHide={onHide}
    vertical
    visible={visible}
        >
        <Hidden hide={displayCategoriesMenu}>
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
    // as={Link}
    // to="/"
    // name="home"
    // active={activeItem === "home"}
    onClick={showCategoriesMenu}
        >
        <Icon name="list" />
        Les articles
    </Menu.Item>

    {!session ? (
        <>
        <Menu.Item
        as={Link}
        to="/login"
        name="login"
        active={activeItem === "login"}
        onClick={handleItemClick}
            >
            <Icon name="sign-in" />
        S'authentifier
    </Menu.Item>

    <Menu.Item
    as={Link}
        to="/signup"
        name="signup"
        active={activeItem === "signup"}
        onClick={handleItemClick}
            >
            <Icon name="add user" />
        Créer un compte
    </Menu.Item>
    </>
    )
    :
        (
        <>
        <Menu.Item
        as={Link}
        to="/cart"
        name="cart"
        active={activeItem === "cart"}
        onClick={handleItemClick}
            >
            <Icon name="cart" />
        Mon panier
    </Menu.Item>

    <Menu.Item
    as={Link}
        to="/commandes"
        name="orders"
        active={activeItem === "orders"}
        onClick={handleItemClick}
            >
            <Icon name="truck" />
        Mes commandes
    </Menu.Item>


    <Menu.Item
    as={Link}
        to="/"
        name="signout"
        // active={activeItem === "signout"}
        onClick={() => {logoutHandler(); handleSidebarHide();}}
    >
    <Icon name="sign-out" />
        Se déconnecter
    </Menu.Item>

    </>
    )}
</Hidden>
    <Hidden hide={!displayCategoriesMenu}>
<MobileCategoriesMenuItems backButtonHandler={hideCategoriesMenu} onClickHandler={hideMenu}/>
    </Hidden>
    </Sidebar>
);
};

export default MobileSidebar;
