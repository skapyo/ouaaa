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
              <div>
              Il nous manquait depuis longtemps un site Internet regroupant et présentant les acteurs de la transition en Aunis ( nord Charente ) avec un annuaire, une carte, un agenda des évènements pour favoriser les échanges et synergies.
              </div>
              <br />
              <div>
              Le 1er confinement dû au COVID 19 en mars 2020, a été le déclencheur pour nous retrousser les manches. "Nous", c'est une vingtaine de bénévoles issus de divers collectifs associatifs (Collectif Transition Citoyenne, Collectif Actions Solidaires, Tiers Lieu La Proue) mais aussi des citoyennes et citoyens engagés.
Nous nous sommes attelés à la création d'un site Internet pour permettre à tous celles et ceux qui souhaitent changer la société de devenir acteur.rices de la transition sociale, environnementale, de renforcer les liens entre elles.eux, et de se faire connaître auprès du plus grand nombre. 
              </div>
              <br />
              <div>
              C'est ainsi qu'est né le site Ouaaa -  Agir pour la transition en Aunis 
et au fait Ouaaa ça veux dire quoi ? et bien en fait ça veux dire : Outil des Acteurs Alternatifs en Aunis mais pas que... finalement pour nous c'est surtout : Wouaw ! 
              </div>
              <br />
              <div>
                C'est ainsi que le site va bientôt voir le jour sous le nom de
                <i>OUAAA!</i> : Outil des Acteurs Alternatifs en Aunis.
              </div>
              <div>
              100% coopératif et animé par une équipe bénévole : sans but lucratif, Ouaaa est développé sur la base d’outils libres, il est utilisable et clonable par tous. Nos développeurs ont porté une attention particulière à l’impact écologique de notre site web et à son accessibilité à tous. Il est un lieu de publications et de partage d'infos : fiches pratiques, actualité, agenda, etc.
              </div>
              <div>
              Plateforme d’information et d’engagement, Ouaaa ! veut accélérer la transition vers un fonctionnement plus sobre, plus humain et véritablement « durable » dans les communautés de communes Aunis Atlantique, Aunis Sud, dans l’agglomération de La Rochelle, et dans l'Île de Ré.</div>
            </Typography>
            <br />
            <br />
            <Typography variant="h4">
              <a href="mailto:contact@acteursdelatransition.fr">
                Pour nous contacter
              </a>
              {/* @ts-ignore */}
            </Typography>
          </Container>
          <Newsletter />
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default About;
