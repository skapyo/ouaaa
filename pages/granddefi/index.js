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
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
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
              L'équipe du <i>OUAAA!</i> te lance un défi : rencontrer un maximum d'acteurs sur le territoire déjà référencés sur <i>OUAAA!</i>.<br/>
              Le but du Grand Défi est simple, en allant à la rencontre des acteurs, tu collectionneras les preuves de tes visites et gagneras des lots à chaque palier atteint.
              <br/>
              <br/>
              
              <br/>
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                Comment jouer ? 
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
              Tu devras au préalable <Link href={`/signin`}  target="_blank">créer ton compte.</Link> <br/>
              Muni de ton téléphone, en scannant l'affiche du Grand Défi de l'acteur contenant le QR code, ton passage sera automatiquement validé par <i>OUAAA!</i>.<br/>
              Tu pourras voir ton avancement dans l'espace Grand Défi en cliquant <Link href={`/OUAAA-GrdDEFI-DEPLIANT.pdf`} >ici</Link>.  <br/>
              Tu seras informé des événements de remise de lots.  <br/>
              </div>
              <br/>
              Si tu n'as pas de téléphone ou d'accès internet mobile, on a aussi pensé à toi.<br/>
              Tu as peut-être déjà en main le dépliant du Grand Défi. Si ce n'est pas le cas, tu peux le télécharger et l'imprimer <Link href={`/OUAAA-GrdDEFI-DEPLIANT.pdf`} target="_blank" >ici</Link>.<br/>
              Tu pourrras présenter le dépliant lors de ta rencontre avec l'acteur qui inscrira la preuve de ton passage par une signature ou un tampon.<br/>
              Rapporte ton dépliant lors des événements <i>OUAAA!</i> pour venir récupérer tes lots. Le prochain événement est le 18 juin.
              <br/>
              <br/>
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                LE BONUS CACHé !
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
              <i>OUAAA!</i> est un jeune site participatif qui découvre et fait découvrir tous les jours de nouveaux acteurs de la transition écologique et sociale près de chez toi. <br/>
              Si tu connais un acteur que <i>OUAAA!</i> ne connaît pas encore, et si grâce à toi il est accepté sur <i>OUAAA!</i>, tu gagneras pour chaque nouvel inscrit une gratification spéciale contributeur : Le Bonus Caché !
              <br/>
              <br/>
             Mets au défi tes amis et tes proches en leur proposant de jouer à leur tour.  <br/>
             Seras-tu capable d'atteindre le premier palier d'ici le 18 juin, première date officelle de remise des lots ?
              <br/>
              <br/>
              
              <br/>
              </Typography>
              <Grid item  className={styles.align}>
                <img className={styles.image} src="./image/granddefi.png" />
              </Grid>
              <br/>
              Tu souhaites t'informer sur le réglement? Télécharge le <Link href={`/réglement_jeu_grand_défi.pdf`} target="_blank">ici</Link><br/>
               <br/>
               <br/>
          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default GrandDefi;
