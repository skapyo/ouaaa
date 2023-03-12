import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Container, Grid,  Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Tooltip, Modal, Box,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withApollo } from 'hoc/withApollo.jsx';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import Slider from 'react-slick/lib';
import { useSnackbar } from 'notistack';
import { useCookies } from 'react-cookie';
import { useReactToPrint } from 'react-to-print';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Image from 'next/image';
import Link from 'components/Link';
import moment from 'moment';
import { RRule } from 'rrule';
import CardSliderArticle from 'components/cards/CardSliderArticle';
import dynamic from 'next/dynamic';
import { useSessionState } from '../../context/session/session';
import {
  getImageUrl,
  entriesHasElementWithCode,
  urlRectification,
  urlWithHttpsdefault,
  rruleToText
} from '../../utils/utils';
import Calendar from '../../components/Calendar';
import Favorite from '../../components/Favorite';
import ActorToPrint from '../../components/print/Actor';
import ActorGameToPrint from '../../components/print/ActorGame';

const useStyles = makeStyles((theme) => ({
  '@media print': {
    fab: {
      display: 'none !important',
    },
  },
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
    // backgroundImage: "url('/icons/planet.svg')",
    //  backgroundImage:`url('./fond.png')`,
    backgroundColor: 'white',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: ' 0.5',
    borderRadius: '0.5em',
    justify: 'center',
    marginTop: ({ hasBannerUrl }) => (hasBannerUrl ? -53 : 20),
    alignItems: 'center',
    maxWidth: 755,
    boxShadow: '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      padding: '5em',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 16,
    },
  },
  infoPratiqueGrid: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: '#ededf5',
    borderRadius: 5,
    '& > *:first-child': {
      border: 'none',
    },
  },
  printButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  description: {
    wordBreak: 'break-word',
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 10,
    },
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem !important',
    },
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
  game: {
    paddingTop: '13px',
    color: '#D96552',
  },
  printIcon: {
    color: '#D96552',
  },
  border: {
    width: '3em',
    borderColor: '#2C367E',
    borderBottom: 'solid',
    borderBottomColor: '#2C367E',
    color: '#2C367E',
    height: '1em',
    marginBottom: 10,
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
  image: {
    height: '200px',
    width: '200px',
    margin: '10px auto',
    '& img': {
      height: '100%!important',
      width: '100%!important',
      objectFit: 'contain',
    },
  },
  slider: {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      '& .slick-prev': {
        left: 0,
      },
      '& .slick-next': {
        right: 0,
      },
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: theme.palette.grey[500],
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
    padding: '1em 0em 1em 0em',
  },
  alignRight: {
    textAlign: 'right',
    padding: '1em',
  },
  favoriteIcon: {
    color: '#2C367E',
    cursor: 'pointer',
  },
  item: {
    borderWidth: '1px 0px 0px 0px',
    borderStyle: 'dashed',
    borderColor: '#2C367E',
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
    cursor: 'pointer',
  },
  imgModal: {
    padding: '1em',
    maxHeight: '50em',
    maxWidth: '100%',
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
    [theme.breakpoints.down('md')]: {
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
    fontSize: '1.5em',
    paddingTop: '2em',
  },
  volunteerDescription: {
    color: 'white',
    fontSize: '1.0em',
    padding: '0 1.2em 0 1.2em',
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
  fabPrint: {
    bottom: '120px',
  },
  map: {
    height: '400px !important',
    width: '100% !important',
  },
  calendar: {
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      marginLeft: -16,
      '& > *:first-child': {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 5,
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      
    },
  },
  video: {
    width: '100%',
    maxWidth : '500px',
  },
  mapContainer: {
    height: '100% !important'
  },
}));

