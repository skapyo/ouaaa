import { Container, makeStyles } from '@material-ui/core';
import CategoryFilter from './CategoryFilter';
import DateFilter from './DateFilter';

const useStyles = makeStyles({
  filters: {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '30%',
    minWidth: '220px',
    margin: '0',
  },
  title: {
    color: '#2C367E',
    
    fontSize: '2.3em',
    margin: '1.3em 0.5em 0.5em',
  },
});

const Filters = (refetch) => {
  const classes = useStyles();

  return (
    <Container className={classes.filters}>
      <div className={classes.title}>DATE</div>
      <DateFilter refetch={refetch} />
      <div className={classes.title}>CATÉGORIES</div>
      <CategoryFilter refetch={refetch} />
      <div className={classes.title}>LIEU</div>
    </Container>
  );
};

export default Filters;
