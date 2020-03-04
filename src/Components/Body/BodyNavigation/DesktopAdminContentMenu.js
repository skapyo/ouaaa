import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DesktopAdminContentMenu = () => {
  const [activeItem, setActiveitem] = useState("Catégories");
  const handleItemClick = (e, { name }) => setActiveitem(name);

  return (
    <Menu fluid vertical>

      <Menu.Item>
          <Menu.Header>Catégories</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/admin/categories"
              content="Administration des catégories"
              name="category"
              active={activeItem === "category"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
        <Menu.Header>Articles</Menu.Header>
        <Menu.Menu>
          <Menu.Item
              as={Link}
              to="/admin/articles/add"
              content="Ajouter un article"
              name="addArticle"
              active={activeItem === "addArticle"}
              onClick={handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/admin/articles/select"
              content="Modifier un article"
              name="modArticle"
              active={activeItem === "modArticle"}
              onClick={handleItemClick}
            />
            <Menu.Item
              as={Link}
              // to="/admin/articles/select"
              content="Administration des articles"
              name="adminArticle"
              active={activeItem === "adminArticle"}
              onClick={handleItemClick}
            />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Gestion du stock</Menu.Header>
        <Menu.Menu>
          <Menu.Item
              as={Link}
              to="/admin/stock/select"
              content="Séléctionner un article"
              name="stock"
              active={activeItem === "stock"}
              onClick={handleItemClick}
            />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default DesktopAdminContentMenu;
