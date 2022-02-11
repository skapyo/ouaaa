import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Moment from 'react-moment';
import moment from 'moment';

import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import Paper from '@material-ui/core/Paper/Paper';
import LastPageIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Edit from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/Download';

import useExcelExport from 'hooks/useExcelExport';
import ActorAdminPageLayout from 'containers/layouts/actorAdminPage/ActorAdminPageLayout';
import { withApollo } from 'hoc/withApollo';
import Link from '../../components/Link';
import { useSessionState } from '../../context/session/session';

const GET_ACTORS = gql`
  query actorsAdmin($userId: String!) {
    actorsAdmin(userId: $userId) {
      id
      name
      address
      shortDescription
      createdAt
      updatedAt
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

const GET_VOLUNTEERS_BY_ACTOR = gql`
  query volunteers($actorId: String!) {
    volunteers(actorId: $actorId) {
      id
      surname
      lastname
      email
      participatedAt
    }
  }
`;

const useTablePaginationActionsStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

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
  const classes = useTablePaginationActionsStyles();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

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

const VolunteerList = (props: any) => {
  const { actor, volunteersToExport } = props;
  const [volunteers, setVolunteers] = useState([]);

  const { loading, error } = useQuery(GET_VOLUNTEERS_BY_ACTOR, {
    variables: {
      actorId: actor?.id,
    },
    onCompleted: (data: any) => {
      setVolunteers(data.volunteers);
      volunteersToExport.current = data.volunteers;
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
          <TableCell align="right">Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {volunteers.map((volunteer: any) => (
          <TableRow key={volunteer.id}>
            <TableCell component="th" scope="row">
              {volunteer.surname}
            </TableCell>
            <TableCell>{volunteer.lastname}</TableCell>
            <TableCell>{volunteer.email}</TableCell>
            <TableCell align="right">
              <Moment format="DD/MM/YYYY HH:mm" unix>
                {volunteer.participatedAt / 1000}
              </Moment>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

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
  buttonGrid: {
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',
    padding: '0 1em 0 1em',
    fontSize: '16px',
    borderRadius: '1.5em',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
      border: '2px solid #2C367E',
    }
  },
  nbVolunteersItem: {
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
  table: {
    minWidth: 500,
  },
  gridContainer: {
    marginTop: '4px',
  },
  title: {
    fontWeight: 700,
  },
  fab: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 1400,
  },
  drawer: {
    '& .MuiDrawer-paperAnchorBottom': {
      height: '100%',
    },
  },
}));

const ActorAdminPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actorIdValidated, setActorIdValidated] = useState(0);
  const [volunteersActor, setVolunteersActor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({});
  const user = useSessionState();
  const styles = useStyles();
  const volunteersToExport = useRef(null);
  const exportData = useExcelExport();

  const closeModal = useCallback(() => {
    setOpenModal(false);
    volunteersToExport.current = null;
  }, []);

  const handleClickVolunteersActor = useCallback(event => {
    setVolunteersActor(event);
    setOpenModal(true);
  }, []);

  useEffect(() => {
    if (!volunteersActor) {
      setTimeout(() => {
        setVolunteersActor(null);
      }, 200);
    }
  }, [volunteersActor]);

  const { data, loading, error, refetch } = useQuery(GET_ACTORS, {
    variables: {
      userId: user && `${user.id}`,
    },
  });

  const emptyRows = useMemo(() => {
    const row = typeof data !== 'undefined' ? data.actorsAdmin.length : 0;

    return rowsPerPage - Math.min(rowsPerPage, row - page * rowsPerPage);
  }, [data, rowsPerPage, page]);

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

  const handleChange = (actor, event) => {
    setState({ ...state, [actor.id.toString()]: event.target.checked });
  };

  const [validateActor, { data: dataValidateActor }] = useMutation(
    VALIDATE_ACTOR,
    {
      variables: {
        actorId: actorIdValidated,
        userId: parseInt(user && user.id, 10),
      },
    },
  );

  const validate = useCallback(
    (actor) => {
      if (!actor.isValidated) {
        setActorIdValidated(parseInt(actor.id, 10));
        validateActor();
      }
    },
    [validateActor],
  );

  useEffect(() => {
    if (dataValidateActor) {
      refetch();
    }
  }, [dataValidateActor]);

  const handleClickExport = useCallback(() => {
    const dataToExport = (volunteersToExport.current || []).map((volunteer: any) => ({
      ...volunteer,
      participatedAt: new Date(parseInt(volunteer.participatedAt, 10)),
    }));

    exportData({
      data: dataToExport,
      columns: ['id', 'surname', 'lastname', 'email', 'participatedAt'],
      columnLabels: ['ID', 'Prénom', 'Nom', 'Email', 'Date'],
      columnOptions: [{ wch: 4 }, { wch: 25 }, { wch: 25 }, { wch: 30 }, { wch: 20 }],
      sheetName: 'volontaires',
      fileName: 'volontaires',
    });
  }, [volunteersToExport]);

  return (
    <ActorAdminPageLayout>
      <Grid container>
        <Grid item xs={9}>
          <Typography
            color="secondary"
            variant="h6"
            className={styles.userInfosTitle}
          >
            Listes des acteurs dont vous êtes administrateur
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {/* @ts-ignore */}
          <Link href="/addactor">
            <button type="button" className={styles.buttonGrid}> Créer une nouvelle page</button>
          </Link>
        </Grid>
      </Grid>

      {typeof data !== 'undefined' && (
        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Nom
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
                  Lien Page acteur
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Editer la page
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Volontaires
                </TableCell>

                {user && user.role === 'admin' && (
                  <>
                    <TableCell style={{ width: 160 }} align="left">
                      Validation
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      Date de validation
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      Personne ayant validé
                    </TableCell>

                  </>
                )}
                <TableCell style={{ width: 160 }} align="left">
                  Ajouter une nouvelle action
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Ajouter un nouvel article
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof data !== 'undefined'
                && data.actorsAdmin.map((actor) => (
                  <TableRow key={actor.id} hover>
                    <TableCell component="th" scope="row">
                      {/* @ts-ignore */}
                      <Link href={`/actorAdmin/actor/${actor.id}`}>
                        {actor.name}
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {actor.createdAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {actor.updatedAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {actor.city}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {typeof actor.referents !== 'undefined'
                        && actor.referents.map((referent) => {
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
                    <TableCell style={{ width: 160 }} align="center">
                      {/* @ts-ignore */}
                      <Link href={`/actor/${actor.id}`}>
                        Lien vers page acteur
                      </Link>
                    </TableCell>

                    <TableCell style={{ width: 160 }} align="center">
                      {/* @ts-ignore */}
                      <Link href={`/actorAdmin/actor/${actor.id}`}>
                        <Edit />
                      </Link>
                    </TableCell>

                    <TableCell>
                      <NbVolunteersItem
                        actor={actor}
                        className={styles.nbVolunteersItem}
                        onClick={handleClickVolunteersActor}
                      />
                    </TableCell>

                    {user && user.role == 'admin' && (
                      <>
                        <TableCell style={{ width: 160 }} align="center">
                          <CheckCircleIcon
                            style={{
                              color: actor.isValidated ? 'green' : 'orange',
                            }}
                            onClick={() => validate(actor)}
                          />
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {actor.dateValidation && (
                            <Moment format="DD/MM HH:mm" unix>
                              {actor.dateValidation / 1000}
                            </Moment>
                          )}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {actor.userValidated && actor.userValidated.surname}
                          {' '}
                          {actor.userValidated && actor.userValidated.lastname}
                        </TableCell>
                      </>
                    )}
                    <TableCell style={{ width: 160 }} align="center">
                      {/* @ts-ignore */}
                      <Link href={`/addevent/${actor.id}`}>
                        <AddCircleOutline />
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {/* @ts-ignore */}
                      <Link href={`/addarticle/${actor.id}`}>
                        <AddCircleOutline />
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

      <Dialog open={openModal} onBackdropClick={closeModal} maxWidth="lg">
        <DialogTitle classes={{ root: styles.dialogTitle }}>
          <Grid item xs={11}>Volontaires pour l'acteur <i>{(volunteersActor as any)?.name}</i></Grid>
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
            volunteersActor && <VolunteerList actor={volunteersActor} volunteersToExport={volunteersToExport} />
          }
        </DialogContent>
      </Dialog>
    </ActorAdminPageLayout>
  );
};

export default withApollo()(ActorAdminPage);
