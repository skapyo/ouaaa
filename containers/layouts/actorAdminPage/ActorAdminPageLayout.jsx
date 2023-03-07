import React, { useCallback, useState } from 'react';
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
import ActorAdminLeftMenu from 'containers/menus/ActorAdminLeftMenu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

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

const ActorAdminPageLayout = ({ children }) => {
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
          Administration des pages acteurs et événements
        </Typography>
        <Box className={styles.gridContainer}>
          <Grid container>
            <Hidden smDown>
              <Grid item lg={2}>
                <ActorAdminLeftMenu />
              </Grid>
            </Hidden>
            <Grid item lg={10}>
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
              <ActorAdminLeftMenu />
            </Grid>
          </SwipeableDrawer>
        </Hidden>
      </AppContainer>
    </AppLayout>
  );
};

export default ActorAdminPageLayout;
