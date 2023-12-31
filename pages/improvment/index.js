import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Box, Container,  Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
  button: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',
    
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
    },
    backgroundImage: "url('/arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    fontSize: '1.5em',
  },

  imageGrid: {
    padding: '2em',
  },
}));
const Improvment = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <>
        <Box>
          <Container className={styles.align}>
            <Typography variant="h1">Les fonctionnalités</Typography>
            <img
              width="70%"
              className={styles.imageGrid}
              src="./improvment.png"
            />
            <div>
              <a
                rel="noopener noreferrer"
                href="https://privatecloud.acteursdelatransition.fr/s/66XSkfa963CA8Xg"
                target="_blank"
              >
                <button className={styles.button}>
                  Faire un retour d'expérience ou apporter une idée
                  d'amélioration
                </button>
              </a>
            </div>
          </Container>
        </Box>
      </>
    </AppLayout>
  );
};

export default Improvment;
