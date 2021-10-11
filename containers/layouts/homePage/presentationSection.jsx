import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Search from '../../../components/Search';
import Link from '../../../components/Link';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: theme.spacing(2),
    backgroundImage: "url('./cover_accueil.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '24em',
    color: 'white',
    'text-align': 'center',
    padding: '3em',
  },
  title: {
    padding: '1em',
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
    'text-align': 'center',
  },
  h1 : {
    'display' : 'none',
  },
  buttonGrid: {

    fontSize: 'inherit',
    margin: '1.5em 0 1.5em 0 ',
    color: 'white',
    'background-color': 'transparent',
    border: '2px solid white',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
}));

const PresentationSection = () => {
  const styles = useStyles();

  return (
    <Container className={styles.titleContainer}>

      <div className={styles.title}>
      <h1 className={styles.h1}>Agir pour la transition en Aunis</h1>
        <img src="./titre_acceuil.png" alt="Agir pour la transition en Aunis" className={styles.imageTitle} />
      </div>
      <Typography >
        <Link href="/addactor">
          <button className={styles.buttonGrid}>
            JE M'INSCRIS EN TANT QU'ACTEUR DE LA TRANSITION
          </button>
        </Link>
      </Typography>
      {/*  <Search /> */}
    </Container>
  );
};

export default PresentationSection;
