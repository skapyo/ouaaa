import {
  Container, makeStyles, Typography, useTheme,
} from '@material-ui/core';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '../../../components/Link';
import SearchEngine from '../../../components/SearchEngine';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    backgroundImage: "url('./Accueil1.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    backgroundPosition: 'center center',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      height: '45em',
    },
    [theme.breakpoints.up('md')]: {
      padding: '8em',
    },
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
    textAlign: 'center',
  },
  baseLine: {
    fontSize: '1em',
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
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
  h1: {
    paddingTop: '1em',
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
    [theme.breakpoints.down('sm')]: {
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
}));

const PresentationSection = (props) => {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container className={styles.titleContainer} id={props.id}>
      <div className={styles.title}>
        <h1 className={styles.h1}>
            agir pour la transition écologique
            {' '}
            <br />
            {' '}
            et sociale en aunis
        </h1>
      </div>

      <Typography className={styles.baseLine}>
        Nous sommes là pour te faire connaître celles et ceux qui oeuvrent
        {' '}
        {!mobile && (<br />)}
        pour la transition écologique, sociale et démocratique, te donner le calendrier de leurs actions et te permettre de les rejoindre.
      </Typography>

      <SearchEngine />
    </Container>
  );
};

export default PresentationSection;
