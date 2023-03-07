import React from 'react';
import NavBar from 'containers/layouts/NavBar';
import Footer from 'containers/layouts/Footer';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ReactGA from 'react-ga';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const AppLayout = React.forwardRef(({ children, hideFooter }, ref) => {
  /* if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
    const trackingId = 'UA-179407370-1'; // Replace with your Google Analytics tracking ID
    ReactGA.initialize(trackingId);
    ReactGA.pageview(window.location.pathname + window.location.search);
  } */
  const styles = useStyles();

  return (
    <Box className={styles.root} ref={ref}>
      <NavBar />
      {children}
      {!hideFooter && (
        <Footer />
      )}
    </Box>
  );
});

export default AppLayout;
