import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Box, Container,  Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    [theme.breakpoints.down('lg')]: {
      paddingTop: '5em',
    },

  },
  justify: {
    'text-align': 'justify',
  },
  align: {
    'text-align': 'center',
  },
}));
const Charter = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <>
        <Box>
          <Container className={styles.container}>
            <div className={styles.align}>
              <Typography variant="h1">Objectifs du Développement Durable</Typography>
            </div>
            <br />
            <br />
            <div className={styles.justify}>
              {' '}
              <p>
                <div>
                  En 2015, les 193 pays membres de l'ONU signent de façon unanime deux traités importants dont l'accord sur les Objectifs du Développement Durable (ODD). Inspiré par plusieurs pays d'Amérique Latine. Contrairement aux précédents, cet accord va au-delà de l'aide au "tiers-monde". Un effort collectif pour le bien commun !
                </div>
                <div className={styles.align}>
                  <img src="/image/odd-donut_simplifie.jpg" alt="Plancher social, Plancher environnemental" />
                </div>
                <br />
                <div>
                  Bien plus ambitieux, il convient que les pays riches doivent diminuer leur empreinte écologique, et les pays pauvres augmenter leur indice de développement humain (autre indice ONU regroupant le PIB par habitant, l’espérance de vie à la naissance et le niveau d’éducation). Ce concept a été schématisé par l’économiste KATE RAWORTH comme un « doughnut » Son nom ludique peut interpeller, et pourtant cette théorie est très sérieuse ! Elle représente le défi du 21ème siècle : «construire un espace sûr et juste pour l’humanité». Pour y parvenir, il est nécessaire de répondre aux besoins sociaux (le plancher qui permet de vivre décemment) tout en respectant les limites de notre planète (plafond qui marque la zone à ne pas dépasser)
                </div>
                <br />
                <div>
                  Décliné en "Agenda 2030", le traité invite chaque pays du Monde à répondre aux enjeux majeurs tout en gardant la possibilité d’aller au-delà du minimum requis par l’accord et proposer des indicateurs plus pertinents.
                </div>
                <div className={styles.align}>
                  <img src="/image/17_ODD_ONU.jpg" alt="ODD ONU" />
                </div>
                <br />
              </p>

              <p>
                <div>
                  Les Objectifs du Développement Durable sont dispatchés en 17 branches et 169 cibles. Toutes celles-ci sont liées et interagissent ensemble. Il subsiste parfois des contradictions. Par exemple : l'ODD santé [3] est clairement impacté positivement par l'éducation [4], l'accès à l'eau [6], les infrastructures [9], etc Mais il propose aussi via la cible [3.3] de mettre fin d'ici 2030 aux maladies tropicales, ce qui pourrait pousser à une lutte sans pitié contre les moustiques sauf que ceux-ci sont indispensables à la biodiversité [14] et [15]… etc !
                </div>
                <br />
                <br />
                <div>
                  Le développement de l’économie sociale et solidaire est la preuve que le secteur économique compte aussi prendre sa part dans ce nouvel écosystème. Certaines entreprises veulent contribuer au développement durable via une approche responsable de leur modèle défini par les critères de la Responsabilité Sociétale des Entreprises (RSE) intégrant les préoccupations sociales et environnementales à leurs activités commerciales et leurs relations avec les parties prenantes.
                </div>
                <br />
                <div>
                  Chaque habitant possède aussi des leviers d’actions à impact positif pour participer à la réussite d’un monde plus juste et sûr pour tous : en agissant au quotidien, en adaptant son mode de vie, en interpelant les pays signataires à respecter leurs engagements, à appliquer l’accord sur l’ensemble des 169 cibles et les pousser à améliorer leurs indicateurs.
                </div>
                <br />
                <div>
                  Pour participer à ce grand mouvement collectif,
                  {' '}
                  <i>OUAAA!</i>
                  {' '}
                  propose un système de répartition des acteurs et actions en 4 ensembles et 22 sujets inspirés des Objectifs du Développement Durable et ceux du Collectif National pour la Transition.
                </div>
              </p>
            </div>
          </Container>
        </Box>
      </>
    </AppLayout>
  );
};

export default Charter;
