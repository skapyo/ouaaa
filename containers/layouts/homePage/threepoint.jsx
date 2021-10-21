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
    fontSize: '3em',
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

    fontSize: '1.5em',
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
    'background-position-y': '-3px',

    boxShadow: '11px 13px 22px -10px rgb(0 0 0 / 46%)',
  },
  buttonGridDiv: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  buttonInverseActor: {

    fontSize: '1.5em',
    margin: '1.5em 0 1.5em 0 ',
    fontWeight: 'bold',
    borderRadius: '1.5em',
    padding: '0.2em 3em 0.2em 3em',
    minHeight: '2.5em',
    color: '#68b5a9',
    'background-color': 'white',
    border: '2px solid #68b5a9',
    backgroundImage: "url('./arrow-actor.svg')",
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
      'background-color': '#68b5a9',
      border: 'none',
      backgroundImage: "url('./arrow-hover-inverse.svg')",
    },
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '-3px',

  },
  buttonInverseOrganisation: {

    fontSize: '1.5em',
    margin: '1.5em 0 1.5em 0 ',
    fontWeight: 'bold',
    borderRadius: '1.5em',
    padding: '0.2em 3em 0.2em 3em',
    minHeight: '2.5em',
    color: '#d96552',
    'background-color': 'white',
    border: '2px solid #d96552',
    backgroundImage: "url('./arrow-organisation.svg')",
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
      'background-color': '#d96552',
      border: 'none',
      backgroundImage: "url('./arrow-hover-inverse.svg')",
    },
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '-3px',

  },
  map: {
    paddingLeft: '19%',
  },
  titleGrid: {
    fontSize: '1.5em',
    lineHeight: 'inherit',
    fontWeight: '600',
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
      <Grid container spacing={3} className={styles.flexColumn}>
        <Grid item md={6}>
          <div className={styles.gridTitle}>
            <Typography variant="h3" className={styles.cardTitle}>
              <i>OUAAA!</i>
            </Typography>
            <Typography variant="h3" className={styles.cardTitle}>
              C'EST QUOUAAA ?
            </Typography>
            <div className={styles.border} />
          </div>
          <List className={styles.root}>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary={
                  <>Tu habites le Territoire du Nord de la Charente-Maritime ou la ville de <b>La Rochelle</b> et tu veux  <Link href="/map">trouver une recyclerie, réparer un objet, changer de producteur d'énergie, t'inscrire dans une AMAP, rénover ta maison</Link> et bien plus encore ? Tu es au bon endroit !
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary={
                  <>Le <b>projet OUAAA! accompagne la transition</b> de notre territoire vers un fonctionnement plus  <b>sobre</b>,  <b>plus solidaire</b> et véritablement <b>durable</b>. Tu trouveras ici des informations sur les acteurs qui participent à la transition écologique et sociale dans des domaines aussi variées que : <b>l'éducation</b>, la culture, la santé, <b>l'alimentation</b>, la justice, l'économie, la citoyenneté, l'agriculture, l'industrie, l'habitat, la mobilité, <b>l'énergie</b>, le recyclage, la réduction des déchets, <b>le développement durable</b>, <b>le climat</b>, la qualité de l'air, la biodiversité, la gestion de l'eau, l'aménagement du territoire, etc
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary={
                  <>Partenaire de <b>La Rochelle Territoire Zéro carbone</b>, la plateforme participative <i>OUAAA!</i> met un coup de projecteur, sur tous celles et ceux qui agissent pour la <b>transition climatique</b>. Cette communauté d’acteurs est présente sur tout le territoire, dans les villes comme dans les villages, de l'anse de l'Aiguillon à l'embouchure de la Charente, de la forêt de Benon au bout de l'île de Ré en passant par Surgères, l’agglomération de La Rochelle, Saint Martin de Ré, Marans, et Châtelaillon-Plage.
                  </>
                }
              />
            </ListItem>
          </List>

          <div className={styles.buttonGridDiv}>
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

      <br />
      <Grid
        container
        justify="center"
        className={[styles.align, styles.flexColumn]}
      >

        <Grid item md={5} sm={10} className={[styles.gridItem, styles.align]}>
          <img width="30%" src="./Icone_decouvrir_acteur.png" className={styles.imageGrid} />
          <Typography className={styles.titleGrid}>
            Tu es un citoyen et souhaites mieux
          </Typography>
          <Typography className={styles.titleGrid}>
            connaître, soutenir, t'engager ?
          </Typography>
          <Link href="/map">
            <button className={styles.buttonInverseActor}>
              JE DÉCOUVRE LES ACTEURS
            </button>
          </Link>
        </Grid>

        <Grid item md={5} sm={10} className={[styles.gridItem, styles.align]}>
          <img
            width="30%"
            className={styles.imageGrid}
            src="./Icone_acteur.png"
          />
          <Typography className={styles.titleGrid}>
            Vous êtes une organisation et vous
          </Typography>
          <Typography className={styles.titleGrid}>
            souhaitez vous faire connaître ?
          </Typography>
          <Link href="/addactor">
            <button className={styles.buttonInverseOrganisation}>JE DEVIENS UN ACTEUR</button>
          </Link>
        </Grid>

      </Grid>

    </Container>
  );
};

export default PresentationSection;
