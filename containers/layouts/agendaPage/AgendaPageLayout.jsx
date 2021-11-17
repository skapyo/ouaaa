import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { withApollo } from 'hoc/withApollo';
import Events from 'containers/layouts/agendaPage/Events';
import Filters from '../../../components/filters';
import Newsletter from 'containers/layouts/Newsletter';
import { Container, makeStyles, useTheme } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { getImageUrl } from '../../../utils/utils';
import Link from '../../../components/Link';
import Moment from 'react-moment';
import moment from 'moment';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Calendar from '../../../components/Calendar';
import ButtonGroupSelected from '../../../components/buttons/ButtonGroupSelected';
import Drawer from '@material-ui/core/Drawer';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import useMediaQuery from '@material-ui/core/useMediaQuery';

var matchesWindow = false;
if (typeof window !== 'undefined') {
  var L = require('leaflet');
  var Map = require('react-leaflet').Map;
  var TileLayer = require('react-leaflet').TileLayer;
  var Marker = require('react-leaflet').Marker;
  var Popup = require('react-leaflet').Popup;
  var Tooltip = require('react-leaflet').Tooltip;
  var ZoomControl = require('react-leaflet').ZoomControl;
  var MarkerClusterGroup = require('react-leaflet-markercluster').default;
  matchesWindow = window.matchMedia("(max-width: 600px)").matches;
}

const currentDate = new Date();

currentDate.setMonth(9);

