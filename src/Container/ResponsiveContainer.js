import React from 'react';
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

import useTraceUpdate from './../Hooks/useTraceUpdate';

const ResponsiveContainer = React.memo( ({ children }) => {
  useTraceUpdate(children);
  return (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
  );
});

export default ResponsiveContainer;