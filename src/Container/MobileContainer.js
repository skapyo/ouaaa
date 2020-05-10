import React, { Component } from "react";
import { Responsive, Segment, Container, Sidebar } from "semantic-ui-react";
import { getWidth } from "./../Utils/utils";

import MobileSidebar from "../Components/Navigation/MobileSidebar";
import MobileNavbar from "../Components/Navigation/MobileNavbar";

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive

        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <MobileSidebar
          onHide={this.handleSidebarHide}
          visible={sidebarOpened}
          handleSidebarHide={this.handleSidebarHide}
        />

        <Sidebar.Pusher dimmed={sidebarOpened}>
        {/* <Segment
            inverted
            textAlign="center"
            style={{ padding: "0em 0em" }}
            color="teal"
            vertical
          > */}
        <MobileNavbar   toggleHandler={this.handleToggle} />
    {/* </Segment> */}
    {children}
  </Sidebar.Pusher>
    </Responsive>
  );
  }
}

export default MobileContainer;
