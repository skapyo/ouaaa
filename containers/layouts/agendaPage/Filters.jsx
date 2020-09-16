import { Container, makeStyles } from '@material-ui/core';
import CategoryFilter from './CategoryFilter';

const useStyles = makeStyles({
  filters: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "30%",
    minWidth: "220px",
    height: "540px",
    margin: "0",
  },
  title: {
    color: "#4A8E78",
    fontFamily: "rowdies",
    fontSize: "2.3em",
  },
})

const Filters = () => {

  const classes = useStyles()

  return (
    <Container className={classes.filters}>
      <h4 className={classes.title}>DATE</h4>
      <h4 className={classes.title}>CATÉGORIES</h4>
      {/*<CategoryFilter />*/}
      <h4 className={classes.title}>LIEU</h4>
    </Container>
  )
}

export default Filters