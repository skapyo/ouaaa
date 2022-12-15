/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AppContainer from 'containers/layouts/AppContainer';
import { Grid, Typography } from '@mui/material';

const FallbackPageNotFound = (props: any) => (
  <AppContainer>
    <Grid container justifyContent="center">
      <Typography variant="h6">La page demandée est inconnue.</Typography>
    </Grid>
  </AppContainer>
);

export default FallbackPageNotFound;
