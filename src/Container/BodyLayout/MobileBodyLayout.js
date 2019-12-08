import React from "react";
import { Responsive, Container } from "semantic-ui-react";
import { getWidth } from "./../../Utils/utils";
import ShopCardGroup from "./../../Components/Body/ShopCards/ShopCardGroup";

const MobileBodyLayout = () => {
  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Container>
        <ShopCardGroup itemsPerRow={1} />
      </Container>
    </Responsive>
  );
};

export default MobileBodyLayout;
