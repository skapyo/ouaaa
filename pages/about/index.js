import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box, Container, makeStyles, RootRef, Typography,
} from '@material-ui/core';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({

  align: {
    'text-align': 'center',
    width: '80%',
  },
  space: {
    margin: '4em 0 4em 0',
  },

}));
const About = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container className={styles.align}>
            <Typography variant="h1">A propos</Typography>
            <div className={styles.space}> </div>

            <Typography>
              <div>Depuis plusieurs années, le besoin d'un site Internet présentant au grand public les acteurs de la transition en Aunis est ressenti avec acuité par le monde associatif. Un site collaboratif qui proposerait outre un annuaire et une carte, un agenda des évènements et autres fonctionnalités augmentant les possibilités d'interactions et de coopérations.</div>
              <br />
              <div>Cette envie a également été exprimée lors des précédents Forums participatifs.</div>
              <br />
              <div>Et puis vint le confinement, qui nous a décidé à nous retrousser les manches. "Nous", c'est une vingtaine de bénévoles issus de divers collectifs associatifs (Collectif Transition Citoyenne, Collectif Actions Solidaire, Tiers Lieu La Proue) mais aussi des citoyennes et citoyens engagés.</div>
              <br />
              <div>C'est ainsi que le site va bientôt voir le jour sous le nom de Ouaaa : Outil des Acteurs Alternatifs en Aunis.</div>
            </Typography>
            <br />
            <br />
            <Typography variant="h4">
              <a href="mailto:contact@acteursdelatransition.fr">Pour nous contacter</a>
              {' '}
            </Typography>

          </Container>
          <Newsletter />
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default About;
