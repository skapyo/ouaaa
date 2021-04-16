import ActorCard from 'components/cards/ActorCard';

import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  actors: {
    width: '50%',
    margin: '0',
  },
  title: {
    color: '#4A8E78',
    fontFamily: 'rowdies',
    fontSize: '2.3em',
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#AEAEAE',
  },
});

const Actors = (data) => {
  const classes = useStyles();

  const compare = (a, b) => {
    return a.name > b.name;
  };

  const actors = data.data && data.data.actors.slice();

  return (
    <Container className={classes.actors}>
      <h1 className={classes.title}>Liste des acteurs </h1>
      {actors &&
        actors.sort(compare).map((actor) => (
          <div key={actor.id}>
            <ActorCard key={actor.id} actor={actor} />
          </div>
        ))}
    </Container>
  );
};

export default Actors;
