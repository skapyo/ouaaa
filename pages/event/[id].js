import React, { useEffect, useState, useRef } from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import { withApollo } from 'hoc/withApollo.jsx';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Place from '@material-ui/icons/Place';
import Schedule from '@material-ui/icons/Schedule';
import Slider from 'react-slick/lib';
import CardSliderActor from 'components/cards/CardSliderActor';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Euro from '@material-ui/icons/Euro';
import LocalOffer from '@material-ui/icons/LocalOffer';

import Moment from 'react-moment';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'components/Link';
import { getImageUrl, entriesHasElementWithCode } from '../../utils/utils';

import { useSessionState } from '../../context/session/session';
import Newsletter from '../../containers/layouts/Newsletter';

if (typeof window !== 'undefined') {
  var L = require('leaflet');
  var Map = require('react-leaflet').Map;
  var TileLayer = require('react-leaflet').TileLayer;
  var Marker = require('react-leaflet').Marker;
  var Popup = require('react-leaflet').Popup;
}

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: theme.spacing(2),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '24em',
    color: 'white',
    'text-align': 'center',
    padding: '3em',
  },
  align: {
    'text-align': 'center',
  },
  cardInfo: {
    padding: '5em',
    backgroundColor: 'white',
    backgroundImage: "url('/icons/planet.svg')",
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: ' 0.5',
    //  backgroundImage:`url('./fond.png')`,
    borderRadius: '0.5em',
    width: '80%',
    justify: 'center',
    alignItems: 'center',
    'max-width': '755px',
    'margin-top': '-53px',
    'box-shadow': '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
    },
  },
  map: {
    height: '30em',
    width: '30em',
  },
  actorName: {
    width: '100%',
  },
  cardTitleCategories: {
    color: theme.typography.h5.color,
  },
  infoPratiqueGrid: {
    textAlign: 'center',
    backgroundColor: '#ededf5',
  },
  infoPratiqueTitle: {
    fontWeight: '900',
    color: '#2C367E',
    width: '100%',
    padding: '1em',
  },
  infoPratiqueItem: {},
  alignLeft: {
    textAlign: 'left',
    padding: '1em',
  },
  alignRight: {
    textAlign: 'right',
    padding: '1em',
  },
  border: {
    width: '3em',
    borderColor: '#2C367E',
    borderBottom: 'solid',
    borderBottomColor: '#2C367E',
    color: '#2C367E',
    height: '1em',
  },
  iconEntry: {
    height: '20px',
    marginRight: '0.5em',
    marginLeft: '0.5em',
  },

  item: {
    border: '1px solid #2C367E',
    borderWidth: ' 1px 0px 1px 0px ',
    borderStyle: 'dashed',
  },
  icon: {
    color: '#bd0b3d',
    width: '20px',
  },
  img: {
    padding: '1em',
    maxHeight: '200px',
    width: 'inherit!important',
  },
  image: {
    height: '72px',
    width: '72px',
    margin: '0 auto',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      borderRadius: '50%',
    },
  },
  infoValue: {
    color: theme.typography.h5.color,
    fontWeight: 700,
  },
  infoLabel: {
    color: theme.typography.h5.color,
  },
  descriptionInfoLabel: {
    display: 'inline-block',
    fontWeight: 700,
    margin: '0.5em',
  },
  descriptionInfoValue: {
    display: 'inline-block',
  },
  button: {
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
    },
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '11%',
    fontSize: '1em',
  },
  buttonInverse: {
    margin: '2.5em 0 2.5em 0 ',
    border: '2px solid #2C367E',
    color: '#2C367E',
    'background-color': 'white',

    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'line-through',
      color: 'white',
      'background-color': '#2C367E',
    },
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '11%',
    fontSize: '1em',
  },
  buttonParticipate: {
    paddingTop: '1em',
    paddingBottom: '1em',
    textAlign: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: '1400',
    backgroundColor: '#2C367E',
    color: 'white',
    '&:hover': {
      color: '#2C367E',
    },
  },
}));

