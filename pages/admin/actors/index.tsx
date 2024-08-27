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
import ActorDeletionModal from 'components/modals/ActorDeletionModal';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

const GET_ACTORS = gql`
  query actors($canAdmin: Boolean) {
    actors(canAdmin: $canAdmin) {
      id
      name
      createdAt
      updatedAt
      dateValidation
      city
      lat
      lng
      referents {
        surname
        lastname
        email
        phone
      }
      isValidated
      dateValidation
      userValidated {
        surname
        lastname
        email
        phone
      }
      nbVolunteers
    }
  }
`;

const VALIDATE_ACTOR = gql`
  mutation validateActor($actorId: Int!, $userId: Int!) {
    validateActor(actorId: $actorId, userId: $userId) {
      name
    }
  }
`;
const DELETE_ACTOR = gql`
  mutation deleteActor($actorId: Int!, $deleteEvent: Boolean) {
    deleteActor(actorId: $actorId, deleteEvent: $deleteEvent)
  }
`;

const ActorsAdminPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();

  const { data, error: getError, refetch } = useQuery(GET_ACTORS, { variables: { canAdmin: true } });
  const [deleteActor, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_ACTOR);
  const [volunteersActor, setVolunteersActor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deletionPendingActorId, setDeletionPendingActorId] = useState<null | string>(null);

  useGraphQLErrorDisplay(getError);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteActor) {
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
    if (deletionPendingActorId) {
      deleteActor({
        variables: {
          actorId: parseInt(deletionPendingActorId, 10),
          deleteEvent: true,
        },
      });
      setDeletionPendingActorId(null);
    }
  }, [deletionPendingActorId]);

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

  const rows = data?.actors || [];

  const handleClickVolunteersActor = useCallback((event) => {
    setVolunteersActor(event);
    setOpenModal(true);
  }, []);

  const [validateActor, { data: dataValidateActor, loading: loadingValidateActor }] = useMutation(
    VALIDATE_ACTOR,
  );
  const validate = useCallback(
    (actor) => {
      if (!actor.isValidated) {
        validateActor({
          variables: {
            actorId: parseInt(actor.id, 10),
            userId: parseInt(user && user.id, 10),
          },
        });
      }
    }
  );
const NbVolunteersItem = (props: any) => {
  const { actor, className, onClick } = props;

  const handleClick = useCallback(() => {
    onClick(actor);
  }, [onClick, actor]);

  if (actor.nbVolunteers === 0) return <span>Aucun</span>;

  return (
    <div className={className} onClick={handleClick}>
      {actor.nbVolunteers}
      <ZoomInIcon />
    </div>
  );
};

  const columns: GridColDef<typeof rows[number]>[] = [
    {
      field: 'name',
      headerName: 'Nom',
      width: 150,
      editable: false,
      renderCell: (params) =>
      <Link href={`/actor/${params.row.id}`}>
                        {params.row.name}
                      </Link>,
    },
    {
      field: 'createdAt',
      headerName: 'Date de création',
      type: 'dateTime',
      width: 170,
      editable: false,
      valueGetter: (value ) => {
        return new Date(parseInt(value.value))
      },

    },
    {
      field: 'updatedAt',
      headerName: 'Date de dernière modification',
      type: 'dateTime',
      width: 200,
      editable: false,
      valueGetter: (value) => value && new Date(parseInt(value.value)),
    },
    {
      field: 'city',
      headerName: 'Ville',
      width: 160,
    },
    {
      field: 'link',
      headerName: 'Lien Page acteur',
      width: 150,
      editable: false,
      renderCell: (params) =>
      <Link href={`/actor/${params.row.id}`}>
                        {params.row.name}
                      </Link>,
    },
    {
      field: 'edit',
      headerName: 'Editer la page',
      width: 150,
      editable: false,
      renderCell: (params) =>
      <Link href={`/admin/actors/${params.row.id}`}>
                        <Edit />
                      </Link>,
    },
   
    {
      field: 'volunteer',
      headerName: 'Volontaires',
      width: 150,
      editable: false,
      renderCell: (params) =>
      <NbVolunteersItem
                        actor={params.row}
                        onClick={handleClickVolunteersActor}
                      />,
    }, 
    ...(user && user.role === 'admin'
    ? [
      {
        field: 'validate',
        headerName: 'Validation',
        width: 150,
        editable: false,
        renderCell: (params) =>{
        return <>{!loadingValidateActor
          && (
            <CheckCircleIcon
              style={{
                color: params.row.isValidated ? 'green' : 'orange',
              }}
              onClick={() => validate(params.row)}
            />
          )}
        {loadingValidateActor && (
          <CircularProgress />
        )}</>},
      },
      {
        field: 'dateValidation',
        headerName: 'Date de validation',
        type: 'dateTime',
        width: 200,
        editable: false,
        valueGetter: (value) =>  value.value && new Date(parseInt(value.value)),
      },
      
      {
        field: 'userValidated',
        headerName: 'Personne ayant validé',
        width: 170,
        editable: false,
        valueGetter: (value) => {
          if (value.row.userValidated && value.row.userValidated.surname && value.row.userValidated.lastname) {
            return value.row.userValidated.surname + ' ' + value.row.userValidated.lastname;
          } else {
            return ''; 
          }
        },
      }]: []),
      {
        field: 'addAction',
        headerName: 'Ajouter une nouvelle action',
        width: 170,
        editable: false,
        renderCell: (params) =>
        <Link href={`/addevent/${params.row.id}`}>
        <AddCircleOutline />
      </Link>,
      },
      {
        field: 'addArticle',
        headerName: 'Ajouter un nouvel article',
        width: 170,
        editable: false,
        renderCell: (params) =>
        <Link href={`/addarticle/${params.row.id}`}>
        <AddCircleOutline />
      </Link>,
      },
      {
        field: 'addRecipe',
        headerName: 'Ajouter une nouvelle recette',
        width: 170,
        editable: false,
        renderCell: (params) =>
        <Link href={`/recette/new?actor${params.row.id}`}>
        <AddCircleOutline />
      </Link>,
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
          Liste des acteurs dont vous êtes administrateur
        </Typography>

        {user?.role === 'admin' && (
          <Button component={Link} href="/admin/actors/add" variant="contained" size="small">
            Ajouter un nouvel acteur
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

      <ActorDeletionModal
        open={deletionPendingActorId !== null}
        onClose={() => setDeletionPendingActorId(null)}
        onSubmit={() => handleDeletion()}
      />
    </AdminPageLayout>
  );
};

export default withApollo()(ActorsAdminPage);
