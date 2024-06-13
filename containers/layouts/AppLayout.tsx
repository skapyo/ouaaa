import React from 'react';
import NavBar from 'containers/layouts/NavBar';
import Footer from 'containers/layouts/Footer';
import { Box } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[];
  hideFooter?: boolean;
};

const AppLayout = React.forwardRef<{}, Props>(({ children, hideFooter = false }, ref) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" ref={ref}>
      <NavBar />
      {children}
      {!hideFooter && <Footer />}
    </Box>
  );
});

export default AppLayout;
