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
import Link from '../../components/Link';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
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
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    fontSize: '1em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
}));
const Participate = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container className={styles.align}>
            <Typography variant="h1">Je Participe</Typography>

            <Link href="/addactor">
              <button className={styles.buttonGrid}>
                JE DEVIENS UN ACTEUR
              </button>
            </Link>
            <Typography>
              <div>

                Tu veux changer le monde ? Vas-y fonce :
              </div>
              <br/>
              <div>
                Ouaaa est un site collaboratif, ce qui veut dire qu'il est fait par et pour ses contributeurs :  Sa gouvernance est assurée par les citoyens et organisations, acteurs de la transition que l'on peut trouver dans ses pages. Son administration suppose un gros travail de gestion de données, de coordination, de relation publique et de communication assuré en grande partie bénévolement.
                Nous sommes donc toujours à la recherche de personnes motivées qui souhaitent mettre de leur temps, leurs savoir faire, et leur énergie au service de la promotion de la transition écologique, sociale et citoyenne en Aunis !
              </div>
              <br/>
            </Typography>
            <Typography variant="h4">
              <a href="mailto:contact@ouaaa-transition.fr?subject=Offre de bénévolat">
              Je Participe et je rejoins l'équipe du
                {' '}
                <i>Ouaaa</i>
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

export default Participate;
