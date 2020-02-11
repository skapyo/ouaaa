import React, { useState } from "react";
import { Menu,Header } from "semantic-ui-react";
import {useQuery} from '@apollo/react-hooks';
import {GET_PAGES_LIST} from './../../../Queries/contentQueries';
import { Link } from "react-router-dom";

const DesktopContentMenu = () => {
  const [activeItem, setActiveitem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveitem(name);

  const {data, loading, error} = useQuery(GET_PAGES_LIST);

  if (loading)
    return 'loading';

  if (error) 
    return 'error';

  return (
    <Menu fluid vertical>
        <Menu.Item>
          <Menu.Header>Les articles</Menu.Header>
          <Menu.Menu>
            {data.pages.filter(page => page.activated == true).map((page) => (
              <Menu.Item
              as={Link} 
              to={`/categorie/${page.id}`}
              name={page.label}
              active={activeItem === page.label}
              onClick={handleItemClick}
              />
            ))}
          </Menu.Menu>
        </Menu.Item>
        {/* <Menu.Item>
        <Menu.Header>Autres articles</Menu.Header>
        </Menu.Item> */}

    </Menu>
  );
};

export default DesktopContentMenu;
