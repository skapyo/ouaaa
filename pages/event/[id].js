import React, { useEffect, useState, useRef, useMemo } from 'react';
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
import Slider from 'react-slick/lib';
import CardSliderActor from 'components/cards/CardSliderActor';
import CardSliderEvent from 'components/cards/CardSliderEvent';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import moment from 'moment';
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
import Calendar from '../../components/Calendar';


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
  h1: {
    fontSize: '3rem',
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
    height: '200px',
    width: '200px',
    margin: '10px auto',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
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
    backgroundImage: "url('/arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '20%',
    fontSize: '1em',
  },
  socialNetworkIcon: {
    marginLeft: '5px',
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
    backgroundImage: "url('/arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '20%',
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

const GET_EVENT = `
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
          referents {
            id
            surname
            lastname
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
          logo
          main
        }
        parentEvent {
          id
          label
          startedAt
          endedAt
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
        subEvents {
          id
          label
          startedAt
          endedAt
          description
          lat
          lng
          address
          city
        }
      }
    }
  `;

const Event = ({ initialData }) => {
  const router = useRouter();
  const mapRef = useRef();

  const { id } = router.query;

  const [currentLocationWindows, setCurrentLocationWindows] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocationWindows(window?.location);
    }
  }, []);

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


  if (typeof window !== 'undefined') {
    var L = require('leaflet');
    var Map = require('react-leaflet').Map;
    var TileLayer = require('react-leaflet').TileLayer;
    var Marker = require('react-leaflet').Marker;
    var Popup = require('react-leaflet').Popup;
  }
  const data = initialData.data;

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
  function containUserActorsReferent(actors) {
    let isContained = false;
    if (user !== null) {
      actors.forEach((actor) => {
        actor.referents.forEach((element) => {
          if (element.id == user.id) {
            isContained = true;
          }
        });
      });
    }
    return isContained;
  }

  const addParticipateHandler = () => {
    if (user == null) {
      setCookie('redirect_url', router.asPath, {
        path: `/event/${data.event.id}`,
      });
      enqueueSnackbar("Veuillez vous connecter pour participer à l'action", {
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

  const events = useMemo(() => {
    return (data?.event?.subEvents || []).map(evt => {
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
        location: evt.city ? [evt.address, evt.city].join(', ') : '',
        backgroundColor: evt.entries && evt.entries.length > 0 && evt.entries[0].parentEntry ? evt.entries[0].parentEntry.color : 'blue',
        ...recurrentOptions
      }
    })
  }, [data]);

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
        {data && data.event.pictures.length >= 1 && data.event.pictures.filter(picture => picture.logo).length >= 1 && (
          <meta property="og:image" content={
            data.event.pictures.length >= 1
              ? getImageUrl(
                data.event.pictures.filter(picture => picture.logo)[0].croppedPicturePath)
              : ''
          }
          />
        )}
      </Head>
      <RootRef>
        <Box>
          {data && data.event && (
            <Container
              className={styles.titleContainer}
              style={{
                backgroundImage:
                  data && data.event && data.event.pictures.length >= 1 && data.event.pictures.filter(picture => picture.main).length >= 1
                    ? `url(${getImageUrl(
                      data.event.pictures.filter(picture => picture.main)[0].croppedPicturePath)})`
                    : '',
              }}
            />
          )}
          <Container className={styles.cardInfo}>
            <Grid container>
              <Grid item md={5} sm={10} className={[styles.align]}>
                <Grid container className={[styles.infoPratiqueGrid]}>
                  <div className={styles.image}>
                    {data && data.event.pictures.length >= 1 && data.event.pictures.filter(picture => picture.logo).length >= 1 && (
                      <img
                        src={
                          data.event.pictures.length >= 1
                            ? getImageUrl(
                              data.event.pictures.filter(picture => picture.logo)[0].croppedPicturePath)
                            : ''
                        }
                      />
                    )}
                  </div>
                  {data
                    /*  &&  entriesHasElementWithCode(
                        data.event.entries, 
                        'event_type',) */
                    && (
                      <Grid container className={[styles.item]}>
                        <Grid item xs={3} className={[styles.alignRight]}>
                          <img src={"/icons/types.svg"} alt="Collectif & réseau" className={[styles.icon]} />
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
                                        {`${entry && entry.parentEntry.label} : ${entry && entry.label
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
                  {data && (
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
                          <img src={"/icons/tarifs.svg"} alt="Tarif" className={[styles.icon]} />
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

                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <img
                        src="/icons/social.svg"
                        alt="Réseau social"
                        className={[styles.icon]}
                      />
                    </Grid>
                    <Grid item xs={8} className={[styles.alignLeft]}>
                      <div className={[styles.infoLabel]}>
                        Partager la page sur les réseaux
                      </div>
                      <span className={[styles.infoValue]}>
                        <FacebookShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <FacebookIcon round size={32} className={[styles.socialNetworkIcon]} />
                        </FacebookShareButton>

                        <TwitterShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <TwitterIcon round size={32} className={[styles.socialNetworkIcon]} />
                        </TwitterShareButton>

                        <WhatsappShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <WhatsAppIcon round size={32} className={[styles.socialNetworkIcon]} />
                        </WhatsappShareButton>
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid item md={7} sm={10} className={styles.description}>
                <Typography variant="h1" className={styles.cardTitle}>
                  {data && data.event.label}
                </Typography>
                <div className={styles.border} />
                <br />
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
                              {entry.icon && (
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

                {data && L && (
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
              {!(data && containUser(data.event.participants)) && !(data && data.event.registerLink && data.event.registerLink.length > 1) && (

                <button
                  className={styles.button}
                  onClick={addParticipateHandler}
                >
                  Je participe
                </button>
              )}
              {!(data && containUser(data.event.participants)) && (data && data.event.registerLink && data.event.registerLink.length > 1) && (
                <a href={data && data.event.registerLink} target="blank"
                  className={styles.button}
                >
                  Je participe
                </a>
              )}
            </div>
            {data && data.event.pictures && data.event.pictures.length > 0 && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  PHOTOS
                </Typography>
                <div className={styles.border} />
                <br />
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
                  <Typography variant="h5" className={styles.cardTitle}>
                    INFO PRATIQUES COMPLEMENTS
                  </Typography>
                  <div className={styles.border} />
                  <br />
                </div>
                <p>{data && Parser(data.event.practicalInfo)}</p>
              </div>
            )}
            {data && data.event.actors && data.event.actors.length > 0 && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  LES ACTEURS PARTICIPANTS
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
            )}
            <Slider
              {...settingsSliderevent}
              className={[styles.articleCarroussel]}
            >
              {data &&
                data.event.actors.map((actor) => {
                  return <CardSliderActor key={actor.id} actor={actor} />;
                })}
            </Slider>
            <br />
            <br />
            {data && data.event.parentEvent && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  FAIS PARTIT DE L'EVENEMENT
                </Typography>
                <div className={styles.border} />
                <br />
                <Slider
                  {...settingsSliderevent}
                  className={[styles.articleCarroussel]}
                >
                  <CardSliderEvent key={data.event.parentEvent.id} event={data.event.parentEvent} />
                </Slider>
                <br />
                <br />
              </div>
            )}
            {data && data.event.subEvents && data.event.subEvents.length > 0 && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  LES ACTIONS-EVENEMENTS ASSOCIEES
                </Typography>
                <div className={styles.border} />
                <br />
                <Calendar
                  events={events}
                  withViewSwitcher={true}
                />
              </div>
            )}
          </Container>
          <Newsletter />
          {((data && (containUser(data.event.referents) || containUserActorsReferent(data.event.actors))) ||
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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(ctxt) {

  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      "operationName": "event",
      "variables": {
        "id": ctxt.params.id
      },
      "query": GET_EVENT,
    }),
  });


  const initialData = await res.json();
  if (initialData.errors) {
    console.error(" Error fetching event id " + ctxt.params.id + " error message : " + initialData.errors[0].message + "");
  }

  return {
    props: {
      initialData
    }
  }
}