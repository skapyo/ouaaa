import React,{useState, useCallback} from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import {useSessionState,useSessionDispatch} from "../../Context/Session/session";
import {removeItemsFromLS} from '../../Context/Session/sessionHelpers';
import Hidden from './../../Hoc/HiddenComponent';
import {useQuery} from '@apollo/react-hooks';
import {GET_CATEGORIES_LIST} from './../../Queries/contentQueries';
import cogoToast from 'cogo-toast';
import {useDeviceContext} from './../../Context/Device/device';

const MobileCategoriesMenuItems = ({backButtonHandler,onClickHandler}) => {

    const {data, loading, error} = useQuery(GET_CATEGORIES_LIST);
    const device = useDeviceContext();

    if(error) {
        cogoToast.error("Il y a eu une erreur pendant le chargement de la liste des catégories...",{position:device.toastPosition});
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

    {data.categories.filter((category) => category.activated).map((category) => (
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

    const location = useLocation();

    const device = useDeviceContext();

    const handleItemClick = (e, { name }) => {
        setActiveitem(name);
        handleSidebarHide();
    };

    const session = useSessionState();
    const stateDispatch = useSessionDispatch();

    const logoutHandler = () => {
        removeItemsFromLS();
        stateDispatch({ type: "logout" });
        cogoToast.success("Vous êtes maintenant déconnecté(e).",{position : device.toastPosition});
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
        to={{
            pathname:"/login",
            state:{from:location}
        }}
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
    <a href="https://static.commande.schipper-horticulture.fr/Bon_de_commande.xlsx" class="item"  target="_blank" >Télécharger directement la liste des produits à renvoyer à schipper.horti@wanadoo.fr </a>

    </>
    )
    :
        (
        <>
            <Menu.Item
                as={Link}
                to="/favoris"
                name="favorites"
                active={activeItem === "favorites"}
                onClick={handleItemClick}
            >
                <Icon name="heart" />
                Mes favoris
            </Menu.Item>

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
                name="signout"
                onClick={() => {logoutHandler(); handleSidebarHide();}}
            >
    <Icon name="sign-out" />
        Se déconnecter
    </Menu.Item>
    <a href="https://static.commande.schipper-horticulture.fr/Bon_de_commande.xlsx" class="item"  target="_blank" >Télécharger directement la liste des produits à renvoyer à schipper.horti@wanadoo.fr </a>

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
