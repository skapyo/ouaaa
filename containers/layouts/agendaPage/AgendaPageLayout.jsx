import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withApollo } from 'hoc/withApollo';
import Events from 'containers/layouts/agendaPage/Events';
import Filters from '../../../components/filters';
import Newsletter from 'containers/layouts/Newsletter';
import { Container, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { getImageUrl } from '../../../utils/utils';
import Link from '../../../components/Link';
import Moment from 'react-moment';
import moment from 'moment';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { useRouter } from 'next/router'

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ViewListIcon from '@material-ui/icons/ViewList';
import RoomIcon from '@material-ui/icons/Room';
import TodayIcon from '@material-ui/icons/Today';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';

if (typeof window !== 'undefined') {
  var L = require('leaflet');
  var Map = require('react-leaflet').Map;
  var TileLayer = require('react-leaflet').TileLayer;
  var Marker = require('react-leaflet').Marker;
  var Popup = require('react-leaflet').Popup;
  var Tooltip = require('react-leaflet').Tooltip;
  var MarkerClusterGroup = require('react-leaflet-markercluster').default;
}

const currentDate = new Date();

currentDate.setMonth(9);

const useStyles = makeStyles(theme => ({
  main: {
    padding: '0',
    margin: '0',
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding: '0',
    margin: '0',
    width: '100%',
    maxWidth: 'none',
    position: 'relative',
    overflow: 'hidden',
    height: '88vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto'
    }
  },
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    [theme.breakpoints.down('sm')]: {
      bottom: 10,
      right: 10
    }
  },
  listButtonIcon: {
    marginRight: 10
  },
  image: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    textAlign: 'inherit',
    height: '10em',
  },
  categorie: {
    backgroundColor: 'white',
    borderRadius: '0.3em',
    color: '#f0a300',
    width: 'max-content',
    padding: '0 5px 0 5px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  title: {
    textAlign: 'left',
    color: '#2C367E',
    width: '100%',
  },
  buttonGrid: {
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
      backgroundImage: "url('./arrow-hover.svg')",
    },
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '14%',
  },
  favorite: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  favoriteIcon: {
    color: '#AD2740',
  },
  mapContainer: {
    height: '88vh',
    [theme.breakpoints.down('sm')]: {
      height: '80vh'
    }
  }
}));

const useCalendarStyles = makeStyles(theme => ({
  layout: {
    height: '100%',
    '& > *:only-child': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& > *:last-child': {
        flex: 1,
        '& table': {
          height: '100%'
        }
      }
    }
  }
}));

const MonthLayout = props => {
  const classes = useCalendarStyles();
  return <MonthView.Layout {...props} className={classes.layout} />
};

const Appointment = props => {
  const { data } = props;
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/event/' + data.id);
  }, [router, data]);

  return <Appointments.Appointment {...props} style={{ backgroundColor: data?.backgroundColor }} onClick={handleClick} />
};

const CalendarView = props => {
  const { data } = props;

  const events = useMemo(() => {
    return (data?.events || []).map(evt => {
      const startDate = moment(parseInt(evt.startedAt));
      const endDate = moment(parseInt(evt.endedAt));

      let recurrentOptions = null;
      const duration = Math.ceil(moment.duration(endDate.diff(startDate)).asDays());

      if (duration > 2) {
        recurrentOptions = {
          endDate: startDate.endOf('day'),
          rRule: `FREQ=DAILY;COUNT=${duration}`
        };
      }

      return {
        startDate: new Date(parseInt(evt.startedAt)),
        endDate: new Date(parseInt(evt.endedAt)),
        title: evt.label,
        id: evt.id,
        backgroundColor: evt.entries && evt.entries.length > 0 ? evt.entries[0].color : 'blue',
        ...recurrentOptions
      }
    });
  }, [data]);

  return (
    <Scheduler
      firstDayOfWeek={1}
      locale="fr-FR"
      RootProps={{
        height: 'auto'
      }}
      data={events}
    >
      <ViewState
        defaultCurrentDate={currentDate}
      />
      <Toolbar />
      <DateNavigator />
      <TodayButton messages={{ today: "Aujourd'hui" }} />
      <MonthView
        layoutComponent={MonthLayout}
      />
      <Appointments
        appointmentComponent={Appointment}
      />
    </Scheduler>
  );
};

