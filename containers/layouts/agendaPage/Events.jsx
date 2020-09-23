import EventCard from 'components/cards/EventCard'
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks";
import { Container, makeStyles } from '@material-ui/core';
import Moment from 'react-moment';

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
  date: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#AEAEAE",
  },
})

const GET_EVENTS = gql`
query events {
    events {
        id
        label
        startedAt
        endedAt
        published
        lat
        lng
        address
        city
        categories {
          id
          label
          icon
          color
        }
        actors {
          id
          name
        }
    }
}
`;

const Events = () => {

  const classes = useStyles()
  const {data:eventData, loading, error} = useQuery(
    GET_EVENTS
  )
  var lastDate = undefined

  const compare = (a, b) => {
    let comparison = 0;
    if (a.startedAt > b.startedAt) {
      comparison = 1;
    } else if (a.startedAt < b.startedAt) {
      comparison = -1;
    }
    return comparison;
  }

  const sameDay = (date1, date2) => {
    const d1 = new Date(parseInt(date1))
    const d2 = new Date(parseInt(date2))
    return (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate())
  }

  const setOldDate = (date) => {
    lastDate = date
  }

  return (
    <Container className={classes.events}>
      <h4 className={classes.title}>ÉVÉNEMENTS À VENIR</h4>
      {
        eventData && eventData.events.sort(compare).map((event) =>
          <div key={event.id}>
            { (!lastDate || !sameDay(lastDate, event.startedAt)) &&
              <Moment locale="fr" format="DD MMMM" className={classes.date} unix>{event.startedAt/1000}</Moment>
            }
            {setOldDate(event.startedAt)}
            <EventCard key={event.id} event={event} />
          </div>
        )
      }
    </Container>
  )
}

export default Events