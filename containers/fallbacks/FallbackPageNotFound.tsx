/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AppContainer from 'containers/layouts/AppContainer';
import { Grid, Typography } from '@material-ui/core';

const FallbackPageNotFound = (props: any) => (
  <AppContainer>
    <Grid container justify="center">
      <Typography variant="h6">La page demandée est inconnue.</Typography>
    </Grid>
  </AppContainer>
);

export default FallbackPageNotFound;
