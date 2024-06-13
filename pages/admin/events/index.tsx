import React, { useCallback, useEffect, useState, useRef } from 'react';
import gql from 'graphql-tag';
import {
  Button,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';
import makeStyles from '@mui/styles/makeStyles';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import EventDeletionModal from 'components/modals/EventDeletionModal';
import useExcelExport from 'hooks/useExcelExport';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import Moment from 'react-moment';
import eventCategories from 'src/eventCategories';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const GET_EVENTS = gql`
  query events($canAdmin: Boolean) {
    events(canAdmin: $canAdmin) {
      id
      label
      category
      startedAt
      endedAt
      createdAt
      updatedAt
      nbParticipants
      stages {
        id
        name
      }
    }
  }
`;

  // Define the experience labels
  const experienceLabels = [
    { value: 'none', label: "Non, je n'ai encore jamais participé à des actions non-violentes !" },
    { value: 'small', label: "Oui, j'ai déjà participé à des petites actions, sans risques physiques ou juridiques" },
    { value: 'risk', label: "Oui, j'ai déjà participé à des actions non-violentes avec risques physiques et/ou juridiques" },
    { value: 'coordination', label: "Oui, j'ai déjà coordonné des actions non-violentes" }
  ];
  // Convert the array to a dictionary for quick lookup
  const experienceDict = experienceLabels.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(eventId: $eventId)
  }
`;

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  nbParticipantsItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

const GET_PARTICIPANTS_BY_EVENT = gql`
  query eventParticipants($eventId: String!) {
    eventParticipants(eventId: $eventId) {
      id
      firstname
      lastname
      createdAt
      email
      phone
      territory
      association
      associationName
      experience
      token
    }
  }
