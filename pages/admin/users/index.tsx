import React, { useCallback, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';

import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';

const GET_USERS = gql`
  query users {
    users {
      id
      surname
      lastname
      email
      role
      isEmailValidated
      stages {
        id
        name
      }
    }
  }
`;

const RESEND_EMAIL = gql`
  mutation sendValidationEmail($userId: ID!) {
    sendValidationEmail(userId: $userId)
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(userId: $userId)
  }
`;

const UsersAdminPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, error: getError, refetch } = useQuery(GET_USERS);
  const [resendEmail, { loading: resendEmailLoading, data: resendEmailData }] = useMutation(RESEND_EMAIL);
  const [deleteUser, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_USER);

  const [deletionPendingUserId, setDeletionPendingUserId] = useState<null | string>(null);

  useGraphQLErrorDisplay(getError);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteUser) {
      refetch();
      enqueueSnackbar('Utilisateur·ice supprimé.', {
        preventDuplicate: true,
      });
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'utilisateur·ice a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  useEffect(() => {
    if (!resendEmailLoading && resendEmailData?.sendValidationEmail) {
      enqueueSnackbar('Email de validation envoyé.', {
        preventDuplicate: true,
      });
    }
  }, [resendEmailData, resendEmailLoading]);

  const handleDeletion = useCallback(() => {
    if (deletionPendingUserId) {
      deleteUser({
        variables: {
          userId: parseInt(deletionPendingUserId, 10),
        },
      });
      setDeletionPendingUserId(null);
    }
  }, [deletionPendingUserId]);

  const handleResendEmail = useCallback((userId: string) => {
    resendEmail({
      variables: {
        userId: parseInt(userId, 10),
      },
    });
  }, []);

  const rows =
    data?.users.map((user) => ({
      id: user.id,
      name: `${user.surname} ${user.lastname}`,
      email: user.email,
      stages: user.role === 'admin' ? 'admin' : user.stages,
      validated: user.isEmailValidated,
    })) || [];

  const columns: GridColDef<typeof rows[number]>[] = [
    {
      field: 'name',
      headerName: 'Nom',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'stages',
      headerName: 'Etapes',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <>
          {params.value === 'admin' ? (
            <strong>Admin</strong>
          ) : (
            <Stack direction="row" spacing={1}>
              {params.value.map((stage) => (
                <Chip key={stage.id} label={stage.name} />
              ))}
            </Stack>
          )}
        </>
      ),
    },
    {
      field: 'validated',
      headerName: 'Compte validé',
      type: 'boolean',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <>
          {params.value ? 'oui' : 'non'}
          {!params.value && (
            <Button variant="text" size="small" onClick={() => handleResendEmail(params.row.id)}>
              (Renvoyer l'email)
            </Button>
          )}
        </>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" component={Link} href={`/admin/users/${params.row.id}`}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => setDeletionPendingUserId(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <AdminPageLayout authorizedRoles={['admin']}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{mb: { xs: 3, md: 1 }}}>
        <Typography color="secondary" variant="h2">
          Liste des utilisateur·ices
        </Typography>

        <Button component={Link} href="/admin/users/add" variant="contained" size="small">
          Ajouter un nouvel utilisateur·ice
        </Button>
      </Stack>

      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
        rows={rows}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
      />

      <Dialog
        open={deletionPendingUserId !== null}
        onClose={() => setDeletionPendingUserId(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Êtes-vous sûr(e) de vouloir supprimer cet utilisateur·ice ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Une fois supprimé, ce compte sera définitivement supprimé. Il ne pourra plus être utilisé pour se connecter
            sur le site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletionPendingUserId(null)} color="primary" variant="contained">
            Annuler
          </Button>
          <Button onClick={() => handleDeletion()} variant="outlined" color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </AdminPageLayout>
  );
};

export default withApollo()(UsersAdminPage);
