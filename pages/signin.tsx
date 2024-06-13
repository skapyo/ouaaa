import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { Avatar, Button, Grid, Link, Stack, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PasswordField from 'components/fields/PasswordField';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import { useRouter } from 'next/router';
import TextInputField from 'components/fields/TextInputField';

const SIGNIN = gql`
  mutation login($email: String!, $password: String!, $persistentConnection: Boolean!) {
    login(email: $email, password: $password, persistentConnection: $persistentConnection) {
      id
      surname
      lastname
      email
      role
      isEmailValidated
    }
  }
`;

type SigninFields = {
  email: string;
  password: string;
};

const SignIn = () => {
  const user = useSessionState();
  const sessionDispatch = useSessionDispatch();
  const router = useRouter();
  const { from } = router.query;

  const form = useForm<SigninFields>({
    mode: 'onTouched',
  });

  const handleClickSignup = useCallback(() => {
    router.push('/signup')
  }, [router]);

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const [signin, { data, error }] = useMutation(SIGNIN);
  useGraphQLErrorDisplay(error);

  useEffect(() => {
    if (data?.login?.id && data?.login?.isEmailValidated) {
      sessionDispatch({
        type: 'login',
        payload: data.login,
      });
      router.push('/');
    }
  }, [data, sessionDispatch]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const onSubmit = useCallback(({ email, password }: SigninFields) => {
    signin({
      variables: {
        email,
        password,
        persistentConnection: false,
      },
    }).catch((err) => {});
  }, []);

  return (
    <AppLayout>
      <Grid container justifyContent="center">
        <Grid item xs={10} md={3} marginTop={6} marginBottom={6}>
          <Stack direction="column" spacing={1} alignItems="center" marginBottom={3}>
            <Avatar sx={{ backgroundColor: 'secondary.main' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
          </Stack>
          <FormProvider {...form}>
            <Stack
              direction="column"
              spacing={3}
              alignItems="center"
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {from === 'forgotPassword' && (
                <Typography>
                  Votre mot de passe a été modifié avec succès, vous pouvez à nouveau vous connecter
                </Typography>
              )}
              {from === 'accountValidation' && (
                <Typography>
                  Votre mot de passe a été configuré avec succès, vous pouvez désormais vous connecter
                </Typography>
              )}
              <TextInputField
                name="email"
                label="Adresse email"
                type="email"
                autoComplete="current-email"
                autoFocus
                rules={{
                  required: 'Email requis',
                }}
              />

              <PasswordField
                name="password"
                label="Mot de passe"
                autoComplete="current-password"
                rules={{
                  required: 'Mot de passe requis',
                }}
              />

              <Button type="submit" variant="contained">
                Se connecter
              </Button>


              <Button type="submit" variant="contained"  color="secondary" onClick={handleClickSignup} >
                  Créer un compte
              </Button>

              <Link href="/forgotPassword">Mot de passe oublié ?</Link>
            </Stack>
          </FormProvider>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default withApollo()(SignIn);
