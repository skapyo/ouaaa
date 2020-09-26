import {Container, makeStyles} from '@material-ui/core';
import CategoryFilter from './CategoryFilter';
import DateFilter from './DateFilter';

const useStyles = makeStyles({
  filters: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "30%",
    minWidth: "220px",
    margin: "0",
  },
  title: {
    color: "#4A8E78",
    fontFamily: "rowdies",
    fontSize: "2.3em",
    margin: "1.3em 0.5em 0.5em",
  },
})

const Filters = (refetch) => {

  const classes = useStyles()

  return (
    <Container className={classes.filters}>
      <h4 className={classes.title}>DATE</h4>
      <DateFilter refetch={refetch}/>
      <h4 className={classes.title}>CATÉGORIES</h4>
      <CategoryFilter />
      <h4 className={classes.title}>LIEU</h4>
    </Container>
  )
}

export default Filters