import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DesktopAdminContentMenu = () => {
  const [activeItem, setActiveitem] = useState("Catégories");
  const handleItemClick = (e, { name }) => setActiveitem(name);

  return (
    <Menu fluid vertical>
      <Menu.Item
        as={Link}
        to="/admin/categories"
        name="Catégories"
        active={activeItem === "Catégories"}
        onClick={handleItemClick}
      />
      {/* <Menu.Item
        as={Link}
        to="/admin/articles/add"
        name="Articles"
        active={activeItem === "Articles"}
        onClick={handleItemClick}
      /> */}
      <Dropdown item text="Articles">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/admin/articles/add">
            Ajouter un article
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin/articles/select">
            Modifier un article
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin/articles/pictures">
            Gérer les photos
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin/articles/display">
            Gérer l'affichage des articles
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        as={Link}
        to="/admin/commandes"
        name="Commandes"
        active={activeItem === "Commandes"}
        onClick={handleItemClick}
        disabled
      />
      <Menu.Item
        as={Link}
        to="/admin/utilisateurs"
        name="Utilisateurs"
        active={activeItem === "Utilisateurs"}
        onClick={handleItemClick}
        disabled
      />
    </Menu>
  );
};

export default DesktopAdminContentMenu;
