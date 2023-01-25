import { useMutation, useQuery } from '@apollo/client';
import { Theme, Typography, useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper/Paper';
import LastPageIcon from '@mui/material/SvgIcon/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Edit from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AdministrationLayout from 'containers/layouts/administration/AdministrationPageLayout';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import React, { useCallback, useEffect } from 'react';
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

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

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

const Administration = () => {
  const user = useSessionState();

  const SAVE_CATEGORIES = gql`
    mutation saveCategories($actorId: Int!, $userId: Int!) {
      validateActor(actorId: $actorId, userId: $userId) {
        name
      }
    }
  `;
  const classes = useStyles2();

  const styles = useStyles();

  return (
    <AdministrationLayout>
      <Typography
        color="secondary"
        variant="h6"
        className={styles.userInfosTitle}
      >
        TODO administrer Listes des catégories
      </Typography>
    </AdministrationLayout>
  );
};

export default withApollo()(Administration);
