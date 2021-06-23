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
    backgroundImage: "url('/icons/planet.svg')",
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
    color: '#2C367E',
    textAlign: 'center',
    fontSize: '2em',
    height: '170px',
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
    width: '100%',
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

    fontSize: '1em',
    margin: '1.5em 0 1.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',
    fontWeight: 'bold',
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
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
  button: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',
    
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    minHeight: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('./arrow-hover.svg')",
    },
    backgroundImage: "url('./arrow.svg')",
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
    color: '#2C367E',
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
  gridTitle: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  border: {
    width: '3em',
    borderColor: '#2C367E',
    borderBottom: 'solid',
    borderBottomColor: '#2C367E',
    color: '#2C367E',
    height: '1em',
  }
}));

const PresentationSection = () => {
  const styles = useStyles();

  return (
    <Container className={styles.cardInfo}>
      <Typography className={styles.inprogress}>
          <img className={styles.inprogress} src="./in_progress.png" />
        <p />
        {/* <p>Abonnez-vous à la newsletter pour suivre les avancées.</p> */}
      </Typography>

     
      <Grid container spacing={3} className={styles.flexColumn}>
        <Grid item md={6}>
          <div className={styles.gridTitle}>
            <Typography variant="h3" className={styles.cardTitle}>
              OUAAA !
            </Typography>
            <Typography variant="h3" className={styles.cardTitle}>
              C'EST QUOUUA ?
            </Typography>
            <div className={styles.border} />
          </div>
          <List className={styles.root}>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary="OUAAA est le site des initiatives, des réseaux et des acteurs de la transition vers une société plus humaine et plus écologique sur le territoire de l'Aunis (nord Charente-Maritime)."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary="L'idée du site est née en 2020 de la volonté de 3 collectifs citoyens de créer une vitrine pour permettre à tous celles et ceux qui souhaitent changer la société de devenir acteur.rices de la transition sociale, environnementale, de renforcer les liens entre elles.eux, et de se faire connaître auprès du plus grand nombre."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary="100% coopératif et animé par une équipe bénévole : sans but lucratif, Ouaaa est développé sur la base d’outils libres, il est utilisable et clonable par tous."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary="Plateforme d’information et d’engagement, Ouaaa ! veut accélérer la transition vers un fonctionnement plus sobre, plus humain et véritablement « durable » dans les communautés de communes Aunis Atlantique, Aunis Sud, dans l’agglomération de La Rochelle, et dans l'Île de Ré."
              />
            </ListItem>
          </List>

          <div className={styles.align}>
            <Link href="/map">
              <button className={styles.buttonGrid}>
                VOIR LA CARTE
              </button>
            </Link>
          </div>
        </Grid>

        <Grid item md={6} className={styles.align}>
          <img className={styles.image} src="./image_accueil.png" />
        </Grid>
      </Grid>
      {/*
      <br />
      <Typography variant="h2" className={[styles.cardTitle, styles.align]}>
        Ouaaa : Agir pour la transition en Aunis
      </Typography>
      <Typography variant="h3" className={[styles.cardTitle, styles.align]}>
        C'EST POUR QUI ?
      </Typography>
      <br />
      <Grid
        container
        justify="center"
        className={[styles.align, styles.flexColumn]}
      >
        <Grid item md={5} sm={10} className={[styles.gridItem, styles.align]}>
          <img width="20%" src="./people.svg" className={styles.imageGrid} />
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
        */}
    </Container>
  );
};

export default PresentationSection;
