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

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
  image: {
    width: '50%',
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
  return (
    <AppLayout>
       <Head>
        <title>
          {/* @ts-ignore */}
          Le grand défi écologique et solidaire - Sur les chemins de la transition en Aunis
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
              Le grand défi est un jeu gratuit, sans obligation d’achat. <br/>
              Son but est simple, te faire découvrir les acteurs de la transition référencés sur OUAAA! en allant à leur rencontres en collectionnant les preuves de tes visites.  <br/>
              Tu gagnera des lots à chaque palier atteint.

              <br/>
              <br/>
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                LE BONUS CACHé !
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
              OUAAA ! est un jeune site participatif qui découvre et fait découvrir tous les jours de nouveaux acteurs de la transition écologique et sociale près de chez toi. <br/>
              Si tu connais un acteur que OUAAA ! ne connaît pas encore, et si grâce à toi il est accepté sur OUAAA ! tu gagneras pour chaque nouvel inscrit une gratification spéciale contributeur : Le Bonus Caché !
              <br/>
              <br/>
              <br/>
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                Version papier : 
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
              Tu as peut être déjà en main le dépliant du Grand défi. Si ce n'est pas le cas tu peux le télécharger et l'imprimer <a href="http://privatecloud.acteursdelatransition.fr/s/KQY7Nj8RG7BLBq4/download">ici</a>.<br/>
              Tu pourrras présenter le dépliant lors de ta rencontre avec l'acteur qui inscrira la preuve de ton passage par une signature ou un tampon.<br/>
              Ramènes ton dépliant lors des événements OUAAA! pour venir récupérer tes lot. Le prochain événement est le 17 juin.
              <br/>
              <br/>
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                Version numérique : 
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
              Tu devras au préalable créer ton compte sur le site ouaaa-transition.fr <br/>
              Muni de ton téléphone, en scannant l'affiche du grand défi de l'acteur contenant le QR code, ton passage sera automatique validé par OUAAA!.<br/>
              Tu pourras voir ton avancement dans l'espace grand défi en cliquant <Link href={`/granddefiProgression`}>ici </Link>  <br/>
              Tu seras informé plus facilement des remises de lots  <br/>
              </div>
              <br/>
              </Typography>
              <Grid item  className={styles.align}>
                <img className={styles.image} src="./image/granddefi.png" />
              </Grid>

          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default GrandDefi;
