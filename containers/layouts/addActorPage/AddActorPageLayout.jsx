import AppLayout from 'containers/layouts/AppLayout';
import AppContainer from 'containers/layouts/AppContainer';
import { Grid, Box, Typography, Fab, Hidden, SwipeableDrawer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AccountLeftMenu from 'containers/menus/AccountLeftMenu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
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

const AddActorPageLayout = ({ children }) => {
  const styles = useStyles();

  return (
    <AppLayout>
      <AppContainer maxWidth="lg">
        <Box className={styles.gridContainer}>
          <Grid container spacing={10}>
            <Grid item lg={12}>
              {children}
            </Grid>
          </Grid>
        </Box>
      </AppContainer>
    </AppLayout>
  );
};

export default AddActorPageLayout;
