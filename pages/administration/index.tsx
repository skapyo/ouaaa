import { useMutation, useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme, Typography, useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper/Paper';
import LastPageIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Edit from '@material-ui/icons/Edit';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
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

const useStyles1 = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

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
  const GET_CATEGORIES = gql`
    query categories {
      categories {
        id,
        label,
        activated
        subCategories {
          id
          label
          icon
        }
      }
    }
    `;
    const SAVE_CATEGORIES = gql`
        mutation saveCategories( $actorId: Int!, $userId: Int!) {
            validateActor( actorId: $actorId,userId: $userId) {
                name

            }
        }
    `;
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES, {
  
  });
  const classes = useStyles2();
  

  const [state, setState] = React.useState({});


    const [saveCategories,{ data:saveCategoriesData, }] = useMutation(SAVE_CATEGORIES, {

    });


    useEffect(() => {
        if (saveCategoriesData) {
            refetch();
        }
    }, [saveCategoriesData]);
  const styles = useStyles();

  return (
    <AdministrationLayout>
      <Typography
        color="secondary"
        variant="h6"
        className={styles.userInfosTitle}
      >
        Listes des catégories
      </Typography>
 
    </AdministrationLayout>
  );
};

export default withApollo()(Administration);
