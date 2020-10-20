/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AppContainer from 'containers/layouts/AppContainer';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import Link from 'components/Link';

const FallbackPageNotFound = (props: any) => (
  <AppContainer>
    <Grid container justify="center">
      <Typography variant="h6">
        La page demandée est inconnue.
      </Typography>
    </Grid>
  </AppContainer>
);

export default FallbackPageNotFound;
