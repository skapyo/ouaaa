import { Container, Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useMemo,useEffect, useState } from 'react';
import Slider from 'react-slick/lib';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withApollo } from '../../../hoc/withApollo';
import CardSliderEvent from '../../../components/cards/CardSliderEvent';
import Link from '../../../components/Link';
import { RRule } from 'rrule';
import moment from 'moment';
import { getImageUrl, rruleToText } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: '3em',
  },
  align: {
    'text-align': 'center',
  },
  actorContainer: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
  },
  border: {
    width: '3em',
    borderColor: '#2C367E',
    borderBottom: 'solid',
    marginLeft: '48%',
    borderBottomColor: '#2C367E',
    color: '#2C367E',
    height: '1em',
    textAlign: 'center',
  },
  buttonGrid: {
    fontSize: '1.5em',
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('/arrow-hover.svg')",
    },
    backgroundImage: "url('/arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '12%',
  },
  articleCarroussel: {
    paddingTop: '2em',
  },
  buttonArticle: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  event: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
    backgroundColor: '#ecedf2',
    backgroundImage: "url('/icons/calendar-home.svg')",
    backgroundSize: '30%',
    backgroundPosition: 'right',
    backgroundPositionY: 'bottom',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: ' 0.5',
  },
}));

const LastActor = (props) => {
  const GET_EVENTS = gql`
    query events($limit: Int, $sort: String, $way: String,$startingDate: String) {
      events(limit: $limit, sort: $sort, way: $way,startingDate: $startingDate) {
        id
        label
        startedAt
        endedAt
        published
        lat
        lng
        address
        city
        dateRule
        entries {
          label
          icon
          collection {
            code
            label
          }
          parentEntry {
            code
            label
            color
            collection {
              code
              label
            }
          }
        }
        actors {
          id
          name
        }
        pictures {
          id
          label
          originalPicturePath
          originalPictureFilename
          position
          logo
          main
        }
      }
    }
  `;
  const [eventToRender, setEventToRender] = useState(null);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const {
    data: eventData,
    loading: loadingEvent,
    error: errorEvent,
  } = useQuery(GET_EVENTS, {
    variables: {
      sort: 'startedAt',
      way: 'ASC',
      startingDate: date.toISOString(),
    },
  });

  useEffect(() => {
    setEventToRender({
      eventData,
    });
  }, [eventData]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = useStyles();
  const maxImageDisplay = !mobile?5:1
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow:
      eventToRender?.eventData && eventToRender.eventData.events.length > maxImageDisplay
        ? maxImageDisplay
        : eventToRender?.eventData && eventToRender.eventData.events.length,
    slidesToScroll: 1,
 //    autoplay: true,
   //  autoplaySpeed: 3000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const compare = (a, b) => {
    let comparison = 0;
    if (a.startedAt > b.startedAt) {
      comparison = 1;
    } else if (a.startedAt < b.startedAt) {
      comparison = -1;
    }
    return comparison;
  };

  const getAllEventsFromRecurringEvent = (event) => {
    let startEventDate = moment(parseInt(event.startedAt));
    const { dateRule } = event;
    const rrule = RRule.fromString(`DTSTART:${startEventDate.format('YYYYMMDD[T]hhmmss[Z]')}\nRRULE:${dateRule}`);

    return rrule.between(new Date(), moment().add(1, 'month').toDate()).map((date) => {
      return {
        ...event,
        startedAt: moment(date).valueOf().toString(),
        duration: rruleToText(rrule),
      };
    });
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
  const events = useMemo(() => {

    const initialEvents = (eventToRender?.eventData?.events || []);
    const recurringEvents = initialEvents.filter((event) => event.dateRule);
  debugger;
    const allRecurringEvents = (  recurringEvents.map((evt) => getAllEventsFromRecurringEvent(evt)));
    const allEvents = initialEvents.filter((event) => !event.dateRule).concat(allRecurringEvents.reduce((acc, items) => acc.concat(items), [])).filter((event) => { return moment(parseInt(event.startedAt)) > moment().startOf('day'); });
    return allEvents;
  }, [eventToRender]);

  
  const sortedEvents = useMemo(() => {
    let localEvents = ([]).slice();
    events?.forEach((event) => {
      if (!sameDay(event.startedAt, event.endedAt)) {
        const nbDayEvent = moment(new Date(parseInt(event.endedAt))).diff(
          moment(new Date(parseInt(event.startedAt))),
          'days',
        );
        if (nbDayEvent >= 1) {
          const newEventForOtherDay = { ...event };
          moment.locale('fr')
          event = Object.assign({ duration: `Du ` + moment(new Date(parseInt(event.startedAt))).format('DD MMMM YYYY') + ` au ` + moment(new Date(parseInt(event.endedAt))).format('DD MMMM YYYY') }, event);

          newEventForOtherDay.duration = `Du ` + moment(new Date(parseInt(event.startedAt))).format('DD MMMM YYYY') + ` au ` + moment(new Date(parseInt(event.endedAt))).format('DD MMMM YYYY')
          newEventForOtherDay.startedAt = moment(
            new Date(parseInt(event.startedAt)),
          )
            .add(nbDayEvent, 'days')
            .toDate();
          localEvents.push(newEventForOtherDay);
        }


      }
      
      localEvents.push(event);
    });
    debugger;
    return localEvents.sort(compare);
  }, [events]);

  return (
    <Container className={[styles.event]} id={props.id}>
      <Typography variant="h5" className={[styles.cardTitle]}>
        LES ÉVÉNEMENTS À VENIR
      </Typography>
      <div className={[styles.border]}/>
      <Slider {...settings} className={[styles.articleCarroussel]}>
        {sortedEvents.map((event,index) => {
            return <CardSliderEvent key={event.id} event={event} />;
          })}
      </Slider>
      <div className={styles.buttonArticle}>
        <Link href="/agenda">
          <button className={styles.buttonGrid}>
            VOIR L'AGENDA COMPLET
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default withApollo()(LastActor);
