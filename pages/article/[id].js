import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Container, Grid,  Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withApollo } from 'hoc/withApollo.jsx';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Slider from 'react-slick/lib';
import CardSliderActor from 'components/cards/CardSliderActor';
import {
  Tooltip, Modal, Box,
} from '@mui/material';
import moment from 'moment';
import Moment from 'react-moment';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import Parser from 'html-react-parser';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'components/Link';
import Image from 'next/image';
import {
  getImageUrl,
  entriesHasElementWithCode,
  urlRectification,
  urlWithHttpsdefault,
} from '../../utils/utils';
import { useSessionState } from '../../context/session/session';
import Newsletter from '../../containers/layouts/Newsletter';
import Calendar from '../../components/Calendar';
import Favorite from '../../components/Favorite';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: theme.spacing(2),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '24em',
    color: 'white',
    'text-align': 'center',
    padding: '3em',
  },
  bannerUrl: {
    maxHeight: '23em',
    marginBottom: '4em',
    maxWidth: '100%',
  },
  bannerDiv: {
    textAlign: 'center',
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
    borderRadius: '0.5em',
    width: '80%',
    justify: 'center',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 755,
    marginTop: ({ hasBannerUrl }) => (hasBannerUrl ? -53 : 20),
    marginBottom: 20,
    boxShadow: '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
    [theme.breakpoints.down('md')]: {
      padding: '2em',
      width: 'auto',
      marginBottom: 0,
    },
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem !important',
    },
  },
  description: {
    wordBreak: 'break-word',
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  createdAt: {
    textAlign: 'right',
  },
  h1: {
    fontSize: '3rem',
  },
  map: {
    height: '30em',
    width: '30em',
    [theme.breakpoints.down('md')]: {
      width: '100% !important',
    },
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
    borderRadius: 5,
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
  favoriteIcon: {
    color: '#2C367E',
    cursor: 'pointer',
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
    borderWidth: '1px 0px 0px 0px',
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
  slider: {
    textAlign: 'center',
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
  buttonLink: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',

    borderRadius: '1.5em',
    padding: '0.5em 3em 0.5em 3em',
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
  imgModal: {
    padding: '1em',
    maxHeight: '50em',
    maxWidth: '100%',
    width: 'inherit!important',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: theme.palette.grey[500],
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

const GET_ARTICLE = `
    query article($id: String) {
      article(id: $id) {
        id
        label
        content
        shortDescription
        createdAt
        bannerPrincipalPicture
        pictures {
          id
          label
          originalPicturePath
          originalPictureFilename
          position
          logo
          main
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
            position
            logo
            main
          }
          referents {
            id
            surname
            lastname
          }
        }
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
const Article = ({ initialData }) => {
  const router = useRouter();
  const mapRef = useRef();
  const { id } = router.query;
  const [currentLocationWindows, setCurrentLocationWindows] = useState(null);
  const user = useSessionState();
  const { data } = initialData;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
  const [favorite, setFavorite] = useState(containUser(data?.article.favorites));
  const [cookies, setCookie, removeCookie] = useCookies();
  const [hasClickParticipate, setHasClickParticipate] = useState(false);
  const [openModalSlider, setOpenModalSlider] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocationWindows(window?.location);
    }
  }, []);

  const bannerUrl = useMemo(() => {
    return (data?.article?.pictures || []).filter((picture) => picture.main).length >= 1
      ? data.article.pictures.filter((picture) => picture.main)[0].originalPicturePath : null;
  }, [data]);

  const stylesProps = useMemo(() => ({
    topImageSize: '250px',
    headerDisplay: 'static',
    hasBannerUrl: bannerUrl !== null,
  }), []);

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
  const styles = useStyles(stylesProps);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const maxSlideToShowEvent = !matches ? 5 : 1;
  const settingsSliderarticle = {
    infinite: true,
    slidesToShow:
      data && data.article.actors.length >= maxSlideToShowEvent
        ? maxSlideToShowEvent
        : data && data.article.actors.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow />,
    prevArrow: <SliderArrow />,
  };
  const actorPictures = data?.article?.pictures || [];
  const maxSlideToShowImage = !matches ? 3 : 1;
  const maxSlideToShowArticle = !matches ? 5 : 1;
  const settingsSliderImage = useMemo(() => {
    return {
      ...sliderSettings,
      slidesToShow: actorPictures.length >= maxSlideToShowImage
        ? maxSlideToShowImage
        : actorPictures.length,
    };
  }, [actorPictures, sliderSettings, maxSlideToShowImage]);

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
  return (
    <AppLayout>
      <Head>
        <title>
          {/* @ts-ignore */}
          {data && data.article.label}
          {' '}
          {/* @ts-ignore */}
        </title>
        {bannerUrl &&  (
        <>
          <meta
            property="og:image"
            content={getImageUrl(bannerUrl)}
          />
          <meta
            name="twitter:image"
            content={getImageUrl(bannerUrl)}
          />
        </>
        )}

        <meta property="og:title" content={data && data.article.label} />
        <meta property="og:description" content={data && data.article.shortDescription} />
        <meta name="twitter:title" content={data && data.article.label} />
        <meta name="twitter:description" content={data && data.article.shortDescription} />

      </Head>
      <>
        <Box>
          {bannerUrl  &&  data.article.bannerPrincipalPicture && (
            <Container
              className={styles.titleContainer}
              style={{
                backgroundImage: `url(${getImageUrl(bannerUrl)})`,
              }}
            />
          )}
            {!data.article.bannerPrincipalPicture && (
              <div  className={[styles.bannerDiv]}>
               
                <img
                    src={getImageUrl(bannerUrl)}
                    className={[styles.bannerUrl]}
                            />
  
            </div>
        
          )}
          <Container className={styles.cardInfo}>
            <Grid container>
              <Grid item md={12} sm={10} className={styles.description}>
                <Typography variant="h1" className={styles.cardTitle}>
                  {data && data.article.label}
                </Typography>
                <div className={styles.border} />
                <br />
                <br />
                <div className={styles.description}>
                  <div>
                    {' '}
                    {data && Parser(data.article.content)}
                  </div>
                </div>
                <br />
                <div className={styles.createdAt}>
                  Publié le
                  {' '}
                  <Moment format="DD/MM/YYYY HH:mm" unix>
                    {data &&  data.article && data.article.createdAt / 1000}
                  </Moment>
                </div>
                {data && data.article.pictures && data.article.pictures.length > 0 && (
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
                    && data.article.pictures
                    && data.article.pictures
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
                        && data.article.pictures
                        && data.article.pictures
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
                <br />
                <br />
                {data && data.article.actors && data.article.actors.length > 0 && (
                  <div>
                    <Typography variant="h5" className={styles.cardTitle}>
                      LES ACTEURS PARTICIPANTS
                    </Typography>
                    <div className={styles.border} />
                    <br />
                  </div>
                )}
                <Slider
                  {...settingsSliderarticle}
                  className={[styles.articleCarroussel]}
                >
                  {data
                    && data.article.actors.map((actor) => {
                      return <CardSliderActor key={actor.id} actor={actor} />;
                    })}
                </Slider>
                <br />

              </Grid>
            </Grid>
          </Container>
          {((data
            && (containUser(data.article.referents)
              || containUserActorsReferent(data.article.actors)))
            || (user && user.role === 'admin')) && (
              <Link href={`/actorAdmin/article/${id}`}>
                <Fab className={styles.fab} aria-label="edit">
                  <EditIcon />
                </Fab>
              </Link>
          )}
        </Box>
      </>
    </AppLayout>
  );
};

// export default withListener(Actor)
export default withApollo()(Article);

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(ctxt) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({
      operationName: 'article',
      variables: {
        id: ctxt.params.id,
      },
      query: GET_ARTICLE,
    }),
  });

  const initialData = await res.json();
  if (initialData.errors) {
    console.error(
      ` Error fetching article id ${ctxt.params.id
      } error message : ${initialData.errors[0].message
      }`,
    );
  }

  return {
    props: {
      initialData,
    },
  };
}
