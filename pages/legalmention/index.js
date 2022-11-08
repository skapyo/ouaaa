import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
  Grid,
} from '@material-ui/core';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
  main: {
    paddingTop: '5em',

  },
}));
const Charter = () => {
  const styles = useStyles();

  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container component="main" maxWidth="md" className={styles.main}>
            <Typography className={styles.align} variant="h1">Mentions Légales</Typography>
            <br />
            <br />
            <br />
            <Typography variant="body1"> - Nom de l'éditeur : Aunis en transition  31 rue Eugene Decout 17000 Rochelle</Typography>
            <Typography variant="body1"> - Hébergeur :  OVH</Typography>
            <Typography variant="body1"> - gestion des données personnelles: </Typography>
            <Typography variant="body1">Conformément à l'article 34 de la loi Informatique et Liberté du 6 janvier 1978, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données vous concernant. Pour l'exercer, adressez-vous à dpd@ouaaa-transition.fr </Typography>
            <Typography variant="body1"> - Finalités de traitement </Typography>
            <Typography variant="body1"> - durée de conservation des données </Typography>
            <Typography variant="body1"> - suppression automatique des info de contact si mail/teléphone plus valides (remplacement dans la fiche acteur des coordonnées par ‘à vérifier » puis après une nouvelle année suppression de la fiche.</Typography>
            <br />
            <br />
          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default Charter;
