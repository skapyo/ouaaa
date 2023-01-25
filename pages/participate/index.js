import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Box, Container,  Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Newsletter from '../../containers/layouts/Newsletter';
import Link from '../../components/Link';


const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
  container: {
    width: '90%',
    [theme.breakpoints.down('lg')]: {
      paddingTop: '5em',
    },
    'text-align': 'center',
   
  },
  justify: {
    'text-align': 'justify',
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
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8em',
    },
  },
}));
const Participate = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <>
        <Box>
          <Container className={styles.container}>
            <Typography variant="h1">Je Participe</Typography>
            <Typography className={styles.justify}>
              <br/>
              <br/>
              <div>
              Tu cherches comment participer activement à la transition écologique et sociale en Aunis ? <br/> Les acteurs présents sur OUAAA! peuvent avoir des besoins pour organiser un festival, intervenir dans les écoles pour sensibiliser les jeunes, distribuer des repas, nettoyer nos plages… Rendez-vous sur leur  page acteur, un onglet « recherche des bénévoles » t’indique présicément leurs besoins du moment. Il ne te reste plus qu’à cliquer sur « devenir bénévole » et hop ! C’est parti
              </div>
              <br/>
              
              <div>
              Tu représentes un acteur (particulier, association, ONG, entreprise, service public...) engagée sur les questions de transition écologique et sociale et celui-ci souhaite se faire connaitre ?
              </div>
              <br/>
              </Typography>
              <Link href="/addactor">
                <button className={styles.buttonGrid}>
                JE M'INSCRIS EN TANT QU'ACTEUR DE LA TRANSITION
                </button>
              </Link>
              <Typography className={styles.justify}>
            <div>
              Tu veux changer le monde avec nous ?
            </div>
            <div>
            OUAAA! est un site collaboratif.  Il est fait pour et par ses usagers, les acteurs recensés et ses partenaires publics ou privés. 
            </div>
            <br/>
            <div>
            Majoritairement bénévole, l'équipe projet est toujours à la recherche de personnes motivées qui souhaitent mettre de leurs temps, leurs savoir-faire, et leur énergie au service de la promotion de la transition écologique et sociale en Aunis.
            </div>
            <br/>
            <div>
            Si tu as des affinités notamment avec la communication, le développement-codage ou encore les relations partenaires, rejoins-nous dès maintenant ! 
            </div>
            <br/>
            </Typography>
            <Typography variant="h4">
              <a href="https://contact466459.typeform.com/to/x0uyBGSf" target="_blank">
              JE REJOINS L’EQUIPE
                {' '}
                <i>OUAAA!</i>
              </a>
              {/* @ts-ignore */}
            </Typography>
            <br/>
            <br/>
          </Container>
        </Box>
      </>
    </AppLayout>
  );
};

export default Participate;
