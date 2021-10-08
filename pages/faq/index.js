import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
}));
const Faq = () => {
  const styles = useStyles();

  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container >
            <div  className={styles.align}>
            <Typography variant="h1">Foire aux questions</Typography>
            </div>
            <br/>
            <br/>
            <ul>
              <li><b>Et au fait Ouaaa ça veux dire quoi ?</b> Wouaw ! et bien en fait ça veux dire : Outil des Acteurs Alternatifs en Aunis.</li> <br/>
              <li><b>Comment me tenir informé de l'actualité de Ouaaa ?</b> En s'inscrivant sur la liste de diffusion de l'info-lettre</li> <br/>
              <li><b>Qui peut devenir acteur contributeur de Ouaaa ?</b>Tout le monde, citoyen, organisation, entreprise, collectivité, concernant des activités en relation avec la transition écologique et sociale telle que définit dans notre <a href="/charter" target="blank">charte</a></li> <br/>
              <li><b>Comment devient on acteur contributeur de Ouaaa ?</b></li> <br/>
              <li><b>Comment est organisée la gouvernance d Ouaaa ?</b></li> <br/>
              <li><b>Qui s'occupe de Ouaaa ?</b></li> <br/>
              <li><b>Comment remplir ma fiche acteur ?</b></li> <br/>
              <li><b>Comment remplir mon agenda acteur ?</b></li> <br/>
            </ul>
          </Container>
          <Newsletter />
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default Faq;
