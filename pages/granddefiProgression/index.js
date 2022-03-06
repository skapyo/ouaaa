import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Newsletter from '../../containers/layouts/Newsletter';
import Link from '../../components/Link';

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
                  Lien de l'événement
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  Editer l'événement
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


          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default GrandDefi;
