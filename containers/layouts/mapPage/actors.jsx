import ActorCard from 'components/cards/ActorCard';

import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  actors: {
    width: '100%',
    margin: '0',
    paddingBottom: 66,
    [theme.breakpoints.down('sm')]: {
      padding: '0 1em',
    }
  },
  title: {
    color: '#2C367E',
    fontSize: '2.3em',
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#AEAEAE',
  },
}));

const Actors = (data) => {
  const classes = useStyles();

  const compare = (a, b) => {
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'accent' });
  };

  const actors = data.data && data.data.actors.slice();

  return (
    <Container className={classes.actors}>
      <h1 className={classes.title}>Liste des acteurs </h1>
      {actors &&
        actors.sort(compare).map((actor) => (
          <div key={actor.id}>
            {actor.name}
            <ActorCard key={actor.id} actor={actor} />
          </div>
        ))}
    </Container>
  );
};

export default Actors;
