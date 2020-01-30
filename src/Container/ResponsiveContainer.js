import React from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

import useTraceUpdate from "./../Hooks/useTraceUpdate";

const ResponsiveContainer = React.memo(({ children }) => {
  useTraceUpdate(children);
  console.log(children[0].props);
  return (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
  );
});
ResponsiveContainer.whyDidYouRender = true;
export default ResponsiveContainer;
