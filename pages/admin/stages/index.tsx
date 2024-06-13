import React, { useCallback, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Button, IconButton, Link, Stack, Typography } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import { useSessionState } from 'context/session/session';
import { AddCircleOutline } from '@mui/icons-material';
import StageDeletionModal from 'components/modals/StageDeletionModal';

const GET_STAGES = gql`
  query stages($canAdmin: Boolean) {
    stages(canAdmin: $canAdmin) {
      id
      name
      startedAt
      endedAt
      events {
        id
        category
      }
    }
  }
`;

const DELETE_STAGE = gql`
  mutation deleteStage($stageId: Int!, $deleteEvent: Boolean) {
    deleteStage(stageId: $stageId, deleteEvent: $deleteEvent)
  }
`;

const StagesAdminPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();

  const { data, error: getError, refetch } = useQuery(GET_STAGES, { variables: { canAdmin: true } });
  const [deleteStage, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_STAGE);

  const [deletionPendingStageId, setDeletionPendingStageId] = useState<null | string>(null);

  useGraphQLErrorDisplay(getError);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteStage) {
      refetch();
      enqueueSnackbar('Etape supprimée.', {
        preventDuplicate: true,
      });
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'étape a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleDeletion = useCallback(() => {
    if (deletionPendingStageId) {
      deleteStage({
        variables: {
          stageId: parseInt(deletionPendingStageId, 10),
          deleteEvent: true,
        },
      });
      setDeletionPendingStageId(null);
    }
  }, [deletionPendingStageId]);

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 10));
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const rows = data?.stages || [];

  const columns: GridColDef<typeof rows[number]>[] = [
    {
      field: 'name',
      headerName: 'Nom',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => <Link href={`/etape/${params.value}`}>{params.value}</Link>,
    },
    {
      field: 'startedAt',
      headerName: 'Date de début',
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: 'endedAt',
      headerName: 'Date de fin',
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: 'velorution',
      headerName: 'Vélorution ?',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => params.row.events.some(e => e.category === 'velorution') ? 'oui' : 'non'
    },
    {
      field: 'village',
      headerName: 'Village des alternatives ?',
      minWidth: 180,
      flex: 1,
      renderCell: (params) => params.row.events.some(e => e.category === 'village') ? 'oui' : 'non'
    },
    {
      field: 'formationANV',
      headerName: 'Formation ANV ?',
      minWidth: 180,
      flex: 1,
      renderCell: (params) => params.row.events.some(e => e.category === 'dcnv') ? 'oui' : 'non'
    },
    {
      field: 'addEvent',
      headerName: 'Ajouter une activité',
      type: 'actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" component={Link} href={`/admin/events/add?stageId=${params.row.id}`}>
            <AddCircleOutline />
          </IconButton>
        </>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" component={Link} href={`/admin/stages/${params.row.id}`}>
            <Edit />
          </IconButton>
          {user?.role === 'admin' && (
            <IconButton aria-label="delete" onClick={() => setDeletionPendingStageId(params.row.id)}>
              <Delete />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <AdminPageLayout authorizedRoles={['user', 'admin']}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: { xs: 3, md: 1 } }}
      >
        <Typography color="secondary" variant="h2">
          Liste des étapes dont vous êtes référent·e
        </Typography>

        {user?.role === 'admin' && (
          <Button component={Link} href="/admin/stages/add" variant="contained" size="small">
            Ajouter une nouvelle étape
          </Button>
        )}
      </Stack>

      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
        disableColumnSelector
        rows={rows}
        initialState={{
          sorting: {
            sortModel: [{ field: 'startedAt', sort: 'asc' }],
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

      <StageDeletionModal
        open={deletionPendingStageId !== null}
        onClose={() => setDeletionPendingStageId(null)}
        onSubmit={() => handleDeletion()}
      />
    </AdminPageLayout>
  );
};

export default withApollo()(StagesAdminPage);
