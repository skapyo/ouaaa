import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import gql from 'graphql-tag';

import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@mui/material/Grid';
import { useRouter, withRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Moment from 'react-moment';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { withApollo } from 'hoc/withApollo';
import Head from 'next/head';
import { useSessionState } from '../../context/session/session';
import Newsletter from '../../containers/layouts/Newsletter';
import Link from '../../components/Link';


const GET_USER_ACTOR_GAME = gql`
  query userActorGame($userId: String!) {
    userActorGame(userId: $userId) {
      id
      name
      gameParticipationDate
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
  image: {
    width: '30%',
  },
  container: {
    width: '90%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '5em',
    },
    'text-align': 'center',
   
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem !important',
    },
  },
  justify: {
    'text-align': 'justify',
  },
  border: {
    width: '3em',
    borderColor: '#2C367E',
    borderBottom: 'solid',
    borderBottomColor: '#2C367E',
    color: '#2C367E',
    height: '1em',
    marginBottom: 10,
  },
  buttonGrid: {
    padddingTop: '6em',
    margin: '5em 0 5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',

    borderRadius: '1.5em',
    padding: '0.2em 3em 0.2em 3em',
    minHeight: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('./arrow-hover.svg')",
    },
    backgroundImage: "url('/arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    fontSize: '1em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
}));
const GrandDefi = () => {
  const styles = useStyles();
  const user = useSessionState();
  const { data: dataUserActorGame } = useQuery(GET_USER_ACTOR_GAME, {
    variables: {
      userId: user && user.id,
    },
    onCompleted: (data) => {
      if (user === undefined || user == null) {
        enqueueSnackbar(
          'Veuillez vous connecter pour accéder à votre espace grand défi.',
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      }
    },
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let row = 0;
  if (typeof dataUserActorGame !== 'undefined') {
    row = dataUserActorGame.userActorGame.length;
  }
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, row - page * rowsPerPage);

  return (
    <AppLayout>
       <Head>
        <title>
          {/* @ts-ignore */}
          Espace grand défi
        </title>
          <meta
            property="og:image"
            content={"./image/GrandDefi-LOGO.png"}
          />
      </Head>
      <RootRef>
        <Box>
          <Container className={styles.container}>
            <Typography className={styles.justify}>
              <br/>
              <br/>
              <div>
              <Grid item  className={styles.align}>
                <img className={styles.image} src="./image/GrandDefi-LOGO.png" />
              </Grid>
              <br/>
              <br/>
              <Typography variant="h1" className={styles.align} >Ta progression du grand défi</Typography>
              <br/>
              <br/>
              Tu souhaites en savoir plus sur le jeu du grand défi, <Link href={`/granddefi`}>rends toi sur la page d'explication</Link>.
              <br/>
            
              <br/>
              <br/>
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                Tes acteurs visités
                </Typography>
                <div className={styles.border} />
                <br />
             </div>
             </div>
             </Typography>
             {typeof dataUserActorGame !== 'undefined' && (
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Nom Acteur
                </TableCell>
                <TableCell align="left">
                  Date de passage
                </TableCell>
                <TableCell  align="left">
                  Lien de la page acteur
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            {typeof dataUserActorGame !== 'undefined' &&
                dataUserActorGame.userActorGame.map((actor) => (
                  <TableRow key={actor.id} hover>
                    <TableCell component="th" scope="row">
                      {/* @ts-ignore */}
                      <Link  target="_blank" color="inherit" underline="none" href={`/actor/${actor.id}`}>{actor.name}</Link>
                    </TableCell>
                   <TableCell  align="left">
                      <Moment format="DD/MM HH:mm" unix>
                        {actor.gameParticipationDate / 1000}
                      </Moment>
                    </TableCell>
                    <TableCell  align="left">
                      {/* @ts-ignore */}
                      <Link  target="_blank" color="inherit" underline="none" href={`/actor/${actor.id}`}>
                        Lien vers page acteur
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


          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default withRouter(withApollo()(GrandDefi));
