import React, { useEffect, useState } from 'react';
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
import Phone from '@material-ui/icons/Phone';
import Gavel from '@material-ui/icons/Gavel';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Language from '@material-ui/icons/Language';
import Share from '@material-ui/icons/Share';
import Schedule from '@material-ui/icons/Schedule';
import People from '@material-ui/icons/People';

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
  },
  cardTitleCategories: {
    color: theme.typography.h5.color,
  },
  infoValue: {
    color: theme.typography.h5.color,
    fontWeight: 700,
    whiteSpace: 'break-spaces',
  },
  infoLabel: {
    color: theme.typography.h5.color,
  },
  infoPratiqueGrid: {
    textAlign: 'center',
  },
  infoPratiqueTitle: {
    backgroundColor: '#2C367E',
    color: 'white',
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
    borderStyle: 'dashed',
  },
  infoDiv: {
    width: '100%',
  },
  icon: {
    color: '#bd0b3d',
  },
  img: {
    padding: '1em',
    maxHeight: '200px',
    width: 'inherit!important',
  },
  hide: {
    display: 'none',
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
    color: '#2C367E',
    'background-color': 'white',
    border: '2px solid #2C367E',

    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'line-through',
      color: 'white',
      'background-color': '#2C367E',
    },
    fontSize: '1em',
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '11%',
  },
  buttonVolunteer: {
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

const Actor = () => {
  const router = useRouter();
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
        categories {
          label
          parentCategory {
            label
          }
          subCategories {
            label
          }
        }
        entries {
          label
          collection {
            code
            label
          }
          parentEntry {
            code
            label
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
        }
        openingHours {
          days {
            id,
            day,
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

  const {
    data, loading, error, refetch,
  } = useQuery(GET_ACTOR, {
    variables: {
      id,
    },
    fetchPolicy: user && user.role === 'admin' ? 'no-cache' : 'cache-first',
  });
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
        return 'Lu ';
      case '2':
        return 'Ma ';
      case '3':
        return 'Mer ';
      case '4':
        return 'Jeu ';
      case '5':
        return 'Ven ';
      case '6':
        return 'Sam ';
      case '7':
        return 'Dim ';
      default:
        return '';
    }
  };

  const WEEKDAYS = [
    { id: 1, day: 'L', selected: false },
    { id: 2, day: 'M', selected: false },
    { id: 3, day: 'M', selected: false },
    { id: 4, day: 'J', selected: false },
    { id: 5, day: 'V', selected: false },
    { id: 6, day: 'S', selected: false },
    { id: 7, day: 'D', selected: false },
  ];
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
        && entry.parentEntry.collection.code === 'category' && nbEntry <= nbEntryToShow
      ) {
        text += `${entry.parentEntry.label} : ${entry.label}  `;
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
        && entry.collection.code === 'larochelle_quarter') {
        text += `, ${entry.label}`;
      }
    });
    return text;
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
                  data.actor.pictures.length >= 1
                    ? `url(${getImageUrl(
                      data.actor.pictures.sort((a, b) => (a.position > b.position ? 1 : -1))[0].croppedPicturePath,
                    )})`
                    : '',
              }}
            />
          )}
          <Container className={styles.cardInfo}>
            <Grid container>
              <Grid item md={7} sm={10} className={styles.threePointGrid}>
                <div>
                  <Typography variant="h2" className={styles.cardTitle}>
                    {data && data.actor.name}
                  </Typography>
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
                              {` ${
                                entry.parentEntry && entry.parentEntry.label
                              } `}
                              {/* @ts-ignore */}
                              :
                              {/* @ts-ignore */}
                              {` ${entry && entry.label}`}
                              {/* @ts-ignore */}
                            </Typography>
                          </div>
                      ),
                    )}
                </div>
                <p>{data && Parser(data.actor.description)}</p>
                <div />
              </Grid>

              <Grid item md={5} sm={10} className={[styles.align]}>
                <Grid container className={[styles.infoPratiqueGrid]}>
                  <Typography
                    variant="h7"
                    className={[
                      styles.infoPratiqueTitle,
                      styles.infoPratiqueItem,
                    ]}
                  >
                    INFOS PRATIQUES
                  </Typography>
                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <Place className={[styles.icon]} />
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
                            {`${data && data.actor.address} ${data && data.actor.city}`}
                          </span>
                        )}
                      </span>
                      { data && entriesHasElementWithCode(data.actor.entries, 'actor_location_action') && (
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
                  { data && entriesHasElementWithCode(data.actor.entries, 'public_target') && (
                  <div className={[styles.infoDiv]}>
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <SupervisedUserCircle className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>
                          Public principal visé
                        </div>
                        <span className={[styles.infoValue]}>
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
                      </Grid>
                    </Grid>
                  </div>
                  )}
                  { data && entriesHasElementWithCode(data.actor.entries, 'public_target') && (
                  <div className={[styles.infoDiv]}>
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <Gavel className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Statut</div>
                        <span className={[styles.infoValue]}>
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
                                    {` ${entry && entry.label}`}
                                  </Typography>
                                </div>
                            ),
                          )}
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                  )}
                  { data && data.actor.phone && (
                  <div className={[styles.infoDiv]}>
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <Phone className={[styles.icon]} />
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
                  { data && data.actor.email && (
                  <div className={[styles.infoDiv]}>
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <AlternateEmail className={[styles.icon]} />
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
                  { data && data.actor.website && (
                  <div className={[styles.infoDiv]}>
                    <Grid container className={[styles.item]}>
                      <Grid item xs={3} className={[styles.alignRight]}>
                        <Language className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Site internet</div>
                        <span className={[styles.infoValue]}>
                          <a href={data && data.actor.website} target="_blank" rel="noreferrer"> 
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
                        <Share className={[styles.icon]} />
                      </Grid>
                      <Grid item xs={8} className={[styles.alignLeft]}>
                        <div className={[styles.infoLabel]}>Réseau social</div>
                        <span className={[styles.infoValue]}>
                          <a
                            href={data && data.actor.socialNetwork}
                            target="_blank"
                          >
                            {data && data.actor.socialNetwork}
                          </a>
                          {/* @ts-ignore */}
                        </span>
                      </Grid>
                    </Grid>
                  )}
                  {data && data.actor.openingHours && (
                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <Schedule className={[styles.icon]} />
                    </Grid>
                    <Grid item xs={8} className={[styles.alignLeft]}>
                      <div className={[styles.infoLabel]}>Horaire</div>
                      {data && data.actor.openingHours.map((openingHour) => {
                        return (
                          <span className={[styles.infoValue]}>
                            {openingHour.days.map((day, index) => {
                              return (
                                <>
                                  {day.selected && getDay(day.id)}
                                </>
                              );
                            })}
                            {openingHour.hours.map((hourtab) => {
                              return (
                                <>
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
                            })}
                            <br />

                          </span>
                        );
                      })}
                    </Grid>
                  </Grid>

                  )}
                </Grid>
                { data && entriesHasElementWithCode(data.actor.entries, 'collectif') && (
                <div className={[styles.infoDiv]}>
                  <Grid container className={[styles.item]}>
                    <Grid item xs={3} className={[styles.alignRight]}>
                      <People className={[styles.icon]} />
                    </Grid>
                    <Grid item xs={8} className={[styles.alignLeft]}>
                      <div className={[styles.infoLabel]}>
                        Collectif & réseaux
                      </div>
                      <span className={[styles.infoValue]}>
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
                    </Grid>
                  </Grid>
                </div>
                )}
              </Grid>
            </Grid>

            {data && data.actor.volunteerDescription && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  Recherche de bénévoles
                </Typography>
                <p>{data && Parser(data.actor.volunteerDescription)}</p>
                <div className={styles.buttonVolunteer}>
                  {data && containUser(data.actor.volunteers) && (
                    <button
                      className={styles.buttonInverse}
                      onClick={removeVolunteerHandler}
                    >
                      Je ne souhaite plus être bénévole
                    </button>
                  )}
                  {!(data && containUser(data.actor.volunteers)) && (
                    <button
                      className={styles.button}
                      onClick={addVolunteerHandler}
                    >
                      Devenir bénévole
                    </button>
                  )}
                </div>
              </div>
            )}
            {data && data.actor.pictures && data.actor.pictures.length > 0 && (
              <div>
                <Typography variant="h5" className={styles.cardTitle}>
                  PHOTOS ET VIDEOS
                </Typography>
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

            {data
              && data.actor.pictures
              && (data.actor.events.length > 0
                || containUser(data.actor.referents)) && (
                <div>
                  <Typography
                    variant="h5"
                    className={[styles.cardTitle, styles.align]}
                  >
                    LES ÉVÉNEMENTS DE :
                    {' '}
                    {data && data.actor.name}
                  </Typography>
                </div>
            )}
            <Slider
              {...settingsSliderevent}
              className={[styles.articleCarroussel]}
            >
              {data && containUser(data.actor.referents) && (
                <CardAddEvent actor={data.actor} />
              )}

              {data
                && data.actor.events
                && data.actor.events.map((event) => (
                  <CardSliderEvent key={event.id} event={event} />
                ))}
            </Slider>
          </Container>
          <Newsletter />
          {((data && containUser(data.actor.referents))
            || (user && user.role === 'admin')) && (
            <a href={`/actorAdmin/actor/${id}`} target="_blank" rel="noreferrer">
              <Fab className={styles.fab} aria-label="edit">
                <EditIcon />
              </Fab>
            </a>
          )}
        </Box>
      </RootRef>
    </AppLayout>
  );
};

// export default withListener(Actor)
export default withApollo()(Actor);
// export async function getServerSideProps(context) {
//     console.log(context.req.headers.cookie)
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
