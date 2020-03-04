import React from "react";
import { Responsive, Container } from "semantic-ui-react";
import { getWidth } from "./../../Utils/utils";
import ContentLayout from "./../../Components/Body/Content/ContentLayout";

const MobileBodyLayout = () => {
  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Container>
        <ContentLayout itemsPerRow={1} />
      </Container>
    </Responsive>
  );
};

export default MobileBodyLayout;
