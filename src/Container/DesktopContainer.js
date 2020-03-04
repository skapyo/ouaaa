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
      {/* <Sidebar.Pushable style={{ transform: "none" }}>
        <CartComponent cartVisible={cartVisible} />

        <Sidebar.Pusher
          dimmed={cartVisible ? true : false}
          onClick={dimmedClickHandler}
        >
          <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}
          > */}
            <Segment
              inverted
              textAlign="center"
              // style={{ minHeight: 700, padding: "1em 0em" }}
              style={{ padding: "0em 0em" }}
              vertical
              color="teal"
            >
              <DesktopNavbar
                fixed={fixed}
                cartIconClickHandler={cartIconClickHandler}
              />
            </Segment>
          {/* </Visibility> */}

          {children}
        {/* </Sidebar.Pusher>
      </Sidebar.Pushable> */}
    </Responsive>
  );
};

export default DesktopContainer;
