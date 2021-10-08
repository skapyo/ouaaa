import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import AppContainer from 'containers/layouts/AppContainer';
import { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SEND_VALIDATION_EMAIL = gql`
  mutation sendValidationEmail($email: String!) {
    sendValidationEmail(email: $email)
  }
`;

const FallbackEmailNotValidated = (props: any) => {
  const { email } = props;
  const styles = useStyles();
  const [clicked, setClicked] = useState(false);
  const [fail, setFail] = useState(false);
  const [sendValidationEmail, { data, loading, error }] = useMutation(
    SEND_VALIDATION_EMAIL,
  );

  const sendNewEmail = () => {
    sendValidationEmail({ variables: { email: props.email } });
  };

  useEffect(() => {
    if (data) {
      setClicked(true);
      setFail(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setFail(true);
      setClicked(false);
    }
  }, [error]);

  return (
    <AppContainer>
      {clicked && (
        <p style={{ textAlign: 'center' }}>
          Un email de validation a été envoyé à : {/* @ts-ignore */}
          <b>{email}</b>
        </p>
      )}
      {fail && (
        <p style={{ textAlign: 'center' }}>
          Une erreur s&apos;est produite, merci de réessayer.
        </p>
      )}
      <Grid container justify="center">
        <Typography variant="h6">
          Votre email {email} n&apos;est pas validé.
        </Typography>
        <Grid container justify="center">
          <Grid item>
            <ClassicButton
              fullWidth
              variant="contained"
              className={styles.submit}
              onClick={sendNewEmail}
            >
              Recevoir un nouvel email
            </ClassicButton>
          </Grid>
        </Grid>
      </Grid>
    </AppContainer>
  );
};

export default FallbackEmailNotValidated;
