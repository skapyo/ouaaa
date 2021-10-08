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

            <Typography variant="h4">
              <a href="mailto:contact@ouaaa-transition.fr">
                Rejoins l'équipe du <i>OUAAA!</i>
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
