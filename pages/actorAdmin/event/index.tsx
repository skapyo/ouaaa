import React, { useCallback, useEffect, useState } from 'react';
import { withApollo } from 'hoc/withApollo';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import gql from 'graphql-tag';
import Moment from 'react-moment';

import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';

import Edit from '@material-ui/icons/Edit';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

import { useSessionState } from '../../../context/session/session';
import Link from '../../../components/Link';

import ActorAdminPageLayout from 'containers/layouts/actorAdminPage/ActorAdminPageLayout';

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
  const { event } = props;
  const [participants, setParticipants] = useState([]);

  const { loading, error } = useQuery(GET_PARTICIPANTS_BY_EVENT, {
    variables: {
      eventId: event?.id
    },
    onCompleted: (data: any) => {
      setParticipants(data.participants);
    },
    fetchPolicy: 'network-only'
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
  )
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
  }
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
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
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
      >
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
      >
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
  )
}

const EventAdminPage = () => {
  const user = useSessionState();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [participantsEvent, setParticipantsEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const styles = useStyles();

  const closeModal = useCallback(() => {
    setOpenModal(false);
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
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Nom
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Date de début
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Date de fin
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Date de création
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Dernière date de modification
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Ville
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Référents
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Participants
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Lien Page acteur
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Editer la page
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof dataAdminEvent !== 'undefined' &&
                dataAdminEvent.eventsAdmin.map((event) => (
                  <TableRow key={event.id} hover>
                    <TableCell component="th" scope="row">
                      {/* @ts-ignore */}
                      <Link href={`/event/${event.id}`}>{event.label}</Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {event.startedAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {event.endedAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {event.createdAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {event.updatedAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {event.city}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {typeof event.referents !== 'undefined' &&
                        event.referents.map((referent) => {
                          {
                            referent.surname;
                          }
                          {
                            referent.lastname;
                          }
                          {
                            referent.email;
                          }
                          {
                            referent.phone;
                          }
                        })}
                    </TableCell>
                    <TableCell>
                      <NbParticipantsItem
                        event={event}
                        className={styles.nbParticipantsItem}
                        onClick={handleClickParticipantsEvent}
                      />
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {/* @ts-ignore */}
                      <Link href={`/event/${event.id}`}>
                        Lien vers page événement
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {/* @ts-ignore */}
                      <Link href={`/actorAdmin/event/${event.id}`}>
                        <Edit />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openModal} onBackdropClick={closeModal}>
        <DialogTitle>
          <div>Participants pour l'évènement <i>{(participantsEvent as any)?.label}</i></div>
        </DialogTitle>
        <DialogContent classes={{ root: styles.dialogContent }}>
          {
            participantsEvent && <ParticipantList event={participantsEvent} />
          }
        </DialogContent>
      </Dialog>
    </ActorAdminPageLayout>
  );
};

export default withApollo()(EventAdminPage);
