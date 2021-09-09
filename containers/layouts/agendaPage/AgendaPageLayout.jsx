import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withApollo } from 'hoc/withApollo';
import Events from 'containers/layouts/agendaPage/Events';
// import Filters from 'containers/layouts/agendaPage/Filters';
import Filters from '../../../components/filters';
import Newsletter from 'containers/layouts/Newsletter';
import { Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Fab from '@material-ui/core/Fab';
import { getImageUrl } from '../../../utils/utils';
import Link from '../../../components/Link';
import Moment from 'react-moment';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ViewListIcon from '@material-ui/icons/ViewList';
import RoomIcon from '@material-ui/icons/Room';

if (typeof window !== 'undefined') {
  var L = require('leaflet');
  var Map = require('react-leaflet').Map;
  var TileLayer = require('react-leaflet').TileLayer;
  var Marker = require('react-leaflet').Marker;
  var Popup = require('react-leaflet').Popup;
  var Tooltip = require('react-leaflet').Tooltip;
  var MarkerClusterGroup = require('react-leaflet-markercluster').default;
}

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
  listButton: {
    position: 'absolute',
    bottom: 10,
    zIndex: 10000,
    color: '#fff',
    backgroundColor: '#2C367E',
    '&:hover': {
      color: '#2C367E',
      backgroundColor: '#fff',
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

const categories = {
  Sujets: [],
};

const otherCategories = {
  "Territoire d'actions": [],
  "Statut d'acteur": [],
  'Public visé': [],
  'Collectif & réseaux': [],
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
        }
      }
    }
    `;

  const classes = useStyles();
  const mapRef = useRef();
  const [isListMode, setIsListMode] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [categoriesChecked, setCategoriesChecked] = useState(categories.Sujets);
  const [otherCategoriesChecked, setOtherCategoriesChecked] = useState(
    otherCategories
  );
  const [postCode, setPostCode] = useState(null);
  const [filters, setFilters] = useState(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const date = new Date();
  const position = [46.1085193, -0.9864794];

  const switchMode = useCallback(() => {
    setIsListMode(!isListMode);
  }, [isListMode]);

  date.setHours(0, 0, 0, 0);

  const { data: eventData, loading: loadingEvents, error, refetch } = useQuery(GET_EVENTS, {
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

  return (
    <Container className={classes.main}>
      <Container className={classes.layout}>
        <Fab
          variant="extended"
          size="large"
          aria-label="add"
          className={classes.listButton}
          onClick={switchMode}
        >
          {
            isListMode ?
              <RoomIcon className={classes.listButtonIcon} /> :
              <ViewListIcon className={classes.listButtonIcon} />
          }
          <span>{isListMode ? 'Voir la Carte' : 'Voir la Liste'}</span>
        </Fab>

        <Filters
          isEventList
          onFiltersChange={handleFiltersChange}
        />

        {isListMode && (
          <Events data={eventData} loading={loadingEvents} />
        )}

        {!isListMode && (
          <Grid item xs={10} style={{ width: '100%' }}>
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
