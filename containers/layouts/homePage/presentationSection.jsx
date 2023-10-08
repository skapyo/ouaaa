import { Container, Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState, useMemo, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '../../../components/Link';
import SearchEngine from '../../../components/SearchEngine';
import { useSessionState } from 'context/session/session';
import { useRouter, withRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Image from 'next/image';
const useStyles = makeStyles((theme) => ({
  titleContainer: {
    color: 'white',
    textAlign: 'center',
    zIndex:1,
    [theme.breakpoints.up('md')]: {
      height: '45em',
    },
    [theme.breakpoints.up('md')]: {
      padding: '8em',
    },
  },
  landingImage: {
    zIndex: 0,
    height: "300px",
  },
  title: {
    padding: '1em',
    position: "relative",
    zIndex: 1,
  },
  subtitle:{
    background: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1em',
    },
  },
  imageTitle: {
    width: '600px',
    maxWidth: '117%',
  },
  titleTypo: {
    fontSize: '2em',

    color: 'white',
  },
  align: {
    textAlign: 'center',
  },
  baseLine: {
    fontSize: '1em',
    position: 'relative',
    fontWeight: 'bold',
    zIndex:1,
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'justify',
    },
    margin: 'auto',
    width: 'fit-content',
    background: 'rgba(255, 255, 255, 0.7)',
    padding: '24px',
    borderRadius: '26px',
    color: 'black',
  },
  addActor: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '1em',
    },
  },
  h2 :{
    fontSize: '0.6em',
  },
  h1: {
    paddingTop: '1em',
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2em',
    },
    background: 'rgba(255, 255, 255, 0.7)',
    width: 'fit-content',
    textAlign: 'center',
    margin: 'auto',
    padding: '20px',
    borderRadius: '26px',
    color: 'black',
  },
  buttonGrid: {
    fontSize: '1em',
    margin: '1.5em 0 1.5em 0 ',
    color: 'white',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: '1.5em',
    padding: '0.2em 3em 0.2em 3em',
    minHeight: '2.5em',
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 5,
    backgroundPositionY: -2,
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      backgroundColor: 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('./arrow-hover.svg')",
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
}));

const PresentationSection = (props) => {
  const router = useRouter();
  const styles = useStyles();
  const theme = useTheme();
  const user = useSessionState();

  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
  if (user === undefined || user == null) {
    enqueueSnackbar(
      'Veuillez vous connecter pour accéder au PAT-OUAAA!',
      {
        preventDuplicate: true,
      },
    );
    router.push('/signin');
  }
});
  return (
    <Container className={styles.titleContainer} id={props.id}>
      <Image
      className={styles.landingImage}
                    src="/Accueil1.jpg"
                    alt="Affiche PAT-OUAAA!" 
                    fill
                    objectFit="cover"
                    objectPosition="center"
                  />
      <div className={styles.title}>
        <h1 className={styles.h1}>
        Projet Alimentaire de Territoire d’Aunis : 
        <div className={styles.h2}>
        agir pour la transition écologique et sociale
            {' '}
            <br />
            {' '}
            à travers le plan alimentaire de territoire
            </div>
        </h1>
        <br /><br />

        <div className={styles.subtitle}>
      Ce site est destiné aux acteurs locaux des secteurs de l'alimentation et de l'agriculture, intéressés par le Projet Alimentaire Territorial de l'Aunis (PAT).
Il doit participer à la réunion d'informations et la mise en contact, pour une communauté d'intérêts.
Nous vous invitons à inscrire vos coordonnées et activités par le formulaire d'inscription .
</div>
 
<br />
<br/>
    <Link href="/addactor">
    <button className={styles.buttonInverseOrganisation}>JE M'INSCRIS EN TANT QU'ACTEUR DU PAT</button>
    </Link>
      </div>

      <br />
   
      <br />
      { /*<SearchEngine />*/}
   
    </Container>
  );
};

export default withRouter(PresentationSection);
