/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import AppContainer from 'containers/layouts/AppContainer';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClassicButton from 'components/buttons/ClassicButton';
import Link from 'components/Link';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FallbackEmailValidated = (props: any) => {
  const { email } = props;
  const styles = useStyles();

  return (
    <AppLayout>
      <AppContainer>
        <Grid container justifyContent="center">
          <Typography variant="h6">
            Votre email {email} a bien été validé.
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              {/* @ts-ignore */}
              <Link href="/signin">
                <ClassicButton
                  fullWidth
                  variant="contained"
                  className={styles.submit}
                >
                  Me connecter
                </ClassicButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </AppContainer>
    </AppLayout>
  );
};

export default FallbackEmailValidated;
