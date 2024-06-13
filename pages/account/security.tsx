import AccountPageLayout from 'containers/layouts/accountPage/AccountPageLayout';
import { Grid, Typography } from '@mui/material';
import UserPasswordForm, { UserPasswordFields } from 'containers/forms/UserPasswordForm';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import { useSnackbar } from 'notistack';
import { withApollo } from 'hoc/withApollo';
import { useSessionState } from 'context/session/session';
import { useRouter } from 'next/router';

const UPDATE_ACCOUNT_PASSWORD = gql`
  mutation updateAccountPassword($password: String!) {
    updateAccountPassword(password: $password)
  }
`;

const SecurityPage = () => {
  const user = useSessionState();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [updatePassword, { data, error }] = useMutation(UPDATE_ACCOUNT_PASSWORD);
  useGraphQLErrorDisplay(error);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (data && data.updateAccountPassword) {
      enqueueSnackbar('Mot de passe modifié avec succès.', {
        preventDuplicate: true,
      });
    }
  }, [data]);

  const onSubmit: SubmitHandler<UserPasswordFields> = useCallback(({ password }) => {
    updatePassword({
      variables: {
        password,
      },
    });
  }, []);

  if (!user) return null;

  return (
    <AccountPageLayout>
      <Grid container spacing={2}>
        <Grid item lg={7}>
          <Typography color="secondary" variant="h6" mb={3}>
            Modifier mon mot de passe
          </Typography>
          <UserPasswordForm submitLabel="Changer le mot de passe" onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </AccountPageLayout>
  );
};

export default withApollo()(SecurityPage);
