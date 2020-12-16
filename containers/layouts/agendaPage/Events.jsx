import EventCard from 'components/cards/EventCard'

import {Container, makeStyles} from '@material-ui/core';
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



const Events = (data) => {

  const classes = useStyles()

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
      <h1 className={classes.title}>ÉVÉNEMENTS À VENIR</h1>
      {
        data.data && data.data.events.sort(compare).map((event) =>
          <div key={event.id}>
            { (!lastDate || !sameDay(lastDate, event.startedAt)) &&
              <Moment locale="fr" format="DD MMMM YYYY" className={classes.date} unix>{event.startedAt/1000}</Moment>
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