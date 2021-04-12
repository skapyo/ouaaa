import {
  Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Build from '@material-ui/icons/Build';
import Link from '../../../components/Link';

const useStyles = makeStyles((theme) => ({
  cardInfo: {
    padding: '2em',
    backgroundColor: 'white',
    backgroundImage: 'url(\'/icons/planet.svg\')',
    backgroundSize: '30%',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: ' 0.5',
    backgroundPositionY: '226px',
    borderRadius: '0.5em',
    width: '80%',
    justify: 'center',
    alignItems: 'center',
    'max-width': '755px',
    'margin-top': '-53px',
    'box-shadow': '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginRight: '0',
      width: '100%',
    },
  },
  inprogress: {
    color: '#bf083e',
    textAlign: 'center',
    paddingTop: '2em',
    fontSize: '2em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4em',
    },
  },
  align: {
    'text-align': 'center',
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
  },
  image: {
    'box-shadow': '11px 11px 13px -3px rgba(0, 0, 0, 0.46)',
  },
  gridItem: {
    'background-color': '#f9f9f9',
    margin: '12px',
    padding: '10px',
  },
  imageGrid: {
    paddingTop: '30px',
    paddingBottom: '20px',
  },
  buttonGrid: {
    margin: '1.5em 0 1.5em 0 ',
    color: 'white',
    'background-color': '#bf083e',
    border: 'none',
    fontFamily: 'rowdies',
    borderRadius: '1.5em',
    padding: '0.2em 3em 0.2em 3em',
    minHeight: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#bf083e',
      'background-color': 'white',
      border: '2px solid #bf083e',
      backgroundImage: 'url(\'./arrow-hover.svg\')',

    },
    backgroundImage: 'url(\'./arrow.svg\')',
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    fontSize: '1em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
  button: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#bf083e',
    border: 'none',
    fontFamily: 'rowdies',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    minHeight: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#bf083e',
      'background-color': 'white',
      border: '2px solid #bf083e',
      backgroundImage: 'url(\'./arrow-hover.svg\')',
    },
    backgroundImage: 'url(\'./arrow.svg\')',
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '15%',
    marginBottom: '30px',

  },
  map: {
    paddingLeft: '19%',
  },
  titleGrid: {
    color: '#2a9076',
    fontSize: '12px',
    lineHeight: 'inherit',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'justify',
  },
  listItemText: {

    textAlign: 'justify',
  },

  improvement: {
    textAlign: 'center',
    marginBottom: '4em',
  },
  flexColumn: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const PresentationSection = () => {
  const styles = useStyles();

  return (
    <Container className={styles.cardInfo}>
      <Typography className={styles.inprogress}>
        <Build />
        {/* @ts-ignore */}
        Site en cours de développement.
        <Build />
        <p>Abonnez-vous à la newsletter pour suivre les avancées.</p>
      </Typography>
      <div className={styles.improvement}>
        <Link href="/improvment">
          <button className={styles.buttonGrid}>DECOUVRIR LES PROCHAINES FONCTIONNALITES ET FAIRE UN RETOUR DE LA PREMIERE VERSION</button>
        </Link>
      </div>
      <Grid container spacing={3} className={styles.flexColumn}>
        <Grid item md={6}>
          <div className={[styles.align]}>
            <Typography variant="h2" className={styles.cardTitle}>
              OUAAA
            </Typography>
            <Typography variant="h3" className={styles.cardTitle}>
              EN 3 POINTS
            </Typography>
          </div>
          <List className={styles.root}>
            <ListItem>
              <ListItemText className={styles.listItemText} primary="Issu du milieu associatif : Le site est né de la volonté de 3 collectifs (Collectif Transition Citoyenne, Collectif Action Solidaire et Tiers Lieux la Proue) de disposer d’une vitrine pour se faire connaître, et disposer d’un agenda réactif pour publier leurs évènements." />
            </ListItem>
            <ListItem>
              <ListItemText className={styles.listItemText} primary="Créé pour et par les acteurs de la transition : Le site a été créé sur mesure par une équipe de bénévoles motivés, il permet aux acteurs de la transition de renseigner eux-mêmes leurs informations. Il sera adossé à une rencontre physique régulière, afin que virtuel et réel se complètent." />
            </ListItem>
            <ListItem>
              <ListItemText className={styles.listItemText} primary="Catalyseur de transition : nous pensons qu’en faisant connaître les acteurs de la transition du grand public et en renforçant les liens entre eux, nous allons accélérer la nécessaire transition de notre territoire vers un fonctionnement plus sobre, plus humain et véritablement « durable »" />
            </ListItem>
          </List>

        </Grid>

        <Grid item md={6} className={styles.align}>
          <img
            width="60%"
            className={styles.image}
            src="./image_card.jpg"
          />
        </Grid>
      </Grid>
      <Link href="/map" className={styles.map}>
        <button className={styles.button}>VOIR LA CARTE</button>
      </Link>
      <Typography variant="h2" className={[styles.cardTitle, styles.align]}>
        Ouaaa : Agir pour la transition en Aunis
      </Typography>
      <Typography variant="h3" className={[styles.cardTitle, styles.align]}>
        C'EST POUR QUI ?
      </Typography>

      <Grid container justify="center" className={[styles.align, styles.flexColumn]}>
        <Grid item md={5} sm={10} className={[styles.gridItem, styles.align]}>
          <img
            width="20%"
            src="./people.svg"
            className={styles.imageGrid}
          />
          <Typography className={styles.titleGrid}>
            Vous êtes un citoyen et souhaitez mieux
          </Typography>
          <Typography className={styles.titleGrid}>
            connaire, soutenir, vous engager ?
          </Typography>
          <Link href="/map">
            <button className={styles.buttonGrid}>
              JE DECOUVRE LES ACTEURS
            </button>
          </Link>
        </Grid>
        <Grid item md={5} sm={10} className={[styles.gridItem, styles.align]}>
          <img
            width="20%"
            className={styles.imageGrid}
            src="./organisation.svg"
          />
          <Typography className={styles.titleGrid}>
            Vous êtes une organisation et vous
          </Typography>
          <Typography className={styles.titleGrid}>
            souhaitez vous faire connaitre ?
          </Typography>
          <Link href="/addactor">
            <button className={styles.buttonGrid}>JE DEVIENS UN ACTEUR</button>
          </Link>
        </Grid>
      </Grid>
    </Container>

  );
};

export default PresentationSection;
