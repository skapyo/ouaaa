import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
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
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import Slider from 'react-slick/lib';
import { useSnackbar } from 'notistack';
import { useCookies } from 'react-cookie';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'components/Link';
import moment from 'moment';
import CardSliderEvent from '../../components/cards/CardSliderEvent';
import Newsletter from '../../containers/layouts/Newsletter';
import { useSessionState } from '../../context/session/session';
import CardAddEvent from '../../components/cards/CardAddEvent';
import { getImageUrl, entriesHasElementWithCode } from '../../utils/utils';
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
    backgroundColor: 'white',
    // backgroundImage: "url('/icons/planet.svg')",
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: ' 0.5',
    //  backgroundImage:`url('./fond.png')`,
    borderRadius: '0.5em',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      padding: '5em',
    },
    justify: 'center',
    alignItems: 'center',
    'max-width': '755px',
    'margin-top': '-53px',
    'box-shadow': '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
    },
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  map: {
    height: '30em',
    width: '30em',
  },
  actorName: {
    width: '100%',
  },
  h1: {
    fontSize: '3rem',
  },
  cardTitleCategories: {
    color: theme.typography.h5.color,
  },
  infoValue: {
    color: theme.typography.h5.color,
    fontWeight: 700,
    whiteSpace: 'break-spaces',
    overflowWrap: 'break-word',
  },
  infoLabel: {
    color: theme.typography.h5.color,
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

  descriptionInfoLabel: {
    display: 'inline-block',
    fontWeight: 700,
    margin: '0.5em',
  },
  descriptionInfoValue: {
    display: 'inline-block',
  },
  descriptionInfoDiv: {
    display: 'inline-block',
    margin: '0em 1em 0em 1em',
  },
  infoPratiqueGrid: {
    textAlign: 'center',
    backgroundColor: '#ededf5',
  },
  image: {
    height: '200px',
    width: '200px',
    margin: '10px auto',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      borderRadius: '50%',
    },
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
  item: {
    border: '1px solid #2C367E',
    borderWidth: ' 1px 0px 1px 0px ',
    borderStyle: 'dashed',
  },
  infoDiv: {
    width: '100%',
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
  hide: {
    display: 'none',
  },
  socialNetworkIcon: {
    marginLeft: '5px',
  },
  buttonVolunteer: {
    fontSize: 'inherit',
    margin: '0.5em 0 0.5em 0 ',
    color: 'white',
    'background-color': 'transparent',
    border: '2px solid white',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    minHeight: '2.5em',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
    textAlign: 'center',
  },
  volunteerSection: {
    backgroundColor: '#2b3483',
    paddingBottom: '1em',
    textAlign: 'center',
    borderRadius: '1em',
    marginTop: '1em',
  },
  volunteerTitle: {
    fontWeight: '500',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '1.8em',
    paddingTop: '2em',
  },
  volunteerDescription: {
    color: 'white',
    fontSize: '1.2em',
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
const GET_ACTOR_SSR = `
query actor($id: String) {
  actor(id: $id) {
    id
    name
    address
    lat
    lng
    address
    city
    email
    phone
    website
    description
    socialNetwork
    volunteerDescription
    activity
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
    events {
      id
      label
      shortDescription
      description
      startedAt
      endedAt
      published
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
    }
    volunteers {
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
    openingHours {
      days {
        identifier
        day
        selected
      }
      hours
      place
    }
  }
}
`;
const Actor = ({ initialData }) => {
  const router = useRouter();
  const mapRef = useRef();

  const { id } = router.query;
  const [eventToRender, setEventToRender] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies();
  const GET_ACTOR = gql`
    query actor($id: String) {
      actor(id: $id) {
        id
        name
        address
        lat
        lng
        address
        city
        email
        phone
        website
        description
        socialNetwork
        volunteerDescription
        activity
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
        events {
          id
          label
          shortDescription
          description
          startedAt
          endedAt
          published
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
        }
        volunteers {
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
        openingHours {
          days {
            identifier
            day
            selected
          }
          hours
          place
        }
      }
    }
  `;



  const ADD_ACTOR_VOLUNTEER = gql`
    mutation addActorVolunteer($actorId: Int!, $userId: Int!) {
      addActorVolunteer(actorId: $actorId, userId: $userId)
    }
  `;
  const REMOVE_ACTOR_VOLUNTEER = gql`
    mutation removeActorVolunteer($actorId: Int!, $userId: Int!) {
      removeActorVolunteer(actorId: $actorId, userId: $userId)
    }
  `;

  const [stylesProps, setStylesProps] = useState({
    topImageSize: '250px',
    headerDisplay: 'static',
  });
  const styles = useStyles(stylesProps);

  const [
    addVolunteer,
    { data: volunteerData, loading: volunteerLoading, error: volunteerError },
  ] = useMutation(ADD_ACTOR_VOLUNTEER);
  const [
    removeVolunteer,
    {
      data: removevolunteerData,
      loading: removevolunteerLoading,
      error: removevolunteerError,
    },
  ] = useMutation(REMOVE_ACTOR_VOLUNTEER);


  const user = useSessionState();
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

  /*const {
    data, loading, error, refetch,
  } = useQuery(GET_ACTOR, {
    variables: {
      id,
    },
  });*/
  const data = initialData.data;

  useEffect(() => {
    if (volunteerData !== undefined) {
      enqueueSnackbar('Demande de bénévole prise en compte', {
        preventDuplicate: true,
      });
      refetch();
    }
  }, [volunteerData]);

  useEffect(() => {
    if (removevolunteerData !== undefined) {
      enqueueSnackbar('Suppression de la demande de bénévole', {
        preventDuplicate: true,
      });
      refetch();
    }
  }, [removevolunteerData]);

  const addVolunteerHandler = () => {
    if (user == null) {
      setCookie('redirect_url', router.asPath, {
        path: `/actor/${data}` && data.actor.id,
      });
      enqueueSnackbar('Veuillez vous connecter pour devenir bénévole', {
        preventDuplicate: true,
      });
    } else {
      addVolunteer({
        variables: {
          actorId: parseInt(data && data.actor.id),
          userId: parseInt(user.id),
        },
      });
    }
  };

  const removeVolunteerHandler = () => {
    removeVolunteer({
      variables: {
        actorId: parseInt(data && data.actor.id),
        userId: parseInt(user.id),
      },
    });
  };
  const getDay = (dayNumber) => {
    switch (dayNumber) {
      case '1':
        return 'Lundi ';
      case '2':
        return 'Mardi ';
      case '3':
        return 'Mercredi ';
      case '4':
        return 'Jeudi ';
      case '5':
        return 'Vendredi ';
      case '6':
        return 'Samedi ';
      case '7':
        return 'Dimanche ';
      default:
        return '';
    }
  };

  const headerRef = React.useRef();
  const settingsSliderImage = {
    infinite: true,
    slidesToShow:
      data && data.actor.pictures && data.actor.pictures.length > 3
        ? 3
        : data && data.actor.pictures && data.actor.pictures.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const nbSlidetoshow = data && data.actor.events && data.actor.events.length > 5
    ? 5
    : data
    && data.actor.events
    && data.actor.events.length + (containUser(data.actor.referents) ? 1 : 0);

  const settingsSliderevent = {
    infinite: true,
    slidesToShow: nbSlidetoshow,
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
    const nbEntryToShow = 1;
    let nbEntry = 0;
    entries.forEach((entry) => {
      if (
        entry.parentEntry
        && entry.parentEntry.collection
        && entry.parentEntry.collection.code === 'category'
        && nbEntry <= nbEntryToShow
      ) {
        text += `${entry.parentEntry.label} : `;
        text += `${entry.label}  `;
        nbEntry += 1;
      }
    });
    return text;
  }

  function showLaRochelleQuarter(entries) {
    let text = '';
    entries.forEach((entry) => {
      if (
        entry
        && entry.collection
        && entry.collection.code === 'larochelle_quarter'
      ) {
        text += `, ${entry.label}`;
      }
    });
    return text;
  }

  const events = useMemo(() => {
    return (data?.actor?.events || []).map(evt => {
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

  let url; 
  if (typeof window !== 'undefined') {
    url = window.location.href;
  }
  
  return (
    <AppLayout>
      <Head>
        <title>
          {/* @ts-ignore */}
          {data && data.actor.name}
          -
          {/* @ts-ignore */}
          {data && data.actor.activity}
          {/* @ts-ignore */}
          -
          {/* @ts-ignore */}
          {data && data.actor.city}
          {/* @ts-ignore */}
          {data && showLaRochelleQuarter(data.actor.entries)}
          {/* @ts-ignore */}
          -
          {/* @ts-ignore */}
          {data && showCategory(data.actor.entries)}
        </title>
        {data && data.actor.pictures.length >= 1 &&  data.actor.pictures.filter(picture => picture.logo).length >= 1 &&  (
          <meta property="og:image" content={
              data.actor.pictures.length >= 1
              ? getImageUrl(
                data.actor.pictures.filter(picture => picture.logo)[0].croppedPicturePath)
              : ''
            }
          />
        )}
      </Head>
      <RootRef>
        <Box>
          <Typography variant="h1" className={styles.hide}>
            {/* @ts-ignore */}
            {data && data.actor.name}
            {/* @ts-ignore *
          -
          {/* @ts-ignore */}
            {data && data.actor.activity}
            {/* @ts-ignore */}
            -
            {/* @ts-ignore */}
            {data && data.actor.city}
            {/* @ts-ignore */}
            {data && showLaRochelleQuarter(data.actor.entries)}
            {/* @ts-ignore */}
            -
            {/* @ts-ignore */}
            {data && showCategory(data.actor.entries)}
          </Typography>

          {data && data.actor && (
            <Container
              className={styles.titleContainer}
              style={{
                backgroundImage:
                  data.actor.pictures.length >= 1 && data.actor.pictures.filter(picture => picture.main).length >= 1
                    ? `url(${getImageUrl(
                      data.actor.pictures.filter(picture => picture.main)[0].originalPicturePath)})`
                    : '',
              }}
            />
          )}
            
          <Container className={styles.cardInfo}>
            <Grid container>
              <Grid item md={5} sm={10} className={[styles.align]}>
                <Grid container className={[styles.infoPratiqueGrid]}>
                  <div className={styles.image}>
                    {data && data.actor.pictures.length >= 1 && data.actor.pictures.filter(picture => picture.logo).length >= 1 && (
                      <img
                        src={
                          data.actor.pictures.length >= 1
                            ? getImageUrl(
                              data.actor.pictures.filter(picture => picture.logo)[0].croppedPicturePath)
                            : ''
                        }
                      />
                    )}
                  </div>

                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <img
                        src="/icons/location.svg"
                        alt="Localisation"
                        className={[styles.icon]}
                      />
                    </Grid>
                   
                    <Grid item xs={8} className={[styles.alignLeft]}>
                      <div className={[styles.infoLabel]}>LOCALISATION </div>
                     
                      <span className={[styles.infoValue]}>
                        {data && !data.actor.city && (
                          <span> Adresse manquante</span>
                        )}
                        {data && !data.actor.address && data.actor.city && (
                          <span>
                            {/* @ts-ignore */}
                            {data && data.actor.city}
                          </span>
                        )}
                        {data && data.actor.address && data.actor.city && (
                          <span>
                            {/* @ts-ignore */}
                            {`${data && data.actor.address} ${data && data.actor.city
                              }`}
                          </span>
                        )}
                      </span>
                      {data
                        && entriesHasElementWithCode(
                          data.actor.entries,
                          'actor_location_action',
                        ) && (
                          <div className={[styles.infoDiv]}>
                            <div className={[styles.infoLabel]}>
                              TERRITOIRE D'ACTION
                            </div>
                            <span className={[styles.infoValue]}>
                              {data
                                && data.actor.entries.map(
                                  (entry) => entry
                                    && entry.collection
                                    && entry.collection.code
                                    === 'actor_location_action' && (
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
                    </Grid>
                  </Grid>
                  {data && data.actor.phone && (
                    <div className={[styles.infoDiv]}>
                      <Grid container className={[styles.item]}>
                        <Grid item xs={3} className={[styles.alignRight]}>
                          <img
                            src="/icons/phone.svg"
                            alt="Téléphone"
                            className={[styles.icon]}
                          />
                        </Grid>
                        <Grid item xs={8} className={[styles.alignLeft]}>
                          <div className={[styles.infoLabel]}>TELEPHONE</div>
                          <span className={[styles.infoValue]}>
                            {data && data.actor.phone}
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {data && data.actor.email && (
                    <div className={[styles.infoDiv]}>
                      <Grid container className={[styles.item]}>
                        <Grid item xs={3} className={[styles.alignRight]}>
                          <img
                            src="/icons/email.svg"
                            alt="Email"
                            className={[styles.icon]}
                          />
                        </Grid>
                        <Grid item xs={8} className={[styles.alignLeft]}>
                          <div className={[styles.infoLabel]}>Email</div>
                          <span className={[styles.infoValue]}>
                            {data && data.actor.email}
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {data && data.actor.website && (
                    <div className={[styles.infoDiv]}>
                      <Grid container className={[styles.item]}>
                        <Grid item xs={3} className={[styles.alignRight]}>
                          <img
                            src="/icons/web_site.svg"
                            alt="Site Web"
                            className={[styles.icon]}
                          />
                        </Grid>
                        <Grid item xs={8} className={[styles.alignLeft]}>
                          <div className={[styles.infoLabel]}>
                            Site internet
                          </div>
                          <span className={[styles.infoValue]}>
                            <a
                              href={data && data.actor.website}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {data && data.actor.website}
                            </a>
                            {/* @ts-ignore */}
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {data && data.actor.socialNetwork && (
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <img
                          src="/icons/social.svg"
                          alt="Réseau social"
                          className={[styles.icon]}
                        />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Réseau social</div>
                        <span className={[styles.infoValue]}>
                          <a
                            href={data && data.actor.socialNetwork}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data && data.actor.socialNetwork}

                          
                          </a>
                          {/* @ts-ignore */}
                        </span>
                      </Grid>
                    </Grid>
                  )}

                  {data &&
                    data?.actor?.openingHours &&
                    data?.actor?.openingHours.length !== 0 && (
                      <Grid container className={[styles.item]}>
                        <Grid item xs={3} className={[styles.alignRight]}>
                          <img
                            src="/icons/clock.svg"
                            alt="Horaire"
                            className={[styles.icon]}
                          />
                        </Grid>
                        <Grid item xs={8} className={[styles.alignLeft]}>
                          <div className={[styles.infoLabel]}>Horaire</div>
                          {data &&
                            data?.actor?.openingHours.map((openingHour) => {
                              // debugger;
                              return (
                                <span className={[styles.infoValue]}>
                                  {openingHour.place}
                                  {openingHour.place && ' , '}
                                  {openingHour.days
                                    .filter((day) => day.selected)
                                    .map((day, index) => {
                                      return (
                                        <>
                                          {index != 0 && 'et '}
                                          {getDay(day.identifier)}
                                        </>
                                      );
                                    })}
                                  {openingHour.hours.map(
                                    (hourtab, indexhourtab) => {
                                      return (
                                        <>
                                          {indexhourtab !== 0 && ' ; '}
                                          {hourtab.map((hour, index) => {
                                            return (
                                              <>
                                                {moment(hour).format('HH')}h
                                                {moment(hour).format('mm')}
                                                {index === 0 && ' - '}
                                              </>
                                            );
                                          })}
                                        </>
                                      );
                                    },
                                  )}

                                  <br />
                                </span>
                              );
                            })}
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
                          url={`https://recette.ouaaa-transition.fr${router.asPath}`}
                        >
                          <FacebookIcon round size={32} className={[styles.socialNetworkIcon]} />
                        </FacebookShareButton>

                        <TwitterShareButton
                          size={32}
                          round
                          url={`https://recette.ouaaa-transition.fr${router.asPath}`}
                        >
                          <TwitterIcon round size={32} className={[styles.socialNetworkIcon]} />
                        </TwitterShareButton>

                        <WhatsappShareButton
                          size={32}
                          round
                          url={`https://recette.ouaaa-transition.fr${router.asPath}`}
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
                {data && data?.actor?.name}
                </Typography>
                <div className={styles.border} />
                <br />
                <br />
                <Typography variant="h2">
                  {data && data.actor.name}
                </Typography>
                <br />
                <p>{data && Parser(data.actor.description)}</p>
                <div>
                  {data
                    && data.actor.entries.map(
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
                    data.actor.entries,
                    'actor_status',
                  ) && (
                    <div className={[styles.descriptionInfoDiv]}>
                      <img src="/icons/status.svg" alt="Collectif & réseau" className={[styles.icon]} />
                      <div className={[styles.descriptionInfoLabel]}> Statut :</div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.actor.entries.map(
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
                    data.actor.entries,
                    'public_target',
                  ) && (
                    <div className={[styles.descriptionInfoDiv]}>

                      <img src="/icons/public.svg" alt="Collectif & réseau" className={[styles.icon]} />
                      <div className={[styles.descriptionInfoLabel]}>
                        Public principal visé
                      </div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.actor.entries.map(
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
                    data.actor.entries,
                    'collectif',
                  ) && (
                    <div className={[styles.descriptionInfoDiv]}>
                      <img src="/icons/network.svg" alt="Collectif & réseau" className={[styles.icon]} />
                      <div className={[styles.descriptionInfoLabel]}>
                        Collectif & réseaux
                      </div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.actor.entries.map(
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
              </Grid>
            </Grid>
            <br />
            {data && data.actor.volunteerDescription && (
              <div>
                <br />
                <Typography variant="h3" className={styles.cardTitle}>
                  Recherche de bénévoles
                </Typography>
                <div className={styles.border} />
                <br />
                <div className={styles.volunteerSection}>
                  <Typography className={styles.volunteerTitle}>
                    {data && data.actor.name} recherche des bénévoles
                  </Typography>
                  <br />
                  <div className={styles.volunteerDescription}>{data && Parser(data.actor.volunteerDescription)}</div>
                  <div >
                    {data && containUser(data.actor.volunteers) && (
                      <button
                        className={styles.buttonVolunteer}
                        onClick={removeVolunteerHandler}
                      >
                        Je ne souhaite plus être bénévole
                      </button>
                    )}
                    {!(data && containUser(data.actor.volunteers)) && (
                      <button
                        className={styles.buttonVolunteer}
                        onClick={addVolunteerHandler}
                      >
                        Devenir bénévole
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            <br />
            {data && data.actor.pictures && data.actor.pictures.length > 0 && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  PHOTOS
                </Typography>
                <div className={styles.border} />
                <br />
              </div>
            )}
            <Slider {...settingsSliderImage}>
              {data
                && data.actor.pictures
                && data.actor.pictures
                  .sort((a, b) => (a.position > b.position ? 1 : -1))
                  .map((picture) => (
                    <img
                      src={getImageUrl(picture.croppedPicturePath)}
                      className={[styles.img]}
                    />
                  ))}
            </Slider>
            <br />
            <div>
              <Typography
                variant="h5"
                className={[styles.cardTitle]}
              >
                LES ÉVÉNEMENTS DE : {data && data?.actor?.name}
              </Typography>
              <div className={styles.border} />
            </div>
            <br />
            <Calendar
              events={events}
              withViewSwitcher={false}
              withAddEvent={((data && containUser(data.actor.referents))
                || (user && user.role === 'admin'))}
            />
          </Container>
          <Newsletter />
          {((data && containUser(data.actor.referents))
            || (user && user.role === 'admin')) && (
              <Link href={`/actorAdmin/actor/${id}`}>
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
export default withApollo()(Actor);
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(ctxt) {

  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
      method: 'POST',
      body: JSON.stringify({
        "operationName": "actor",
        "variables": {
            "id": ctxt.params.id
        },
        "query": GET_ACTOR_SSR,
        }),
    });
    
  const initialData = await res.json();
    return {
      props: { initialData
            }
  }
  }
