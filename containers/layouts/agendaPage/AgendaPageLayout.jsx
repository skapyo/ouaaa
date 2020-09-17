import { withApollo } from "hoc/withApollo"
import Events from 'containers/layouts/agendaPage/Events'
import Filters from 'containers/layouts/agendaPage/Filters'
import Newsletter from 'containers/layouts/Newsletter'
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  layout: {
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: "#F6F6F6",
    padding: "50px 0",
    margin: "0",
    width: "100%",
    maxWidth: "none",
  },
})

const AgendaPageLayout = () => {
  const classes = useStyles()

  return (
    <Container>
      <Container className={classes.layout}>
        <Filters />
        <Events />
      </Container>
      <Newsletter />
    </Container>
  )
}

export default withApollo()(AgendaPageLayout)