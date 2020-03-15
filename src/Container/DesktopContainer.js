import React, { useState,useCallback } from "react";
import { Sidebar, Responsive, Visibility, Segment } from "semantic-ui-react";
import { getWidth } from "./../Utils/utils";
// import CartComponent from "./../Components/Cart/CartComponent";

import DesktopNavbar from "../Components/Navigation/DesktopNavbar";

const DesktopContainer = ({ children }) => {
  /* navbar state */

  const [fixed, setFixed] = useState(false);
  const hideFixedMenu = () => setFixed(false);
  const showFixedMenu = () => setFixed(true);

  /*shop cart state*/
  const [cartVisible, setCartVisible] = useState(false);

  const cartIconClickHandler = useCallback(() => {
    setCartVisible(!cartVisible);
  },[cartVisible]);

  const dimmedClickHandler = () => {
    if (cartVisible) setCartVisible(!cartVisible);
  };

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
            <Segment
              inverted
              textAlign="center"
              style={{ padding: "0em 0em" }}
              vertical
              color="teal"
            >
              <DesktopNavbar
                fixed={fixed}
                cartIconClickHandler={cartIconClickHandler}
              />
            </Segment>
          {children}
    </Responsive>
  );
};

export default DesktopContainer;