const GET_ARTICLES = gql`
query articles ($actorId: String){
  articles(actorId: $actorId) {
    id
    label
    shortDescription
    createdAt
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
}`;
const GET_EVENTS = gql`
query events ($actorId: String){
  events(actorId: $actorId) {
    id
    label
    shortDescription
    description
    startedAt
    endedAt
    published
    dateRule
    pictures {
      id
      label
      originalPicturePath
      originalPictureFilename
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
}`;
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
    shortDescription
    socialNetwork
    volunteerDescription
    activity
    favorites {
      id
    }
    entries {
      label
      icon
      actorEntries {
        linkDescription,
        topSEO,
        id,
       }
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
    isValidated
    pictures {
      id
      label
      originalPicturePath
      originalPictureFilename
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
    hasVideoVouaaar
  }
}
`;

const SliderArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const ActorName = (props) => {
  const { name } = props;
  const styles = useStyles(props);

  if (!name) return null;

  return (
    <div>
      <Typography variant="h1" className={styles.cardTitle}>
        {name}
      </Typography>
      <div className={styles.border} />
    </div>
  );
};

const Actor = ({ initialData }) => {
  const router = useRouter();
  const mapRef = useRef();
  const printRef = useRef(null);
  const printGameRef = useRef(null);

  const [currentLocationWindows, setCurrentLocationWindows] = useState(
    globalThis?.location,
  );

  const { id } = router.query;
  const [eventToRender, setEventToRender] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [hasClickVolunteer, setHasClickVolunteer] = useState(false);
  const [openModalSlider, setOpenModalSlider] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const MapWithNoSSR = dynamic(() => import('../../components/map/Map'), {
    ssr: false,
  });

  const MarkerWithNoSSR = dynamic(() => import('../../components/map/MarkerEventLocation'), {
    ssr: false,
  });

  const {
    data: dataArticles,
  } = useQuery(GET_ARTICLES, {
    variables: {
      actorId: `${id}`,
    },
  });
  const {
    data: dataEvents,
  } = useQuery(GET_EVENTS, {
    variables: {
      actorId: `${id}`,
    },
  });

  const { data } = initialData;

  const bannerUrl = useMemo(() => {
    return (data?.actor?.pictures || []).filter((picture) => picture.main)
      .length >= 1
      ? data.actor.pictures.filter((picture) => picture.main)[0]
        .originalPicturePath
      : null;
  }, [data]);
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

  const user = useSessionState();
  function containUser(list) {
    let isContained = false;
    if (user !== null && list !== undefined) {
      list.forEach((element) => {
        if (element.id == user.id) {
          isContained = true;
        }
      });
    }
    return isContained;
  }

  const [favorite, setFavorite] = useState(containUser(data?.actor.favorites));

  const handleFavoriteChange = (isFavorite) => {
    setFavorite(isFavorite);
  };

  const [stylesProps, setStylesProps] = useState({
    topImageSize: '250px',
    headerDisplay: 'static',
    hasBannerUrl: bannerUrl !== null,
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

  useEffect(() => {
    if (volunteerData !== undefined) {
      enqueueSnackbar('Demande de bénévole prise en compte', {
        preventDuplicate: true,
      });
      setHasClickVolunteer(true);
    }
  }, [volunteerData]);

  useEffect(() => {
    if (removevolunteerData !== undefined) {
      enqueueSnackbar('Suppression de la demande de bénévole', {
        preventDuplicate: true,
      });
      setHasClickVolunteer(false);
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
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}`;
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const headerRef = React.useRef();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxSlideToShowImage = !matches ? 3 : 1;
  const maxSlideToShowArticle = !matches ? 5 : 1;

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow />,
    prevArrow: <SliderArrow />,
  };

  const actorPictures = data?.actor?.pictures || [];
  const articles = dataArticles?.articles || [];

  const settingsSliderImage = useMemo(() => {
    return {
      ...sliderSettings,
      slidesToShow: actorPictures.length >= maxSlideToShowImage
        ? maxSlideToShowImage
        : actorPictures.length,
    };
  }, [actorPictures, sliderSettings, maxSlideToShowImage]);

  const settingsSliderImageArticle = useMemo(() => {
    return {
      ...sliderSettings,
      slidesToShow: articles.length >= maxSlideToShowArticle
        ? maxSlideToShowArticle
        : articles.length,
    };
  }, [actorPictures, sliderSettings, maxSlideToShowArticle]);

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
  const getAllEventsFromRecurringEvent = (event) => {
    let startEventDate = moment(parseInt(event.startedAt));
    let endEventDate = moment(parseInt(event.endedAt));
    const { dateRule } = event;
    const rrule = RRule.fromString(`DTSTART:${startEventDate.format('YYYYMMDD[T]hhmmss[Z]')}\nRRULE:${dateRule}`);
    return rrule.between(new Date(), moment().add(6, 'month').toDate()).map((date) => {
      return {
        ...event,
        startedAt: moment(date).valueOf().toString(),
        endedAt: moment(date).add(endEventDate.hour(), 'hours').valueOf().toString(),
        duration: rruleToText(rrule),
      };
    });
  };

  const events = useMemo(() => {
      const initialEvents = (dataEvents?.events || []);
      const recurringEvents = initialEvents.filter((event) => event.dateRule);
      
      const allRecurringEvents = recurringEvents.map((evt) => getAllEventsFromRecurringEvent(evt));
      const allEvents = initialEvents.concat(allRecurringEvents.reduce((acc, items) => acc.concat(items), []));


  
    return allEvents.map((evt) => {
      const startDate = moment(parseInt(evt.startedAt));
      const endDate = moment(parseInt(evt.endedAt));
  
      let recurrentOptions = null;
      const duration = Math.ceil(
        moment.duration(endDate.diff(startDate)).asDays(),
      );


      return {
        startDate: new Date(parseInt(evt.startedAt)),
        endDate: new Date(parseInt(evt.endedAt)),
        title: evt.label,
        id: evt.id,
        location: evt.city ? [evt.address, evt.city].join(', ') : '',
        backgroundColor:
          evt.entries && evt.entries.length > 0 && evt.entries[0].parentEntry
            ? evt.entries[0].parentEntry.color
            : 'blue',
        ...recurrentOptions,
      };
    });
  }, [dataEvents]);

  const logo = useMemo(() => {
    const logoPictures = actorPictures.filter((picture) => picture.logo);
    return logoPictures.length > 0 ? logoPictures[0] : null;
  }, [actorPictures]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleGamePrint = useReactToPrint({
    content: () => printGameRef.current,
  });

  
  return (
    <AppLayout>
      <Head>
        <title>
          {/* @ts-ignore */}
          {data && data.actor.name}
          {' '}
          {/* @ts-ignore */}
          {data && data.actor.activity}
          {/* @ts-ignore */}
          {' '}
          -
          {' '}
          {/* @ts-ignore */}
          {data && data.actor.city}
        </title>
        {logo && (
          <>
            <meta
              property="og:image"
              content={getImageUrl(logo.originalPicturePath)}
            />
            <meta name='twitter:image' content={getImageUrl(logo.originalPicturePath)} />
          </>
        )}

        <meta property='og:title' content={data && data.actor.name} />
        <meta property='og:description' content={data && data.actor.shortDescription} />
        <meta name='twitter:title' content={data && data.actor.name} />
        <meta name='twitter:description' content={data && data.actor.shortDescription} />

      </Head>
      <>
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
          {bannerUrl && (
            <Container
              className={styles.titleContainer}
              style={{
                backgroundImage: `url(${getImageUrl(bannerUrl)})`,
              }}
            />
          )}
          <Container className={styles.cardInfo}>
            <Grid container>
              {isMobile && <ActorName name={data?.actor?.name} />}
              <Grid item md={5} sm={10} className={[styles.align]}>
                <Grid container className={[styles.infoPratiqueGrid]}>
                  <div className={styles.printButton}>
                    <Tooltip title="Imprimer la page acteur">
                      <IconButton onClick={handlePrint} className={[styles.printIcon]} size="large">
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {
                    logo && logo.originalPicturePath && (
                      <div className={styles.image}>
                        <Image
                          loader={myLoader}
                          width="100"
                          height="100"
                          layout="responsive"
                          objectFit="contain"
                          src={logo.originalPicturePath}
                        />
                      </div>
                    )
                  }

                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <Image
                        src="/icons/location.svg"
                        alt="Localisation"
                        width="25"
                        height="25"
                        objectFit="contain"
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
                          <Image
                            src="/icons/phone.svg"
                            width="25"
                            height="25"
                            objectFit="contain"
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
                          <Image
                            src="/icons/email.svg"
                            width="25"
                            height="25"
                            objectFit="contain"
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
                          <Image
                            src="/icons/web_site.svg"
                            width="25"
                            height="25"
                            objectFit="contain"
                            alt="Site Web"
                            className={[styles.icon]}
                          />
                        </Grid>
                        <Grid item xs={8} className={[styles.alignLeft]}>
                          <div className={[styles.infoLabel]}>
                            Site internet
                          </div>
                          <span className={[styles.infoValue]}>
                            <Link
                              href={
                                data && urlWithHttpsdefault(data.actor.website)
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              {data && data.actor.website}
                            </Link>
                            {/* @ts-ignore */}
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {data && data.actor.socialNetwork && (
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <Image
                          src="/icons/social.svg"
                          width="25"
                          height="25"
                          objectFit="contain"
                          alt="Réseau social"
                          className={[styles.icon]}
                        />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Réseau social</div>
                        <span className={[styles.infoValue]}>
                          <Link
                            href={
                              data
                              && urlWithHttpsdefault(data.actor.socialNetwork)
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data && data.actor.socialNetwork}
                          </Link>
                          {/* @ts-ignore */}
                        </span>
                      </Grid>
                    </Grid>
                  )}

                  {data
                    && data?.actor?.openingHours
                    && data?.actor?.openingHours.length !== 0 && (
                      <Grid container className={[styles.item]}>
                        <Grid item xs={3} className={[styles.alignRight]}>
                          <Image
                            src="/icons/clock.svg"
                            width="25"
                            height="25"
                            objectFit="contain"
                            alt="Horaire"
                            className={[styles.icon]}
                          />
                        </Grid>
                        <Grid item xs={8} className={[styles.alignLeft]}>
                          <div className={[styles.infoLabel]}>Horaire</div>
                          {data
                            && data?.actor?.openingHours.map((openingHour) => {
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
                                                {moment(hour).format('HH')}
                                                h
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
                      <Favorite actor={data?.actor} handleFavoriteChange={handleFavoriteChange} />
                    </Grid>
                    <Grid item xs={8} className={[styles.alignLeft]}>
                      <div className={[styles.infoLabel]}>
                        {!favorite ? ' Ajouter aux favoris' : ' Retirer des favoris'}

                      </div>
                      <span className={[styles.infoValue]} />
                    </Grid>
                  </Grid>
                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <Image
                        src="/icons/social.svg"
                        alt="Réseau social"
                        width="25"
                        height="25"
                        objectFit="contain"
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
                          <FacebookIcon
                            round
                            size={32}
                            className={[styles.socialNetworkIcon]}
                          />
                        </FacebookShareButton>
                        <TwitterShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <TwitterIcon
                            round
                            size={32}
                            className={[styles.socialNetworkIcon]}
                          />
                        </TwitterShareButton>

                        <WhatsappShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <WhatsAppIcon
                            round
                            size={32}
                            className={[styles.socialNetworkIcon]}
                          />
                        </WhatsappShareButton>
                        <TelegramShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <TelegramIcon
                            round
                            size={32}
                            className={[styles.socialNetworkIcon]}
                          />
                        </TelegramShareButton>
                        <EmailShareButton
                          size={32}
                          round
                          url={`${currentLocationWindows}`}
                        >
                          <EmailIcon
                            round
                            size={32}
                            className={[styles.socialNetworkIcon]}
                          />
                        </EmailShareButton>
                      </span>
                    </Grid>
                  </Grid>
                  {
            ((data && containUser(data.actor.referents)) || (user && user.role === 'admin')) && (
            <Grid container className={[styles.item]}>
              <Grid item xs={3} className={[styles.alignRight]}>
                <Tooltip title="Imrpimer votre fiche pour le jeu le grand défi">
                  <IconButton onClick={handleGamePrint} className={[styles.printIcon]} size="large">
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={8} className={[styles.alignLeft]}>
                <div className={[styles.game]}>
                  Imprimer votre fiche pour le jeu le grand défi
                </div>

              </Grid>
            </Grid>
            )
          }
                </Grid>
              </Grid>
              <br />
              <Grid item md={7} sm={10} className={styles.description}>
                {!isMobile && <ActorName name={data?.actor?.name} />}
                <br />
                <br />
                <div>
                  {data && Parser(data.actor.description)}
                </div>
                <div>
                  {data
                    && data.actor.entries.map(
                      (entry) => entry.parentEntry
                        && entry.parentEntry.collection.code === 'category' && (
                          <div>
                            {entry?.actorEntries?.linkDescription && (
                            <Tooltip title={`${entry.label} - ${entry?.actorEntries?.linkDescription}`} color="primary" className={styles.tooltip}>
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
                                <Image
                                  src={`/icons/${entry.icon}.svg`}
                                  alt="icon"
                                  width="30"
                                  height="25"
                                  objectFit="contain"
                                  className={styles.iconEntry}
                                />
                                )}
                                {/* @ts-ignore */}
                                {` ${entry && entry.label}`}
                                {/* @ts-ignore */}
                              </Typography>
                            </Tooltip>
                            )}
                            {!entry?.actorEntries?.linkDescription && (
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
                                <Image
                                  src={`/icons/${entry.icon}.svg`}
                                  alt="icon"
                                  width="30"
                                  height="25"
                                  objectFit="contain"
                                  className={styles.iconEntry}
                                />
                                )}
                                {/* @ts-ignore */}
                                {` ${entry && entry.label}`}
                                {/* @ts-ignore */}
                              </Typography>
                            )}
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
                      <Image
                        src="/icons/status.svg"
                        alt="Collectif & réseau"
                        width="25"
                        height="25"
                        objectFit="contain"
                        className={[styles.icon]}
                      />
                      <div className={[styles.descriptionInfoLabel]}>
                        {' '}
                        Statut :
                      </div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.actor.entries.map(
                            (entry) => entry
                              && entry.collection
                              && entry.collection.code === 'actor_status' && (
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
                      <Image
                        src="/icons/public.svg"
                        alt="Collectif & réseau"
                        width="25"
                        height="25"
                        objectFit="contain"
                        className={[styles.icon]}
                      />
                      <div className={[styles.descriptionInfoLabel]}>
                        Public principal visé
                      </div>
                      <span className={[styles.descriptionInfoValue]}>
                        {data
                          && data.actor.entries.map(
                            (entry) => entry
                              && entry.collection
                              && entry.collection.code === 'public_target' && (
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
                      <Image
                        src="/icons/network.svg"
                        alt="Collectif & réseau"
                        width="25"
                        height="25"
                        objectFit="contain"
                        className={[styles.icon]}
                      />
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
                <Typography variant="h3" className={styles.cardTitle}>
                  ACCES
                </Typography>
                <div className={styles.border} />
                <br />

                {data && data.actor && data.actor.lat && data.actor.lng && (
                  <div className={styles.map}>
                    <MapWithNoSSR
                      actor={data.actor}
                      ref={mapRef}
                      scrollWheelZoom={false}
                      position={[data.actor.lat, data.actor.lng]}
                      id="map"
                      classMap={styles.mapContainer}
                    >
                      <MarkerWithNoSSR
                        event={data.actor}
                      />
                    </MapWithNoSSR>
                  </div>
                )}
              </Grid>
            </Grid>
            <br />
            {data && data.actor.hasVideoVouaaar && (
            <div className={styles.cardTitle}>

                <Typography variant="h3" className={styles.cardTitle}>
                  Acteur à vouaaar ! 
                </Typography>
            <div className={styles.border} />
            <br />
            <video controls  className={styles.video}>
              <source src={"https://static.ouaaa-transition.fr/static/video/"+id+".mov"} />
            </video>
            </div>
            )}
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
                    {data && data.actor.name}
                    {' '}
                    recherche des bénévoles
                  </Typography>
                  <br />
                  <div className={styles.volunteerDescription}>
                    {data
                      && Parser(data.actor.volunteerDescription)}
                  </div>
                  <div>
                    {data
                      && (containUser(data.actor.volunteers)
                        || hasClickVolunteer) && (
                        <button
                          className={styles.buttonVolunteer}
                          onClick={removeVolunteerHandler}
                        >
                          Je ne souhaite plus être bénévole
                        </button>
                    )}
                    {data
                      && !containUser(data.actor.volunteers)
                      && !hasClickVolunteer && (
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
            <Slider {...settingsSliderImage} className={[styles.slider]}>
              {data
                && data.actor.pictures
                && data.actor.pictures
                  .sort((a, b) => (a.position > b.position ? 1 : -1))
                  .map((picture) => (

                    <img
                      src={getImageUrl(picture.originalPicturePath)}
                      className={[styles.img]}
                      onClick={() => setOpenModalSlider(true)}
                    />
                  ))}
            </Slider>
            <Modal
              open={openModalSlider}
              onClose={() => setOpenModalSlider(false)}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={style}>
                <IconButton
                  aria-label="Close"
                  className={styles.closeButton}
                  onClick={() => setOpenModalSlider(false)}
                  size="large">
                  <CloseIcon />
                </IconButton>
                <Slider {...sliderSettings} className={[styles.slider]}>
                  {data
                    && data.actor.pictures
                    && data.actor.pictures
                      .sort((a, b) => (a.position > b.position ? 1 : -1))
                      .map((picture) => (

                        <img
                          src={getImageUrl(picture.originalPicturePath)}
                          className={[styles.imgModal]}
                          onClick={() => setOpenModalSlider(false)}
                        />
                      ))}
                </Slider>
              </Box>
            </Modal>
            <div>
              <Typography variant="h5" className={[styles.cardTitle]}>
                LES ÉVÉNEMENTS DE 
                {' '}
                {data && data?.actor?.name}
              </Typography>
              <div className={styles.border} />
            </div>
            <br />
            <Calendar
              events={events}
              withViewSwitcher={false}
              withAddEvent={
                (data && containUser(data.actor.referents) && data.actor.isValidated)
                || (user && user.role === 'admin')
              }
              className={styles.calendar}
            />
            <br />
            <div>
              <Typography variant="h5" className={[styles.cardTitle]}>
                LES ARTICLES DE 
                {' '}
                {data && data?.actor?.name}
              </Typography>
              <div className={styles.border} />
            </div>
            <br />
            <Slider
              {...settingsSliderImageArticle}
              className={[styles.articleCarroussel]}
            >
              {dataArticles
                && dataArticles?.articles.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).map((article) => {
                  return <CardSliderArticle key={article.id} article={article} />;
                })}
            </Slider>
          </Container>
          {
            ((data && containUser(data.actor.referents)) || (user && user.role === 'admin')) && (
              <Link href={`/actorAdmin/actor/${id}`}>
                <Fab className={styles.fab} aria-label="edit">
                  <EditIcon />
                </Fab>
              </Link>
            )
          }
          <div style={{ display: 'none' }}>
            <ActorToPrint actor={data.actor} ref={printRef} />
          </div>
          <div style={{ display: 'none' }}>
            <ActorGameToPrint actor={data.actor} ref={printGameRef} />
          </div>
        </Box>
      </>
    </AppLayout>
  );
};

// export default withListener(Actor)
export default withApollo()(Actor);
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(ctxt) {
  const startDate = moment();

  const recurrentOptions = null;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'actor',
      variables: {
        id: ctxt.params.id,
      },
      query: GET_ACTOR_SSR,
    }),
  });
  const endDate = moment();

  const initialData = await res.json();
  if (initialData.errors) {
    console.error(
      ` Error fetching actor id ${
        ctxt.params.id
      } error message : ${
        initialData.errors[0].message
      }`,
    );
  }
  const after = moment();

  return {
    props: { initialData },
  };
}
