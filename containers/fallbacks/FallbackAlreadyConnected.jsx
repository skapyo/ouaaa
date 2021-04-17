import AppLayout from 'containers/layouts/AppLayout';
import AppContainer from 'containers/layouts/AppContainer';
import { Grid, Typography } from '@material-ui/core';

const FallbackAlreadyConnected = () => {
  return (
    <AppLayout>
      <AppContainer>
        <Grid container justify="center">
          <Typography variant="h6">
            Vous ne pouvez pas accéder à cette page car vous êtes déja
            identifiés.
          </Typography>
        </Grid>
      </AppContainer>
    </AppLayout>
  );
};

export default FallbackAlreadyConnected;
