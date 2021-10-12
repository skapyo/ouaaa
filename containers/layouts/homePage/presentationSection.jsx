import { Container, makeStyles, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import Search from '../../../components/Search';
import Link from '../../../components/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: theme.spacing(2),
    backgroundImage: "url('./OUAAA-pix-022.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('md')]: {
      height: '45em',
    },
   
    color: 'white',
    'text-align': 'center',
    
    [theme.breakpoints.up('md')]: {
      padding: '8em',
    },
    [theme.breakpoints.down('sm')]: {
      height: '30em',
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
    'text-align': 'center',
  },
  baseLine:{
    'fontSize': '1em',
    [theme.breakpoints.up('xs')]: {
      'text-align': 'center',
    },
    [theme.breakpoints.down('xs')]: {
      'text-align': 'justify',
    },
  },
  addActor:{
    [theme.breakpoints.up('md')]: {
      paddingTop: '5em',
    },
  },
  h1 : {
    paddingTop: '1em',
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
   
    textTransform: 'uppercase',
  },
  buttonGrid: {
    fontSize: '1em',
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
    'background-position-y': '-2px',
  },
}));


const PresentationSection = () => {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container className={styles.titleContainer}>

      <div className={styles.title}>
      <h1 className={styles.h1}>agir pour la transition écologique <br/> et sociale en aunis</h1>
      </div>
      <Typography className={styles.baseLine}>
        Nous sommes là pour te faire connaire celles et ceux qui oeuvrent { !mobile && (<br/>)}
        pour la transition écologique, sociale et démocratique, te donner le calendrier de leurs actions et te permettre de les rejoindre.
      </Typography >

      <Typography className={styles.addActor}>
        <Link href="/addactor">
          <button className={styles.buttonGrid}>
            JE DEVIENS ACTEUR
          </button>
        </Link>
      </Typography>
      {/*  <Search /> */}
    </Container>
  );
};

export default PresentationSection;
