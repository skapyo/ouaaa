import { Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Image from 'next/image';
import ListItemText from '@mui/material/ListItemText';
import Build from '@mui/icons-material/Build';
import Link from '../../../components/Link';

const useStyles = makeStyles((theme) => ({
  cardInfo: {
    padding: '2em',
    zIndex: 1,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '0.5em',
    width: '80%!important',
    justify: 'center',
    alignItems: 'center',
    'max-width': '755px',
    'margin-top': '-53px',
    'box-shadow': '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      marginRight: '0',
      width: '100%!important',
      marginTop: '2em',
    },
  },
  inprogress: {
    color: '#2C367E',
    textAlign: 'center',
    fontSize: '2em',
    height: '170px',
    [theme.breakpoints.down('md')]: {
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

    fontSize: '1.4em',
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
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  buttonInverseActor: {

    fontSize: '1.2em',
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
    [theme.breakpoints.down('md')]: {
      'background-size': '21%',
    },

  },
  buttonInverseOrganisation: {

    fontSize: '1.2em',
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
    fontSize: '1.3em',
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
    [theme.breakpoints.down('md')]: {
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
  },
}));

const PresentationSection = (props) => {
  const styles = useStyles();

  return (
    <Container className={styles.cardInfo} id={props.id}>
      <Grid container spacing={3} className={styles.flexColumn}>
        <Grid item md={6}>
          <div className={styles.gridTitle}>
            <Typography variant="h3" className={styles.cardTitle}>
              <i>Projet Alimentaire de Territoire d’Aunis</i>
            </Typography>
            <div className={styles.border} />
          </div>
          <List className={styles.root}>
            <ListItem>
              <ListItemText
                className={styles.listItemText}
                primary={(
                  <>
                    Ce site est destiné aux acteurs locaux des secteurs de l'alimentation et de l'agriculture, intéressés par le <b>Projet Alimentaire Territorial  de l'Aunis (PAT)</b>.
                    <br/> Il doit participer à la réunion d'informations et la mise en contact, pour une communauté d'intérêts.
                    <br/> 
Nous vous invitons à inscrire vos coordonnées et activités par le formulaire d'inscription  <Link href="/addactor">
           
          </Link>. <br/>
          <br/> Votre entreprise, organisation pourra ainsi apparaître, et vous pourrez chercher d'autres acteurs selon des filtres de sélection par territoire géographique, par centre d'intérêt, sur une carte, vous pourrez générer des listes et trouver des coordonnées selon vos centres d'intérêts, retrouver les rendez-vous du PAT sur un agenda commun, chercher des références de documentation. 

          <br/>
        Ce référencement est ouvert aux membres actifs du PAT, à ceux qui sont concernés et voudraient le rejoindre, quelle que soit leur filière (de la production à la transformation, vente, animation, solidarité, etc..) et leur statut (public, privé, de la société civile). 
        <br/>
        Ce service est libre d'usage, vous pourrez adapter ou supprimer vos informations à tout moment.
        <br/>
        Merci donc de compléter les informations, cela pourra se faire aussi par groupe de travail, avec leurs référents.
        <br/>
        Pour information :
        <br/>
        Le PAT a aussi une importante vocation de sensibilisation, communication, promotion. 
        <br/>
        Dans un second temps, et si vous le souhaitez, vous pouvez aussi dès à présent apparaître sur la partie publique de ce site, à l'adresse :<Link href="https://ouaaa-transition.fr/">
        https://ouaaa-transition.fr/
          </Link>.   
        <br/>
        Certains d'entre vous y sont référencés, l'objectif de cet autre site étant de mettre en valeur l'ensemble des acteurs locaux sur des thématiques variées (transport, énergie, environnement, etc.), dont alimentation et agriculture. Cela permettrait de développer votre visibilité, et de faire connaître les objectifs du PAT aux consommateurs / citoyens pour qu'ils s'y engagent.
        <br/>
                  </>
                )}
              />
            </ListItem>
          </List>

        
        </Grid>

   <Grid item md={6} className={[styles.align]} style =  {{ width: '100%'}}>
          <div className={[styles.align]} style =  {{ width: '100%', height: '100%', position: 'relative', minHeight:"300px"}}>
            <Image alt="Mountains" layout='fill' objectFit='contain' src="/image_accueil.png" />
          </div>
        </Grid>
      </Grid>
                
      <br />
  
    </Container>
  );
};

export default PresentationSection;
