import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import UserForm, { UserFields } from 'containers/forms/UserForm';
import AccountPageLayout from 'containers/layouts/accountPage/AccountPageLayout';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const UPDATE_ACCOUNT = gql`
  mutation updateAccount($surname: String!, $lastname: String!, $email: String!) {
    updateAccount(surname: $surname, lastname: $lastname, email: $email) {
      id
      surname
      lastname
      email
      role
      isEmailValidated
    }
  }
`;

const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount
  }
`;

const AccountPage = () => {
  const user = useSessionState();
  const sessionDispatch = useSessionDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [updateAccount, { data: updateData, error: updateError }] = useMutation(UPDATE_ACCOUNT);
  const [deleteAccount, { data: deleteData, error: deleteError }] = useMutation(DELETE_ACCOUNT);

  useGraphQLErrorDisplay(updateError);
  useGraphQLErrorDisplay(deleteError);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (updateData && updateData.updateAccount) {
      sessionDispatch({
        type: 'login',
        payload: updateData.updateAccount,
      });
      enqueueSnackbar('Modifications effectuées.', {
        preventDuplicate: true,
      });
    }
  }, [updateData]);

  useEffect(() => {
    if (deleteData && deleteData.deleteAccount) {
      router.push('/');
    }
  }, [deleteData]);

  const onSubmit: SubmitHandler<UserFields> = useCallback(async ({ surname, lastname, email }) => {
    updateAccount({
      variables: {
        surname,
        lastname,
        email,
      },
    });
  }, []);

  const onDelete = useCallback(() => {
    deleteAccount();
  }, []);

  if (!user) return null;

  return (
    <AccountPageLayout>
      <Grid container spacing={2}>
        <Grid item lg={7}>
          <Typography color="secondary" variant="h6" mb={3}>
            Mes informations personnelles
          </Typography>

          <UserForm
            submitLabel="Sauvegarder les modifications"
            onSubmit={onSubmit}
            defaultValues={{
              surname: user?.surname,
              lastname: user?.lastname,
              email: user?.email,
              type: 'user',
              stages: [],
            }}
            additionalButton={
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                sx={{ margin: 'auto' }}
                onClick={(e) => {
                  setDeleteModalOpen(true);
                  e.preventDefault();
                }}
              >
                Supprimer mon compte
              </Button>
            }
          />
        </Grid>
      </Grid>

      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Êtes-vous sûr(e) de vouloir supprimer votre compte ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Une fois supprimé, ce compte sera définitivement supprimé. Il ne pourra plus être utilisé pour se connecter
            sur le site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="primary" variant="contained">
            Annuler
          </Button>
          <Button onClick={() => onDelete()} variant="outlined" color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </AccountPageLayout>
  );
};

export default withApollo()(AccountPage);
