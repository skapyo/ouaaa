import EventCard from 'components/cards/EventCard'
import gql from "graphql-tag"
import {useMutation, useQuery} from "@apollo/react-hooks";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  events: {
    width: "50%",
    margin: "0",
  },
  title: {
    color: "#4A8E78",
    fontFamily: "rowdies",
    fontSize: "2.3em",
  },
})

const GET_EVENTS = gql`
query events {
    events {
        id,
        label,
        startedAt,
        endedAt,
        published
    }
}
`;

const Events = () => {

  const classes = useStyles()
  const {data:eventData, loading, error} = useQuery(
    GET_EVENTS
  )

  return (
    <Container className={classes.events}>
      <h4 className={classes.title}>ÉVÉNEMENTS À VENIR</h4>
      {
        eventData && eventData.events.map((event) =>
          <EventCard key={event.id} event={event} />
        )
      }
    </Container>
  )
}

export default Events