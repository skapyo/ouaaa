import {
  createStyles, makeStyles, Theme, Typography, useTheme,
} from '@material-ui/core';
import { withApollo } from 'hoc/withApollo';
import ActorAdminPageLayout from 'containers/layouts/actorAdminPage/ActorAdminPageLayout';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import Edit from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/core/SvgIcon/SvgIcon';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import Moment from 'react-moment';
import Link from '../../components/Link';
import { useSessionState } from '../../context/session/session';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '200px',
    height: '200px',
    marginBottom: theme.spacing(4),
  },
  userInfosTitle: {
    marginBottom: theme.spacing(5),
  },

}));

const useStyles1 = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
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

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const useStyles2 = makeStyles({
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

});

const ActorAdminPage = () => {
  const user = useSessionState();
  const GET_ACTORS = gql`

        query actorsAdmin (
            $userId: String!
        )
        { actorsAdmin(userId: $userId)
        {   id,
            name,
            address,
            short_description,
            createdAt,
            updatedAt,
            city,
            lat,
            lng,
            categories{
                label
            }
            referents{
                surname,
                lastname,
                email,
                phone
            }
        }
        }
        
    `;
  const { data, loading, error } = useQuery(GET_ACTORS, {
    variables: {
      userId: user.id,
    },
  });

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let row = 0;
  if (typeof data !== 'undefined') {
    row = data.actorsAdmin.length;
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, row - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [state, setState] = React.useState({});

  const handleChange = (actor, event) => {
    setState({ ...state, [actor.id.toString()]: event.target.checked });
  };
  const styles = useStyles();

  return (
    <ActorAdminPageLayout>
      <Typography
        color="secondary"
        variant="h6"
        className={styles.userInfosTitle}
      >
        Listes des acteurs dont vous êtes administrateur
      </Typography>
      {typeof data !== 'undefined' && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof data !== 'undefined' && data.actorsAdmin.map((actor) => (
                <TableRow key={actor.id} hover>
                  <TableCell component="th" scope="row">
                    {actor.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    <Moment format="DD/MM HH:mm" unix>{actor.createdAt / 1000}</Moment>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    <Moment format="DD/MM HH:mm" unix>{actor.updatedAt / 1000}</Moment>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {actor.city}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {typeof actor.referents !== 'undefined' && actor.referents.map((referent) => {
                      { referent.surname; } { referent.lastname; } { referent.email; } { referent.phone; }
                    })}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {/* @ts-ignore */}
                    <Link href={`/actor/${actor.id}`}>
                      Lien Page
                    </Link>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Link href={`/actorAdmin/actor/${actor.id}`}>
                      <Edit />
                    </Link>
                  </TableCell>

                </TableRow>
              ))}

              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={typeof data !== 'undefined' ? data.actorsAdmin.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </ActorAdminPageLayout>
  );
};

export default withApollo()(ActorAdminPage);