const drawerWidth = 310;

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
  drawer: ({ isMenuOpen, isMapMode }) => ({
    width: isMenuOpen ? (isMapMode ? 0 : drawerWidth) : 0,
    flexShrink: 0,
    transition: isMapMode ? null : theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  drawerPaper: {
    position: 'absolute',
    width: drawerWidth,
  },
  filterButton: ({ isMenuOpen }) => ({
    position: 'absolute',
    left: isMenuOpen ? drawerWidth : 20,
    bottom: 20,
    zIndex: 1000,
    borderTopLeftRadius: isMenuOpen ? 0 : 4,
    borderBottomLeftRadius: isMenuOpen ? 0 : 4,
    transition: theme.transitions.create(['left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: 10,
      left: 10,
    }
  }),
  filterButtonIcon: ({ isMenuOpen }) => ({
    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
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


const VIEW_STATE = {
  LIST: 'LIST',
  MAP: 'MAP',
  CALENDAR: 'CALENDAR'
};

const AgendaPageLayout = () => {
  const GET_EVENTS = gql`
    query events($startingDate: String, $entries: [[String]]) {
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
        shortDescription
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
        parentEvent {
          id
          label
        }
      }
    }
    `;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const mapRef = useRef();
  const [viewMode, setViewMode] = useState(VIEW_STATE.LIST);
  const [favorite, setFavorite] = useState(false);
  const [filters, setFilters] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(!matchesWindow);

  const isListMode = useMemo(() => viewMode === VIEW_STATE.LIST, [viewMode, VIEW_STATE]);
  const isMapMode = useMemo(() => viewMode === VIEW_STATE.MAP, [viewMode, VIEW_STATE]);
  const isCalendarMode = useMemo(() => viewMode === VIEW_STATE.CALENDAR, [viewMode, VIEW_STATE]);

  const classes = useStyles({ isMenuOpen, isMapMode });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const date = new Date();
  const position = [46.1085193, -0.9864794];
  const startDateFormat = !matches ? '[ de ]HH[h]mm' : 'HH[h]mm';
  const endDateFormat = !matches ? '[ à ]HH[h]mm' : '[-]HH[h]mm';
  const dayFormat = 'DD MM YYYY';

  let recurrentOptions = null;
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
      { name: 'list', label: 'Liste', onClick: () => setViewMode(VIEW_STATE.LIST) },
      { name: 'map', label: 'Carte', onClick: () => setViewMode(VIEW_STATE.MAP) },
      { name: 'calendar', label: 'Calendrier', onClick: () => setViewMode(VIEW_STATE.CALENDAR) }
    ]
  }, []);

  const events = useMemo(() => {
    return (eventData?.events || []).map(evt => {
      const startDate = moment(parseInt(evt.startedAt));
      const endDate = moment(parseInt(evt.endedAt));

      const duration = Math.ceil(moment.duration(endDate.diff(startDate)).asDays());

      if (false && duration > 2) {
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
        location: evt.city ? [evt.address, evt.city].join(', ') : '',
        backgroundColor: evt.entries && evt.entries.length > 0 && evt.entries[0].parentEntry ? evt.entries[0].parentEntry.color : 'blue',
        ...recurrentOptions
      }
    });
  }, [eventData]);

  function addressCity(event) {
    if (!(event && event !== undefined && typeof event !== 'undefined')) return '';
    if (!event.city) return 'Adresse manquante';
    const list = [event.address, event.city];
    return `${list.join(', ')}`;
  }

  return (
    <Container className={classes.main}>
      <Container className={classes.layout}>
        <ButtonGroupSelected buttons={fabActions} />

        <Drawer
          anchor="left"
          variant={matches ? "temporary" : "persistent"}
          open={isMenuOpen}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={toggleMenu}
          ModalProps={{
            keepMounted: true
          }}
        >
          <Filters
            isEventList
            onFiltersChange={handleFiltersChange}
            isCalendarMode={isCalendarMode}
            closeHandler={toggleMenu}
          />
        </Drawer>

        {
          (!matches || !isMenuOpen) && (
            <Button
              variant="contained"
              className={classes.filterButton}
              onClick={toggleMenu}
              startIcon={<DoubleArrowIcon className={classes.filterButtonIcon} />}
              color="primary"
            >
              Filtres
            </Button>
          )
        }


        {isListMode && (
          <Events data={eventData} loading={loadingEvents} />
        )}

        {isCalendarMode && (
          <Calendar events={events} />
        )}

        {isMapMode && (
          <Grid style={{ width: '100%' }}>
            <Map ref={mapRef} center={position} zoom={11} className={classes.mapContainer}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="topright" />
              <MarkerClusterGroup>
                {typeof eventData !== 'undefined' &&
                  eventData.events.map((event, index) => {
                    let icone;
                    let color;
                    if (event.lat != null && event.lng != null) {
                      if (
                        event.entries &&
                        event.entries.length > 0 &&
                        event.entries[0].icon
                      ) {
                        icone = '/icons/marker/marker_' + event.entries[0].icon + '.svg';
                        color = event.entries[0].color;
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
                        iconSize: [60],
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
                                        a.logo ? -1 : 1,
                                      )[0].originalPicturePath,
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
                                      {!event.duration && (
                                        <>
                                          Le <Moment locale="fr"
                                            format="DD MMMM YYYY" unix>
                                            {event.startedAt / 1000}
                                          </Moment>
                                          <Moment format={startDateFormat} unix>
                                            {event.startedAt / 1000}
                                          </Moment>
                                          <Moment format={endDateFormat} unix>
                                            {event.endedAt / 1000}
                                          </Moment>
                                        </>
                                      )}
                                      {event.duration && (
                                        <>
                                          <span>Du </span>
                                          <Moment locale="fr"
                                            format="DD MMMM YYYY" unix>
                                            {event.startedAt / 1000}
                                          </Moment>
                                          <span> au </span>
                                          <Moment locale="fr"
                                            format="DD MMMM YYYY" unix>
                                            {event.endedAt / 1000}
                                          </Moment>
                                        </>
                                      )}
                                    </Typography>
                                    {event.parentEvent && (
                                      <><span>fait partie de <Link href={`/event/${event.parentEvent.id}`}>{event.parentEvent.label}</Link></span><br /></>
                                    )}
                                    <span>{addressCity(event)}</span>
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
                                        a.logo ? -1 : 1,
                                      )[0].originalPicturePath,
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
                                  <Typography
                                    variant="h6"
                                    component="h2"
                                    className={classes.title}
                                  >
                                    {!event.duration && (
                                      <>
                                        Le <Moment locale="fr"
                                          format="DD MMMM YYYY" unix>
                                          {event.startedAt / 1000}
                                        </Moment>
                                        <Moment format={startDateFormat} unix>
                                          {event.startedAt / 1000}
                                        </Moment>
                                        <Moment format={endDateFormat} unix>
                                          {event.endedAt / 1000}
                                        </Moment>
                                      </>
                                    )}
                                    {event.duration && (
                                      <>
                                        <span>Du </span>
                                        <Moment locale="fr"
                                          format="DD MMMM YYYY" unix>
                                          {event.startedAt / 1000}
                                        </Moment>
                                        <span> au </span>
                                        <Moment locale="fr"
                                          format="DD MMMM YYYY" unix>
                                          {event.endedAt / 1000}
                                        </Moment>
                                      </>
                                    )}
                                  </Typography>
                                  {event.parentEvent && (
                                    <><span>fait partie de <Link href={`/event/${event.parentEvent.id}`}>{event.parentEvent.label}</Link></span><br /></>
                                  )}
                                  <span>{addressCity(event)}</span>
                                </Grid>

                                {false && (<Grid item xs={2}>
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
                                </Grid>)}
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