`;

const ParticipantList = (props: any) => {
  const { event, participantsToExport, refetchEvent } = props;
  const [participants, setParticipants] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { refetch, loading, error } = useQuery(GET_PARTICIPANTS_BY_EVENT, {
    variables: {
      eventId: event?.id,
    },
    onCompleted: (data: any) => {
      setParticipants(data.eventParticipants);
      participantsToExport.current = data.eventParticipants;
      participantsToExport.current.event=event;
      console.log('er' + data.eventParticipants);
    },
    fetchPolicy: 'network-only',
  });
  const REMOVE_PARTICIPANT_EVENT = gql`
    mutation removeParticipateEvent($token: String!, $eventId: Int!) {
      removeParticipateEvent(token: $token, eventId: $eventId)
    }
  `;
  const [
    removeParticipateEvent,
    { data: removeParticipateEventData, loading: removeParticipateEventLoading, error: removeParticipateEventError },
  ] = useMutation(REMOVE_PARTICIPANT_EVENT);

  useEffect(() => {
    if (!removeParticipateEventLoading && removeParticipateEventData) {
      enqueueSnackbar('Participant·e désinscrit·e, un email lui a été envoyé', {
        preventDuplicate: true,
      });
      refetch();
      refetchEvent();
    } else if (removeParticipateEventError) {
      enqueueSnackbar("Une erreur s'est produite, merci de bien vouloir réessayer.", {
        preventDuplicate: true,
      });
    }
  }, [removeParticipateEventLoading, removeParticipateEventError, removeParticipateEventData]);



  if (error) return null;

  if (loading) return <LinearProgress />;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Prénom</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Téléphone</TableCell>
         
          { event.category === 'dcnv' && (
            <>
            <TableCell>Territoire</TableCell>
            <TableCell>Impliqué dans des associations</TableCell>
            <TableCell>Liste des associations</TableCell>
            <TableCell>Expérience</TableCell>
            </>
          )
          
} 
        <TableCell align="right">Date d'inscription</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {participants.map((participant) => {
          const experiences = JSON.parse(participant.experience);
          return (
            <TableRow key={participant.id}>
              <TableCell component="th" scope="row">
                {participant.firstname}
              </TableCell>
              <TableCell>{participant.lastname}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.phone}</TableCell>
              {event.category === 'dcnv' && (
                <>
                  <TableCell>{participant.territory}</TableCell>
                  <TableCell>{participant.association ? "Oui" : "Non"}</TableCell>
                  <TableCell>{participant.associationName}</TableCell>
                  <TableCell>
                    {experiences?.map((exp) => (
                      <div key={exp}>
                        {experienceDict[exp]}
                      </div>
                    ))}
                  </TableCell>
                </>
              )}
              <TableCell align="right">
                <Moment format="DD/MM/YYYY HH:mm" unix>
                  {participant.createdAt / 1000}
                </Moment>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeParticipateEvent({
                      variables: {
                        token: participant.token,
                        eventId: parseInt(event?.id),
                      },
                    });
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const NbParticipantsItem = (props: any) => {
  const { event, className, onClick } = props;

  const handleClick = useCallback(() => {
    onClick(event);
  }, [onClick, event]);

  if (event.nbParticipants === 0) return <span>Aucun</span>;

  return (
    <div className={className} onClick={handleClick}>
      {event.nbParticipants}
      <ZoomInIcon />
    </div>
  );
};

const EventsAdminPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, error: getError, refetch } = useQuery(GET_EVENTS, { variables: { canAdmin: true } });
  const [deleteEvent, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_EVENT);
  const [openModal, setOpenModal] = useState(false);
  const [deletionPendingEventId, setDeletionPendingEventId] = useState<null | string>(null);
  const participantsToExport = useRef(null);
  const exportData = useExcelExport();
  const [participantsEvent, setParticipantsEvent] = useState(null);
  const styles = useStyles();
  const closeModal = useCallback(() => {
    setOpenModal(false);
    participantsToExport.current = null;
  }, []);

  const handleClickParticipantsEvent = useCallback((event) => {
    setParticipantsEvent(event);
    setOpenModal(true);
  }, []);

    // Define the experience labels
const experienceLabels = [
  { value: 'none', label: "Non, je n'ai encore jamais participé à des actions non-violentes !" },
  { value: 'small', label: "Oui, j'ai déjà participé à des petites actions, sans risques physiques ou juridiques" },
  { value: 'risk', label: "Oui, j'ai déjà participé à des actions non-violentes avec risques physiques et/ou juridiques" },
  { value: 'coordination', label: "Oui, j'ai déjà coordonné des actions non-violentes" }
];
// Convert the array to a dictionary for quick lookup
const experienceDict = experienceLabels.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

  useEffect(() => {
    if (!participantsEvent) {
      setTimeout(() => {
        setParticipantsEvent(null);
      }, 200);
    }
  }, [participantsEvent]);

  useGraphQLErrorDisplay(getError);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteEvent) {
      refetch();
      enqueueSnackbar('Activité supprimée.', {
        preventDuplicate: true,
      });
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'activité a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleClickExport = useCallback(() => {
    const dataToExport = (participantsToExport.current || []).map((participant: any) => ({
      ...participant,
      experience: JSON.parse(participant.experience)?.map((exp) => experienceDict[exp]).join(', '),
      createdAt: new Date(parseInt(participant.createdAt, 10)).toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' }),
    }));
   if ((participantsToExport.current || []).some((participant: any) => participant.association !== null)) {
       /*exportData({
        data: dataToExport,
        columns: ['id', 'firstname', 'lastname', 'email', 'phone', 'territory', 'association', 'associationName', 'experience', 'createdAt'],
        columnLabels: ['ID', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Territoire', 'Impliqué dans des associations', 'Liste des associations', 'Expérience', 'Date d inscription'],
        columnOptions: [{ wch: 4 }, { wch: 25 }, { wch: 25 }, { wch: 30 }, { wch: 30 },{ wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 80 },  { wch: 20 }],
        sheetName: 'participants',
        fileName: 'participants',
      });
    } else {
      exportData({
        data: dataToExport,
        columns: ['id', 'firstname', 'lastname', 'email', 'phone', 'createdAt'],
        columnLabels: ['ID', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Date'],
        columnOptions: [{ wch: 4 }, { wch: 25 }, { wch: 25 }, { wch: 30 }, { wch: 30 }, { wch: 20 }],
        sheetName: 'participants',
        fileName: 'participants',
      });*/
      
      if ((participantsToExport.current || []).some((participant: any) => participant.association !== null)) {
        const customizedDataToExport = dataToExport.map((participant) => ({
          firstname: participant.firstname, 
          lastname: participant.lastname, 
          email: participant.email, 
          phone: participant.phone,
          territory: participant.territory,
          association: participant.association,
          associationName: participant.associationName,
          experience: participant.experience,
          createdAt: participant.createdAt
        }));
  
        const customHeader = 'Prénom,Nom,Email,Téléphone,Territoire,Impliqué dans des associations,Liste des associations,Expérience,Date d inscription\n'; // Customize this header as needed
        
        const csvContent =Papa.unparse(customizedDataToExport);
        const csvContentWithoutHeader =  customHeader + csvContent.substring(csvContent.indexOf('\n') + 1);
        const blob = new Blob([csvContentWithoutHeader], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `Participants.csv`);
      
    }else{

      const customizedDataToExport = dataToExport.map((participant) => ({
        firstname: participant.firstname, 
        lastname: participant.lastname, 
        email: participant.email, 
        phone: participant.phone,
        createdAt: participant.createdAt,
      }));

      const customHeader = 'Prénom,Nom,Email,Téléphone,Date\n'; // Customize this header as needed
      
      const csvContent =Papa.unparse(customizedDataToExport);
      const csvContentWithoutHeader =  customHeader + csvContent.substring(csvContent.indexOf('\n') + 1);
      const blob = new Blob([csvContentWithoutHeader], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `Participants.csv`);
  
    }
  }

  
  }, [participantsToExport]);

  const handleMailto = useCallback(() => {
    const emailAddresses = (participantsToExport.current || []).map((participant: any) => participant.email).join(',');
    const eventLabel = participantsToExport.current?.event?.label || '';
    window.location.href = `mailto:?cc=${emailAddresses}&subject=Tour Alternatiba 2024 - ${eventLabel}`;
  }, [participantsToExport]);

  const handleDeletion = useCallback(() => {
    if (deletionPendingEventId) {
      deleteEvent({
        variables: {
          eventId: parseInt(deletionPendingEventId, 10),
        },
      });
      setDeletionPendingEventId(null);
    }
  }, [deletionPendingEventId]);

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

  const rows = data?.events || [];

  const columns: GridColDef<typeof rows[number]>[] = [
    {
      field: 'label',
      headerName: 'Nom',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <Link href={`/etape/${params?.row?.stages?.[0]?.name}/activite/${params.id}`} >{params.value}</Link>
      ),
    },
    {
      field: 'category',
      headerName: 'Catégorie',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => eventCategories[params.value],
    },
    {
      field: 'stages',
      headerName: 'Etape',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.value.map((stage) => (
            <Chip key={stage.id} label={stage.name} />
          ))}
        </Stack>
      ),
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
      field: 'createdAt',
      headerName: 'Date de création',
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: 'updatedAt',
      headerName: 'Date de modification',
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: 'volunteer',
      headerName: 'Participants',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <NbParticipantsItem
          event={params.row}
          className={styles.nbParticipantsItem}
          onClick={handleClickParticipantsEvent}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" component={Link} href={`/admin/events/${params.row.id}`}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => setDeletionPendingEventId(params.row.id)}>
            <Delete />
          </IconButton>
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
          Liste des activités
        </Typography>

        <Button component={Link} href="/admin/events/add" variant="contained" size="small">
          Ajouter une nouvelle activité
        </Button>
      </Stack>

      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
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

      <Dialog open={openModal} onBackdropClick={closeModal} maxWidth="lg">
        <DialogTitle classes={{ root: styles.dialogTitle }}>
          <Grid xs={10}>
            Participant·es de l'activité <i>{(participantsEvent as any)?.label}</i>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Exporter">
              <IconButton onClick={handleClickExport} size="large">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Contacter ">
              <IconButton onClick={handleMailto} size="large">
                <EmailIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogTitle>
        <DialogContent classes={{ root: styles.dialogContent }}>
          {participantsEvent && (
            <ParticipantList
              event={participantsEvent}
              participantsToExport={participantsToExport}
              refetchEvent={refetch}
            />
          )}
        </DialogContent>
      </Dialog>
      <EventDeletionModal
        open={deletionPendingEventId !== null}
        onClose={() => setDeletionPendingEventId(null)}
        onSubmit={() => handleDeletion()}
      />
    </AdminPageLayout>
  );
};

export default withApollo()(EventsAdminPage);