const Event = () => {
  const router = useRouter();
  const mapRef = useRef();

  const { id } = router.query;

  const GET_EVENT = gql`
    query event($id: String) {
      event(id: $id) {
        id
        label
        description
        lat
        lng
        address
        city
        startedAt
        endedAt
        registerLink
        practicalInfo
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
          address
          lat
          lng
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
        participants {
          id
          surname
          lastname
        }
        referents {
          id
          surname
          lastname
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
  const ADD_EVENT_PARTICIPATE = gql`
    mutation addEventParticipate($eventId: Int!, $userId: Int!) {
      addEventParticipate(eventId: $eventId, userId: $userId)
    }
  `;
  const REMOVE_EVENT_PARTICIPATE = gql`
    mutation removeEventParticipate($eventId: Int!, $userId: Int!) {
      removeEventParticipate(eventId: $eventId, userId: $userId)
    }
  `;
  const { data, loading, error, refetch } = useQuery(GET_EVENT, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-first',
  });

  const [stylesProps, setStylesProps] = useState({
    topImageSize: '250px',
    headerDisplay: 'static',
  });

  const [
    addParticipate,
    {
      data: participateData,
      loading: participateLoading,
      error: participateError,
    },
  ] = useMutation(ADD_EVENT_PARTICIPATE);
  const [
    removeParticipate,
    {
      data: removeparticipateData,
      loading: removeparticipateLoading,
      error: removeparticipateError,
    },
  ] = useMutation(REMOVE_EVENT_PARTICIPATE);

  useEffect(() => {
    if (participateData !== undefined) {
      enqueueSnackbar('Participation prise en compte', {
        preventDuplicate: true,
      });
      refetch();
    }
  }, [participateData]);

  useEffect(() => {
    if (removeparticipateData !== undefined) {
      enqueueSnackbar('Participation retiré', {
        preventDuplicate: true,
      });
      refetch();
    }
  }, [removeparticipateData]);

  const user = useSessionState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function containUser(list) {
    let isContained = false;
    if (user !== null) {
      list.forEach((element) => {
        if (element.id == user.id) {
          isContained = true;
        }
      });
    }
    return isContained;
  }

  const addParticipateHandler = () => {
    if (user == null) {
      setCookie('redirect_url', router.asPath, {
        path: `/event/${data.event.id}`,
      });
      enqueueSnackbar("Veuillez vous connecter pour participer à l'événement", {
        preventDuplicate: true,
      });
    } else {
      addParticipate({
        variables: {
          eventId: parseInt(data && data.event.id),
          userId: parseInt(user.id),
        },
      });
    }
  };

  const removeParticipateHandler = () => {
    removeParticipate({
      variables: {
        eventId: parseInt(data && data.event.id),
        userId: parseInt(user.id),
      },
    });
  };

  const styles = useStyles(stylesProps);

  const settingsSliderevent = {
    infinite: true,
    slidesToShow:
      data && data.event.actors.length > 5
        ? 5
        : data && data.event.actors.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settingsSliderImage = {
    infinite: true,
    slidesToShow:
      data && data.event.pictures && data.event.pictures.length > 3
        ? 3
        : data && data.event.pictures && data.event.pictures.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
  function showCategory(entries) {
    let text = '';
    entries.forEach((entry) => {
      if (
        entry.parentEntry &&
        entry.parentEntry.collection &&
        entry.parentEntry.collection.code === 'category'
      ) {
        text += `${entry.parentEntry.label} : ${entry.label}  `;
      }
    });
    return text;
  }
  return (
    <AppLayout>
      <Head>
        <title>
          {/* @ts-ignore */}
          {data && data.event.label}-{/* @ts-ignore */}
          {data && data.event.city}
          {/* @ts-ignore */}-{/* @ts-ignore */}
          {data && showCategory(data.event.entries)}
        </title>
      </Head>
      <RootRef>
        <Box>
          {data && data.event && (
            <Container
              className={styles.titleContainer}
              style={{
                backgroundImage:
                  data && data.event && data.event.pictures.length >= 1
                    ? `url(${getImageUrl(
                        data.event.pictures.sort((a, b) =>
                          a.position > b.position ? 1 : -1,
                        )[0].croppedPicturePath,
                      )})`
                    : '',
              }}
            />
          )}
          <Container className={styles.cardInfo}>
            <Grid container>
              <Grid item md={5} sm={10} className={[styles.align]}>
                <Grid container className={[styles.infoPratiqueGrid]}>
                <div className={styles.image}>
                    {data && data.event.pictures.length >= 1 && (
                      <img
                        src={
                          data.event.pictures.length >= 1
                            ? getImageUrl(
                              data.event.pictures.sort((a, b) => (a.logo ? -1 : 1) - (b.logo ? -1 : 1))[0].croppedPicturePath,
                            )
                            : ''
                        }
                      />
                    )}
                  </div>
                  <Typography variant="h2" className={styles.cardTitle, styles.actorName}>
                    {data && data.event.name}
                  </Typography>
                  {data
                /*  &&  entriesHasElementWithCode(
                    data.event.entries,
                    'event_type',) */
                  && (
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <LocalOffer className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>TYPE</div>
                        <span className={[styles.infoValue]}>
                          {data &&
                            data.event.entries.map(
                              (entry) =>
                                entry &&
                                entry.parentEntry &&
                                entry.parentEntry.collection &&
                                entry.parentEntry.collection.code ===
                                  'event_type' && (
                                  <div>
                                    <Typography
                                      variant="h7"
                                      className={styles.cardTitleCategories}
                                    >
                                      {`${entry && entry.parentEntry.label} : ${
                                        entry && entry.label
                                      }`}
                                    </Typography>
                                  </div>
                                ),
                            )}
                        </span>
                      </Grid>
                    </Grid>
                  )}
                  {data
                  && entriesHasElementWithCode(
                    data.event.entries,
                    'event_public_target',
                  ) && (
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <img src={"/icons/public.svg"} alt="Collectif & réseau" className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Public cible</div>
                        <span className={[styles.infoValue]}>
                          {data &&
                            data.event.entries.map(
                              (entry) =>
                                entry &&
                                entry.collection &&
                                entry.collection.code ===
                                  'event_public_target' && (
                                  <div>
                                    <Typography
                                      variant="h7"
                                      className={styles.cardTitleCategories}
                                    >
                                      {` ${entry && entry.label}`}
                                    </Typography>
                                  </div>
                                ),
                            )}
                        </span>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                      <img src={"/icons/location.svg"} alt="Localisation" className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>LOCALISATION</div>
                        <span className={[styles.infoValue]}>
                          {data && !data.event.city && (
                            <span> Adresse manquante</span>
                          )}
                          {data && !data.event.address && data.event.city && (
                            <span>
                              {/* @ts-ignore */}
                              {data && data.event.city}
                            </span>
                          )}
                          {data && data.event.address && data.event.city && (
                            <span>
                              {/* @ts-ignore */}
                              {data && data.event.address},{/* @ts-ignore */}
                              {data.event.city}
                            </span>
                          )}
                        </span>
                      </Grid>
                    </Grid>
                  {data && data.event.socialNetwork && (
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <img src={"/icons/social.svg"} alt="Réseau social" className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <span className={[styles.infoValue]}>
                          <a
                            href={data && data.event.facebookUrl}
                            target="_blank"
                            className={[styles.infoLabel]}
                          >
                            Réseau social
                          </a>
                        </span>
                      </Grid>
                    </Grid>
                  )}
                  {data && data.event.openingHours && data.event.openingHours.length !== 0 && (
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                      <img src={"/icons/clock.svg"} alt="Horaire" className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Date de début</div>
                        <span className={[styles.infoValue]}>
                          <Moment format=" DD/MM HH:mm" unix>
                            {data && data.event.startedAt / 1000}
                          </Moment>
                        </span>
                        <div className={[styles.infoLabel]}>Date de fin</div>
                        <span className={[styles.infoValue]}>
                          <Moment format=" DD/MM HH:mm" unix>
                            {data && data.event.endedAt / 1000}
                          </Moment>
                        </span>
                      </Grid>
                    </Grid>
                  )}
                  {data
                  && entriesHasElementWithCode(
                    data.event.entries,
                    'event_price',
                  ) && (
                  <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <Euro className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Tarif</div>
                        <span className={[styles.infoValue]}>
                          {data &&
                            data.event.entries.map(
                              (entry) =>
                                entry &&
                                entry.collection &&
                                entry.collection.code === 'event_price' && (
                                  <div>
                                    <Typography
                                      variant="h7"
                                      className={styles.cardTitleCategories}
                                    >
                                      {` ${entry && entry.label}`}
                                    </Typography>
                                  </div>
                                ),
                            )}
                        </span>
                      </Grid>
                    </Grid>
                  )}
                  </Grid>
                  
                </Grid>
              <br />
              <Grid item md={7} sm={10} className={styles.description}>
                <Typography variant="h3" className={styles.cardTitle}>
                  DESCRIPTION
                </Typography>
                <div className={styles.border} />
                <br />
                <br />
                <Typography variant="h2">
                  {data && data.event.name}
                </Typography>
                <br />
                <p>{data && Parser(data.event.description)}</p>
                <div>
                  {data
                    && data.event.entries.map(
                      (entry) => entry.parentEntry
                        && entry.parentEntry.collection.code === 'category' && (
                          <div>
                            <Typography
                              variant="h7"
                              className={styles.cardTitleCategories}
                            >
                              {/* @ts-ignore */}
                              {` ${entry.parentEntry && entry.parentEntry.label
                              } `}
                              {/* @ts-ignore */}
                              :
                              { entry.icon && (
                              <img src={`/icons/${entry.icon}.svg`} alt="icon" className={styles.iconEntry} />
                              )}
                              {/* @ts-ignore */}
                              {` ${entry && entry.label}`}
                              {/* @ts-ignore */}
                            </Typography>
                          </div>
                      ),
                    )}
                </div>
                <br />
                {data
                  && entriesHasElementWithCode(
                    data.event.entries,
                    'actor_status',
                  ) && (
                    <div className={[styles.descriptionInfoDiv]}>
                      <img src="/icons/status.svg" alt="Collectif & réseau" className={[styles.icon]} />
                      <div className={[styles.descriptionInfoLabel]}> Statut :</div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.event.entries.map(
                            (entry) => entry
                              && entry.collection
                              && entry.collection.code
                              === 'actor_status' && (
                                <div>
                                  <Typography
                                    variant="h7"
                                    className={styles.cardTitleCategories}
                                  >
                                    {`  ${entry && entry.label}`}
                                  </Typography>
                                </div>
                            ),
                          )}
                      </span>
                    </div>
                )}
                {data
                  && entriesHasElementWithCode(
                    data.event.entries,
                    'public_target',
                  ) && (
                    <div className={[styles.descriptionInfoDiv]}>

                      <img src="/icons/public.svg" alt="Collectif & réseau" className={[styles.icon]} />
                      <div className={[styles.descriptionInfoLabel]}>
                        Public principal visé
                      </div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.event.entries.map(
                            (entry) => entry
                              && entry.collection
                              && entry.collection.code
                              === 'public_target' && (
                                <div>
                                  <Typography
                                    variant="h7"
                                    className={styles.cardTitleCategories}
                                  >
                                    {` ${entry && entry.label}`}
                                  </Typography>
                                </div>
                            ),
                          )}
                      </span>
                    </div>
                )}
                {data
                  && entriesHasElementWithCode(
                    data.event.entries,
                    'collectif',
                  ) && (
                    <div className={[styles.descriptionInfoDiv]}>
                      <img src="/icons/network.svg" alt="Collectif & réseau" className={[styles.icon]} />
                      <div className={[styles.descriptionInfoLabel]}>
                        Collectif & réseaux
                      </div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.event.entries.map(
                            (entry) => entry
                              && entry.collection
                              && entry.collection.code === 'collectif' && (
                                <div>
                                  <Typography
                                    variant="h7"
                                    className={styles.cardTitleCategories}
                                  >
                                    {` ${entry && entry.label}`}
                                  </Typography>
                                </div>
                            ),
                          )}
                      </span>
                    </div>
                )}
              
              <div />
              <br />
              <Typography variant="h3" className={styles.cardTitle}>
                ACCES
              </Typography>
              <div className={styles.border} />
              <br />

              {data && (
                <Map ref={mapRef} center={[data.event.lat, data.event.lng]} zoom={11} className={styles.map}  >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[data.event.lat, data.event.lng]}
                    icon={new L.Icon({
                      iconUrl: '/icons/location.svg',
                      iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
                      iconSize: [25],
                      popupAnchor: [1, -25],
                      html: `<span style="background-color: red" />`,
                    })}
                  >
                    <Popup>
                      {data.event.name} - {data && !data.event.address && data.event.city && (
                        <span>
                          {/* @ts-ignore */}
                          {data && data.event.city}
                        </span>
                      )} 
                      {data && data.event.address && data.event.city && (
                        <span>
                          {/* @ts-ignore */}
                          {`${data && data.event.address} ${data && data.event.city
                            }`}
                        </span>
                      )}
                      </Popup>
                    </Marker>
                </Map>
              )}
            </Grid>
            </Grid>       

            <div className={styles.buttonParticipate}>
              {data && containUser(data.event.participants) && (
                <button
                  className={styles.buttonInverse}
                  onClick={removeParticipateHandler}
                >
                  Je ne participe plus
                </button>
              )}
              {!(data && containUser(data.event.participants)) && (
                <button
                  className={styles.button}
                  onClick={addParticipateHandler}
                >
                  Je participe
                </button>
              )}
            </div>
            {data && data.event.pictures && data.event.pictures.length > 0 && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  PHOTOS ET VIDEOS
                </Typography>
              </div>
            )}
            <Slider {...settingsSliderImage}>
              {data &&
                data.event.pictures &&
                data.event.pictures
                  .sort((a, b) => (a.position > b.position ? 1 : -1))
                  .map((picture) => (
                    <img
                      src={getImageUrl(picture.croppedPicturePath)}
                      className={[styles.img]}
                    />
                  ))}
            </Slider>
            {data && data.event.practicalInfo && (
              <div>
                <div>
                  <Typography
                    variant="h5"
                    className={[styles.cardTitle, styles.align]}
                  >
                    INFO PRATIQUES COMPLEMENTS
                  </Typography>
                </div>
                <p>{data && Parser(data.event.practicalInfo)}</p>
              </div>
            )}
            <div>
              <Typography
                variant="h5"
                className={[styles.cardTitle, styles.align]}
              >
                LES ACTEURS PARTICIPANTS
              </Typography>
            </div>
            <Slider
              {...settingsSliderevent}
              className={[styles.articleCarroussel]}
            >
              {data &&
                data.event.actors.map((actor) => {
                  return <CardSliderActor key={actor.id} actor={actor} />;
                })}
            </Slider>
          </Container>
          <Newsletter />
          {((data && containUser(data.event.referents)) ||
            (user && user.role === 'admin')) && (
            <Link href={`/actorAdmin/event/${id}`}>
              <Fab className={styles.fab} aria-label="edit">
                <EditIcon />
              </Fab>
            </Link>
          )}
        </Box>
      </RootRef>
    </AppLayout>
  );
};

// export default withListener(Actor)
export default withApollo()(Event);
// export async function getServerSideProps(context) {
//     ''
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
