import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Search from '../../../components/Search';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: theme.spacing(2),
    backgroundImage: 'url(\'./fond.jpeg\')',
    backgroundSize: '100%',
    height: '24em',
    color: 'white',
    'text-align': 'center',
    padding: '3em',

  },
  title: {
    padding: '1em',
  },
  titleTypo: {
    fontSize: '2em',
    fontFamily: 'rowdies',
    color: 'white',
  },
  align: {
    'text-align': 'center',
  },

}));

const PresentationSection = () => {
  const styles = useStyles();

  return (
    <Container className={styles.titleContainer}>
      <div className={styles.title}>
        <Typography className={styles.titleTypo} variant="h1">
          OUtils des Acteurs Alternatifs en Aunis
        </Typography>
      </div>
      <Typography className={styles.align}>
        Notre mission : faire connaître celles et ceux qui œuvrent
        {' '}
        <br />
        pour la transition écologique, sociale et démocratique en Aunis
      </Typography>
      <Search />

    </Container>
  );
};

export default PresentationSection;
