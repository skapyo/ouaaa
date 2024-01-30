import React, { useCallback, useEffect, useState, useRef } from 'react';
import { withApollo } from 'hoc/withApollo';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import gql from 'graphql-tag';
import Moment from 'react-moment';

import { Theme, Typography, useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Grid,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import LastPageIcon from '@mui/material/SvgIcon';

import Edit from '@mui/icons-material/Edit';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid,	frFR } from '@mui/x-data-grid';

import useExcelExport from 'hooks/useExcelExport';
import ActorAdminPageLayout from 'containers/layouts/actorAdminPage/ActorAdminPageLayout';
import { useSessionState } from '../../../context/session/session';
import Link from '../../../components/Link';

const GET_EVENTS = gql`
  query eventsAdmin($userId: String!) {
    eventsAdmin(userId: $userId) {
      id
      label
      createdAt
      updatedAt
      startedAt
      endedAt
      nbParticipants
      referents {
        surname
        lastname
        email
        phone
      }
    }
  }
`;

const GET_PARTICIPANTS_BY_EVENT = gql`
  query participants($eventId: String!) {
    participants(eventId: $eventId) {
      id
      surname
      lastname
      participatedAt
      email
    }
  }
`;

const ParticipantList = (props: any) => {
  const { event, participantsToExport } = props;
  const [participants, setParticipants] = useState([]);

  const { loading, error } = useQuery(GET_PARTICIPANTS_BY_EVENT, {
    variables: {
      eventId: event?.id,
    },
    onCompleted: (data: any) => {
      setParticipants(data.participants);
      participantsToExport.current = data.participants;
    },
    fetchPolicy: 'network-only',
  });

  if (error) return null;

  if (loading) return <LinearProgress />;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Prénom</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>Email</TableCell>
          <TableCell align="right">Date de participation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {participants.map((participant: any) => (
          <TableRow key={participant.id}>
            <TableCell component="th" scope="row">
              {participant.surname}
            </TableCell>
            <TableCell>{participant.lastname}</TableCell>
            <TableCell>{participant.email}</TableCell>
            <TableCell align="right">
              <Moment format="DD/MM/YYYY HH:mm" unix>
                {participant.participatedAt / 1000}
              </Moment>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '200px',
    height: '200px',
    marginBottom: theme.spacing(4),
  },
  userInfosTitle: {
    marginBottom: theme.spacing(5),
  },
  nbParticipantsItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  dialogContent: {
    padding: '0 !important'
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

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

const EventAdminPage = () => {
  const user = useSessionState();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [participantsEvent, setParticipantsEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const styles = useStyles();
  const participantsToExport = useRef(null);
  const exportData = useExcelExport();

  const closeModal = useCallback(() => {
    setOpenModal(false);
    participantsToExport.current = null;
  }, []);

  const handleClickParticipantsEvent = useCallback(event => {
    setParticipantsEvent(event);
    setOpenModal(true);
  }, []);

  useEffect(() => {
    if (!participantsEvent) {
      setTimeout(() => {
        setParticipantsEvent(null);
      }, 200)
    }
  }, [participantsEvent]);

  const { data: dataAdminEvent } = useQuery(GET_EVENTS, {
    variables: {
      userId: user && user.id,
    },
    onCompleted: (data) => {
      if (user === undefined || user == null) {
        enqueueSnackbar(
          'Veuillez vous connecter pour effectuer des modifications.',
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      }
    },
  });
  const [state, setState] = React.useState({});

  const handleChange = (actor, event) => {
    setState({ ...state, [actor.id.toString()]: event.target.checked });
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let row = 0;
  if (typeof dataAdminEvent !== 'undefined') {
    row = dataAdminEvent.eventsAdmin.length;
  }

  const columns = [
    {
      field: 'label',
      headerName: 'Nom',
      width: 150,
      editable: false,
      renderCell: (params) =>
      <Link href={`/event/${params.row.id}`}>
                        {params.row.label}
                      </Link>,
    },
    {
      field: 'startedAt',
      headerName: 'Date de début',
      type: 'dateTime',
      width: 170,
      editable: false,
      valueGetter: (value ) => {
        return new Date(parseInt(value.value))
      },

    },
    {
      field: 'endedAt',
      headerName: 'Date de fin',
      type: 'dateTime',
      width: 200,
      editable: false,
      valueGetter: (value) => value && new Date(parseInt(value.value)),
    },
    {
      field: 'createdAt',
      headerName: 'Date de création',
      type: 'dateTime',
      width: 200,
      editable: false,
      valueGetter: (value) => value && new Date(parseInt(value.value)),
    },
    {
      field: 'updatedAt',
      headerName: 'Dernière date de modification',
      type: 'dateTime',
      width: 200,
      editable: false,
      valueGetter: (value) => value && new Date(parseInt(value.value)),
    },
    {
      field: 'volunteer',
      headerName: 'Participants',
      width: 150,
      editable: false,
      renderCell: (params) =>
      <NbParticipantsItem
      event={params.row}
                        className={styles.nbParticipantsItem}
                        onClick={handleClickParticipantsEvent}
                      />,
    },
    {
      field: 'link',
      headerName: "Lien de l'événement",
      width: 150,
      editable: false,
      renderCell: (params) =>
      <Link href={`/event/${params.row.id}`}>
                        {params.row.label}
                      </Link>,
    },
    {
      field: 'edit',
      headerName: "Editer l'événement",
      width: 150,
      editable: false,
      renderCell: (params) =>
      <Link href={`/actorAdmin/event/${params.row.id}`}>
                        <Edit />
                      </Link>,
    }
      ];


  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, row - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickExport = useCallback(() => {
    const dataToExport = (participantsToExport.current || []).map((participant: any) => ({
      ...participant,
      participatedAt: new Date(parseInt(participant.participatedAt, 10)),
    }));

    exportData({
      data: dataToExport,
      columns: ['id', 'surname', 'lastname', 'email', 'participatedAt'],
      columnLabels: ['ID', 'Prénom', 'Nom', 'Email', 'Date'],
      columnOptions: [{ wch: 4 }, { wch: 25 }, { wch: 25 }, { wch: 30 }, { wch: 20 }],
      sheetName: 'participants',
      fileName: 'participants',
    });
  }, [participantsToExport]);

  return (
    <ActorAdminPageLayout>
      <Typography
        color="secondary"
        variant="h6"
      >
        Listes des actions dont vous êtes administrateur
      </Typography>
      <Typography
        color="secondary"
        className={styles.userInfosTitle}
      >
        {/* @ts-ignore */}
        Vous pouvez ajouter une nouvelle action depuis l'écran <Link href='/actorAdmin'>Administrer mes pages acteurs</Link>
      </Typography>


      {typeof dataAdminEvent !== 'undefined' && (
      <>
          <div style={{ width: '100%' }}>
          <DataGrid
          style={{ width: '100%' }}
           localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            rows={ dataAdminEvent.eventsAdmin}
            columns={columns}
            initialState={{
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
          </div>
        </>
      )}*
   
      <Dialog open={openModal} onBackdropClick={closeModal} maxWidth="lg">
        <DialogTitle classes={{ root: styles.dialogTitle }}>
          <Grid xs={11}>Participants pour l'évènement <i>{(participantsEvent as any)?.label}</i></Grid>
          <Grid item xs={1}>
            <Tooltip title="Exporter">
              <IconButton onClick={handleClickExport} size="large">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogTitle>
        <DialogContent classes={{ root: styles.dialogContent }}>
          {
            participantsEvent && <ParticipantList event={participantsEvent} participantsToExport={participantsToExport} />
          }
        </DialogContent>
      </Dialog>
    </ActorAdminPageLayout>
  );
};

export default withApollo()(EventAdminPage);
