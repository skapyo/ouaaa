import React from "react";
import { Segment } from "semantic-ui-react";
import ResponsiveContainer from "./Container/ResponsiveContainer";
import { BrowserRouter as Router } from "react-router-dom";

import DesktopBodyLayout from "./Container/BodyLayout/DesktopBodyLayout";
import MobileBodyLayout from "./Container/BodyLayout/MobileBodyLayout";
import Footer from "./Components/Footer/Footer";

const HomepageLayout = () => {
  return (
    <>
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
      />
      <Router>
        <ResponsiveContainer>
          <Segment style={{ padding: "5em 0em" }} vertical>
            <DesktopBodyLayout />
            <MobileBodyLayout />
          </Segment>
          <Footer />
        </ResponsiveContainer>
      </Router>
    </>
  );
};
export default HomepageLayout;