const VIEW_STATE = {
  LIST: 'LIST',
  MAP: 'MAP',
  CALENDAR: 'CALENDAR'
};

const AgendaPageLayout = () => {
  const GET_EVENTS = gql`
    query events($startingDate: String, $entries: [String]) {
      events(startingDate: $startingDate, entries: $entries) {
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
          id
          code
          label
          color
          icon
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
          croppedPicturePath
          croppedPictureFilename
          croppedX
          croppedY
          croppedZoom
          croppedRotation
          position
          logo
          main
        }
      }
    }
    `;

  const classes = useStyles();
  const mapRef = useRef();
  const [viewMode, setViewMode] = useState(VIEW_STATE.LIST);
  const [openFAB, setOpenFAB] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [filters, setFilters] = useState(null);

  const date = new Date();
  const position = [46.1085193, -0.9864794];

  date.setHours(0, 0, 0, 0);

  const { data: eventData, loading: loadingEvents, refetch } = useQuery(GET_EVENTS, {
    variables: {
      startingDate: date.toISOString(),
    },
  });

  if (typeof window !== 'undefined') {
    L.Icon.Default.mergeOptions({
      iconUrl: null,
    });
  }

  const handleFiltersChange = useCallback(newFilters => {
    setFilters(newFilters);
    refetch({ ...newFilters });
  }, [refetch]);

  const fabActions = useMemo(() => {
    return [
      { name: 'list', label: 'Liste', icon: <ViewListIcon />, onClick: () => setViewMode(VIEW_STATE.LIST) },
      { name: 'map', label: 'Carte', icon: <RoomIcon />, onClick: () => setViewMode(VIEW_STATE.MAP) },
      { name: 'calendar', label: 'Calendrier', icon: <TodayIcon />, onClick: () => setViewMode(VIEW_STATE.CALENDAR) }
    ]
  }, []);

  const isListMode = useMemo(() => viewMode === VIEW_STATE.LIST, [viewMode, VIEW_STATE]);
  const isMapMode = useMemo(() => viewMode === VIEW_STATE.MAP, [viewMode, VIEW_STATE]);
  const isCalendarMode = useMemo(() => viewMode === VIEW_STATE.CALENDAR, [viewMode, VIEW_STATE]);

  return (
    <Container className={classes.main}>
      <Container className={classes.layout}>
        <Filters
          isEventList
          onFiltersChange={handleFiltersChange}
          isCalendarMode={isCalendarMode}
        />

        <SpeedDial
          ariaLabel="fab-actions"
          className={classes.fab}
          icon={<SpeedDialIcon />}
          onClose={() => setOpenFAB(false)}
          onOpen={() => setOpenFAB(true)}
          open={openFAB}
          direction="up"
        >
          {fabActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.label}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>

        {isListMode && (
          <Events data={eventData} loading={loadingEvents} />
        )}

        {isCalendarMode && (
          <CalendarView data={eventData} />
        )}

        {isMapMode && (
          <Grid style={{ width: '100%' }}>
            <Map ref={mapRef} center={position} zoom={11} className={classes.mapContainer}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup>
                {typeof eventData !== 'undefined' &&
                  eventData.events.map((event, index) => {
                    let icone;
                    let color;
                    if (event.lat != null && event.lng != null) {
                      if (
                        event.categories &&
                        event.categories.length > 0 &&
                        event.categories[0].icon
                      ) {
                        icone = `/icons/${event.categories[0].icon}.svg`;
                        color = event.categories[0].color;
                      } else {
                        icone = '/icons/' + 'place' + '.svg';
                        color = 'black';
                      }
                      const markerHtmlStyles = 'background-color: red';
                      const suitcasePoint = new L.Icon({
                        iconUrl: icone,
                        color,
                        fillColor: color,
                        iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
                        iconSize: [25],
                        popupAnchor: [1, -25],
                        html: `<span style="${markerHtmlStyles}" />`,
                      });
                      return (
                        <Marker
                          key={`marker-${index}`}
                          position={[event.lat, event.lng]}
                          icon={suitcasePoint}
                        >
                          <Tooltip>
                            <div
                              className={classes.image}
                              style={{
                                backgroundImage:
                                  event.pictures.length >= 1
                                    ? `url(${getImageUrl(
                                      event.pictures.sort((a, b) =>
                                        a.position > b.position ? 1 : -1,
                                      )[0].croppedPicturePath,
                                    )})`
                                    : '',
                              }}
                            >
                              <div className={classes.categorie}>
                                <Typography
                                  className={classes.categorie}
                                  gutterBottom
                                >
                                  {event.categories &&
                                    event.categories.length > 0 &&
                                    event.categories[0].label}
                                </Typography>
                              </div>
                            </div>
                            <div className={classes.content}>
                              <Grid container>
                                <Grid item xs={10}>
                                  <div className={classes.titleDiv}>
                                    <Typography
                                      variant="h6"
                                      component="h2"
                                      className={classes.title}
                                    >
                                      {event && event.label}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      component="h2"
                                      className={classes.title}
                                    >
                                      De
                                      <Moment format=" HH" unix>
                                        {event.startedAt / 1000}
                                      </Moment>
                                      h
                                      <Moment format="mm " unix>
                                        {event.startedAt / 1000}
                                      </Moment>
                                      à
                                      <Moment format=" HH" unix>
                                        {event.endedAt / 1000}
                                      </Moment>
                                      h
                                      <Moment format="mm " unix>
                                        {event.endedAt / 1000}
                                      </Moment>
                                    </Typography>
                                  </div>
                                </Grid>
                              </Grid>

                              <Typography component="p">
                                {event && event.shortDescription}
                              </Typography>
                            </div>
                          </Tooltip>
                          <Popup>
                            <div
                              className={classes.image}
                              style={{
                                backgroundImage:
                                  event.pictures.length >= 1
                                    ? `url(${getImageUrl(
                                      event.pictures.sort((a, b) =>
                                        a.position > b.position ? 1 : -1,
                                      )[0].croppedPicturePath,
                                    )})`
                                    : '',
                              }}
                            >
                              <div className={classes.categorie}>
                                <Typography
                                  className={classes.categorie}
                                  gutterBottom
                                >
                                  {event.categories &&
                                    event.categories.length > 0 &&
                                    event.categories[0].label}
                                </Typography>
                              </div>
                            </div>
                            <div className={classes.content}>
                              <Grid container>
                                <Grid item xs={10}>
                                  <div className={classes.titleDiv}>
                                    <Typography
                                      variant="h6"
                                      component="h2"
                                      className={classes.title}
                                    >
                                      {event && event.label}
                                    </Typography>
                                  </div>
                                </Grid>

                                <Grid item xs={2}>
                                  <div
                                    className={classes.favorite}
                                    onClick={() => setFavorite(!favorite)}
                                  >
                                    {!favorite && (
                                      <FavoriteBorderRoundedIcon
                                        className={classes.favoriteIcon}
                                      />
                                    )}
                                    {favorite && (
                                      <FavoriteRoundedIcon
                                        className={classes.favoriteIcon}
                                      />
                                    )}
                                  </div>
                                </Grid>
                              </Grid>

                              <Typography component="p">
                                {event && event.shortDescription}
                              </Typography>
                            </div>
                            <Link href={`/event/${event.id}`}>
                              <button className={classes.buttonGrid}>
                                EN SAVOIR PLUS
                              </button>
                            </Link>
                          </Popup>
                        </Marker>
                      );
                    }
                  })}
              </MarkerClusterGroup>
            </Map>
          </Grid>
        )}
      </Container>
      <Newsletter />
    </Container>
  );
};

export default withApollo()(AgendaPageLayout);
