import React from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

const ResponsiveContainer = React.memo(({ children }) => {
  return (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
  );
});
ResponsiveContainer.whyDidYouRender = true;
export default ResponsiveContainer;
