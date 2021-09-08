import React, { useMemo } from 'react';
import EventCard from 'components/cards/EventCard';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import Moment from 'react-moment';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  events: {
    flex: 1,
    padding: '0 5em',
    overflow: 'auto',
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

const compare = (a, b) => {
  let comparison = 0;
  if (a.startedAt > b.startedAt) {
    comparison = 1;
  } else if (a.startedAt < b.startedAt) {
    comparison = -1;
  }
  return comparison;
};

const sameDay = (date1, date2) => {
  const d1 = new Date(parseInt(date1));
  const d2 = new Date(parseInt(date2));
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const Events = (props) => {
  const classes = useStyles();
  const { data, loading } = props;

  const events = useMemo(() => {
    let localEvents = (data?.events || []).slice();
    data && data.events.forEach((event) => {
      if (!sameDay(event.startedAt, event.endedAt)) {
        const nbDayEvent = moment(new Date(parseInt(event.endedAt))).diff(
          moment(new Date(parseInt(event.startedAt))),
          'days',
        );
        for (let i = 1; i <= nbDayEvent; i++) {
          const newEventForOtherDay = { ...event };
          newEventForOtherDay.startedAt = moment(
            new Date(parseInt(event.startedAt)),
          )
            .add(i, 'days')
            .toDate();
          localEvents.push(newEventForOtherDay);
        }
      }
    });
    return localEvents.sort(compare);
  }, [data]);

  return (
    <Grid className={classes.events} container direction="column" wrap="nowrap">
      <h1 className={classes.title}>ÉVÉNEMENTS À VENIR</h1>
      {
        loading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )
      }
      {
        (events.length === 0 && !loading) && (
          <h2>Aucun évènement</h2>
        )
      }
      {
        events.length > 0 && events.map((event, index) => {
          const lastEvent = index > 0 && events[index - 1];
          return (
            <div key={event.id + index}>
              {(!lastEvent || !sameDay(lastEvent.startedAt, event.startedAt)) && (
                <Moment
                  locale="fr"
                  format="DD MMMM YYYY"
                  className={classes.date}
                  unix
                >
                  {event.startedAt / 1000}
                </Moment>
              )}
              <EventCard key={event.id} event={event} />
            </div>
          )
        })
      }
    </Grid>
  );
};

export default Events;
