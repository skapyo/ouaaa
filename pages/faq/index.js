import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import Newsletter from '../../containers/layouts/Newsletter';
import Link from 'components/Link';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

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
            <div className={styles.align}>
              <Typography variant="h1">Foire aux questions</Typography>
            </div>

            <div><b>Comment créer mon compte sur OUAAA! ?</b><br />
              Dans le menu haut de votre écran, cliquez sur <PersonOutlineIcon /> puis sur le bouton <Image src="/image/creer_compte.png" height="100%" width="100%" /> ou par <Link href="/signin"> ici</Link>
            </div>
            <ul>
              <li> Wouaw ! et bien en fait ça veux dire : Outil des Acteurs Alternatifs en Aunis.</li> <br />
              <li><b>Comment me tenir informé de l'actualité de Ouaaa ?</b> En s'inscrivant sur la liste de diffusion de l'info-lettre</li> <br />
              <li><b>Qui peut devenir acteur contributeur de Ouaaa ?</b>Tout le monde, citoyen, organisation, entreprise, collectivité, concernant des activités en relation avec la transition écologique et sociale telle que définit dans notre <a href="/charter" target="blank">charte</a></li> <br />
              <li><b>Comment devient on acteur contributeur de Ouaaa ?</b></li> <br />
              <li><b>Comment est organisée la gouvernance d Ouaaa ?</b></li> <br />
              <li><b>Qui s'occupe de Ouaaa ?</b></li> <br />
              <li><b>Comment remplir ma fiche acteur ?</b></li> <br />
              <li><b>Comment remplir mon agenda acteur ?</b></li> <br />
            </ul>
          </Container>
          <Newsletter />
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default Faq;
