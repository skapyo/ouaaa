import React, { useCallback, useEffect, useState } from 'react';
import { withApollo } from 'hoc/withApollo';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import gql from 'graphql-tag';
import Moment from 'react-moment';

import { Theme, Typography, useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper/Paper';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/material/SvgIcon/SvgIcon';
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

import Edit from '@mui/icons-material/Edit';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { useSessionState } from '../../../context/session/session';
import Link from '../../../components/Link';

import ActorAdminPageLayout from 'containers/layouts/actorAdminPage/ActorAdminPageLayout';

const GET_articles = gql`
  query articlesAdmin($userId: String!) {
    articlesAdmin(userId: $userId) {
      id
      label
      createdAt
      updatedAt
    }
  }
`;


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
    article: React.Mousearticle<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    article: React.Mousearticle<HTMLButtonElement>,
  ) => {
    onChangePage(article, 0);
  };

  const handleBackButtonClick = (
    article: React.Mousearticle<HTMLButtonElement>,
  ) => {
    onChangePage(article, page - 1);
  };

  const handleNextButtonClick = (
    article: React.Mousearticle<HTMLButtonElement>,
  ) => {
    onChangePage(article, page + 1);
  };

  const handleLastPageButtonClick = (
    article: React.Mousearticle<HTMLButtonElement>,
  ) => {
    onChangePage(article, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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

const ArticleAdminPage = () => {
  const user = useSessionState();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const styles = useStyles();

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const { data: dataAdminarticle } = useQuery(GET_articles, {
    variables: {
      userId: user && user.id,
    },
    onCompleted: (data) => {
      if (user === undefined || user == null) {
        enqueueSnackbar(
          'Veuillez vous connecter pour effectuer des modifications.',
          {
            prarticleDuplicate: true,
          },
        );
        router.push('/');
      }
    },
  });
  const [state, setState] = React.useState({});

  const handleChange = (actor, article) => {
    setState({ ...state, [actor.id.toString()]: article.target.checked });
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let row = 0;
  if (typeof dataAdminarticle !== 'undefined') {
    row = dataAdminarticle.articlesAdmin.length;
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, row - page * rowsPerPage);

  const handleChangePage = (
    article: React.Mousearticle<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    article: React.Changearticle<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(article.target.value, 10));
    setPage(0);
  };

  return (
    <ActorAdminPageLayout>
      <Typography
        color="secondary"
        variant="h6"
      >
        Listes des articles dont vous êtes administrateur
      </Typography>
      <Typography
        color="secondary"
        className={styles.userInfosTitle}
      >
        {/* @ts-ignore */}
        Vous pouvez ajouter un nouvel article depuis l'écran <Link href='/actorAdmin'>Administrer mes pages acteurs</Link>
      </Typography>
      {typeof dataAdminarticle !== 'undefined' && (
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
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
                  Lien Page acteur
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Editer la page
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof dataAdminarticle !== 'undefined' &&
                dataAdminarticle.articlesAdmin.map((article) => (
                  <TableRow key={article.id} hover>
                    <TableCell component="th" scope="row">
                      {/* @ts-ignore */}
                      <Link href={`/article/${article.id}`}>{article.label}</Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM/YY HH:mm" unix>
                        {article.createdAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Moment format="DD/MM/YY HH:mm" unix>
                        {article.updatedAt / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {/* @ts-ignore */}
                      <Link href={`/article/${article.id}`}>
                        Lien vers page article
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {/* @ts-ignore */}
                      <Link href={`/actorAdmin/article/${article.id}`}>
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
    </ActorAdminPageLayout>
  );
};

export default withApollo()(ArticleAdminPage);
