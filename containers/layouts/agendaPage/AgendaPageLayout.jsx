import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import { withApollo } from 'hoc/withApollo';
import Events from 'containers/layouts/agendaPage/Events';
import Filters from 'containers/layouts/agendaPage/Filters';
import Newsletter from 'containers/layouts/Newsletter';
import { Container, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Fab from '@material-ui/core/Fab';
import { getImageUrl } from '../../../utils/utils';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Link from '../../../components/Link';
import Moment from "react-moment";
if (typeof window !== 'undefined') {
  var L = require("leaflet");
  var Map = require('react-leaflet').Map;
  var TileLayer = require('react-leaflet').TileLayer;
  var Marker = require('react-leaflet').Marker;
  var Popup = require('react-leaflet').Popup;
  var Tooltip = require('react-leaflet').Tooltip;
  var MarkerClusterGroup =require('react-leaflet-markercluster').default;
}
const useStyles = makeStyles({
  main: {
    padding: '0',
    margin: '0',
  },
  layout: {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#F6F6F6',
    padding: '50px 0',
    margin: '0',
    width: '100%',
    maxWidth: 'none',
  },
  listButton: {
    marginTop: '-5em',
    zIndex: '10000',
    color: '#fff',
    backgroundColor: '#bf083e',
    '&:hover': {
      color: '#bf083e',
      backgroundColor: '#fff',
    },
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
    color: '#2a9076',
    width: '100%',
  },
  buttonGrid: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#bf083e',
    border: 'none',
    fontFamily: 'rowdies',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#bf083e',
      'background-color': 'white',
      border: '2px solid #bf083e',
      backgroundImage: 'url(\'./arrow-hover.svg\')',
    },
    backgroundImage: 'url(\'./arrow.svg\')',
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

});

const AgendaPageLayout = () => {
  const GET_EVENTS = gql`
    query events($startingDate:String,$categories:[String]) {
      events (startingDate:$startingDate,categories:$categories) {
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
        pictures{
          id,
          label,
          originalPicturePath,
          originalPictureFilename,
          croppedPicturePath,
          croppedPictureFilename,
          croppedX,
          croppedY,
          croppedZoom,
          croppedRotation,
          position
        }

      }
    } 
  `;

  const date = new Date();

  const mapRef = useRef();

  const [listMode, setListMode] = useState(true);

  const position = [46.1085193, -0.9864794];

  const [favorite, setFavorite] = useState(false);

  const switchMode = useCallback(() => {
    setListMode(!listMode);
  }, [listMode]);

  date.setHours(0, 0, 0, 0);

 

  const classes = useStyles();
  const {
    data: eventData, loading, error, refetch,
  } = useQuery(
    GET_EVENTS, {
      variables: {
        startingDate: date.toISOString(),
      },
    },
  );
  if (typeof window !== 'undefined') {
    L.Icon.Default.mergeOptions({
      iconUrl: null,
    });
  }
  return (
    <Container className={classes.main}>
      <Container className={classes.layout}>
        <Filters refetch={refetch} />

        {listMode && eventData && eventData.events
          && <Events data={eventData} />}
          
          { !listMode && <Grid item xs={10}>
            <Map ref={mapRef} center={position} zoom={11}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup>
                {typeof eventData !== 'undefined' && eventData.events.map((event, index) => {
                  let icone;
                  let color;
                  if (event.lat != null && event.lng != null) {
                    if (event.categories && event.categories.length > 0 && event.categories[0].icon) {
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
                            key={`marker-${index}`} position={[event.lat, event.lng]}
                            icon={suitcasePoint}
                            >
                            <Tooltip>
                                <div className={classes.image} style={{ backgroundImage: event.pictures.length >= 1 ? `url(${getImageUrl(event.pictures.sort((a, b) => (a.position > b.position ? 1 : -1))[0].croppedPicturePath)})` : '' }}>
                                    <div className={classes.categorie}>
                                        <Typography className={classes.categorie} gutterBottom>
                                            {event.categories && event.categories.length > 0 && event.categories[0].label}
                                          </Typography>
                                      </div>
                                  </div>
                                <div className={classes.content}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <div className={classes.titleDiv}>
                                              <Typography
                                                  variant="h6" component="h2"
                                                  className={classes.title}
                                              >
                                                {event && event.label}
                                              </Typography>
                                                <Typography
                                                variant="h6" component="h2"
                                                className={classes.title}
                                              >
                                                  De
                                                  <Moment format=" HH" unix>{event.startedAt / 1000}</Moment>
                                                  h
                                                  <Moment format="mm " unix>{event.startedAt / 1000}</Moment>
                                                  à
                                                  <Moment format=" HH" unix>{event.endedAt / 1000}</Moment>
                                                  h
                                                  <Moment format="mm " unix>{event.endedAt / 1000}</Moment>
                                              </Typography>
                                              </div>
                                          </Grid>

                                      </Grid>

                                    <Typography component="p">
                                        {event && event.short_description}
                                      </Typography>
                                  </div>

                              </Tooltip>
                            <Popup>

                                <div className={classes.image} style={{ backgroundImage: event.pictures.length >= 1 ? `url(${getImageUrl(event.pictures.sort((a, b) => (a.position > b.position ? 1 : -1))[0].croppedPicturePath)})` : '' }}>
                                    <div className={classes.categorie}>
                                        <Typography className={classes.categorie} gutterBottom>
                                            {event.categories && event.categories.length > 0 && event.categories[0].label}
                                          </Typography>
                                      </div>
                                  </div>
                                <div className={classes.content}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <div className={classes.titleDiv}>
                                                <Typography
                                                variant="h6" component="h2"
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
                                        {event && event.short_description}
                                      </Typography>
                                  </div>
                                <Link href={`/event/${event.id}`}>
                                    <button className={classes.buttonGrid}>EN SAVOIR PLUS</button>
                                  </Link>

                              </Popup>
                          </Marker>);
                  }
                })}
              </MarkerClusterGroup>
                
            </Map>
          </Grid>
          }
           
      </Container>
      <Grid container justify = "center">
            <Fab variant="extended"size="medium"  aria-label="add" className={classes.listButton} onClick={switchMode} >
              { !listMode && ( <span>Liste</span> ) }  { listMode && ( <span>Carte</span> ) }
            </Fab>
          </Grid>
      <Newsletter />
    </Container>
  );
  
         
};

export default withApollo()(AgendaPageLayout);
