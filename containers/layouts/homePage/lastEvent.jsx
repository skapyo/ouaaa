import { Container, Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick/lib';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withApollo } from '../../../hoc/withApollo';
import CardSliderEvent from '../../../components/cards/CardSliderEvent';
import Link from '../../../components/Link';


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
      limit: 4,
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
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Container className={[styles.event]} id={props.id}>
      <Typography variant="h5" className={[styles.cardTitle]}>
        LES ÉVÉNEMENTS À VENIR
      </Typography>
      <div className={[styles.border]}/>
      <Slider {...settings} className={[styles.articleCarroussel]}>
        {eventToRender?.eventData &&
          eventToRender.eventData.events.map((event) => {
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
