import AppLayout from 'containers/layouts/AppLayout';
import AppContainer from 'containers/layouts/AppContainer';
import {
  Grid,
  Box,
  Typography,
  Fab,
  Hidden,
  SwipeableDrawer,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AccountLeftMenu from 'containers/menus/AccountLeftMenu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  title: {
    fontWeight: '700',
  },
  fab: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: '1400',
  },
  drawer: {
    '& .MuiDrawer-paperAnchorBottom': {
      height: '100%',
    },
  },
}));

const AccountPageLayout = ({ children }) => {
  const styles = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const openDrawerHander = useCallback(() => {
    setOpenDrawer(true);
  }, [setOpenDrawer]);

  const closeDrawerHander = useCallback(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);

  return (
    <AppLayout>
      <AppContainer maxWidth="lg">
        <Typography variant="h4" className={styles.title} color="primary">
          Mon compte
        </Typography>
        <Box className={styles.gridContainer}>
          <Grid container spacing={10}>
            <Hidden smDown>
              <Grid item lg={3}>
                <AccountLeftMenu />
              </Grid>
            </Hidden>
            <Grid item lg={9}>
              {children}
            </Grid>
          </Grid>
        </Box>
        <Hidden smUp>
          {!openDrawer && (
            <Fab className={styles.fab} size="large" onClick={openDrawerHander}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <ExpandLessIcon />
                <ExpandMoreIcon />
              </Grid>
              {/* <Box><ExpandLessIcon  /></Box>
                        <Box><ExpandMoreIcon  /></Box> */}
            </Fab>
          )}
          {openDrawer && (
            <Fab
              className={styles.fab}
              size="large"
              onClick={closeDrawerHander}
            >
              <CloseIcon />
            </Fab>
          )}
          <SwipeableDrawer
            open={openDrawer}
            anchor="bottom"
            className={styles.drawer}
            transitionDuration={0}
            onClose={closeDrawerHander}
            onOpen={openDrawerHander}
          >
            <Box m={2}>
              <Typography variant="h6">Mon compte :</Typography>
            </Box>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <AccountLeftMenu />
            </Grid>
          </SwipeableDrawer>
        </Hidden>
      </AppContainer>
    </AppLayout>
  );
};

export default AccountPageLayout;
