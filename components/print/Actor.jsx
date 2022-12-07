/* eslint-disable react/prop-types, import/no-unresolved, @typescript-eslint/explicit-module-boundary-types */
import React, {
  useMemo,
} from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Parser from 'html-react-parser';
import moment from 'moment';
import AppLayout from 'containers/layouts/AppLayout';
import {
  entriesHasElementWithCode,
  urlRectification,
  urlWithHttpsdefault,
} from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  align: {
    textAlign: 'center',
  },
  cardInfo: {
    backgroundColor: 'white',
    justify: 'center',
    marginTop: 20,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  infoPratiqueGrid: {
    textAlign: 'center',
    backgroundColor: '#ededf5',
    borderRadius: 5,
    '& > *:first-child': {
      border: 'none',
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 10,
    },
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem !important',
    },
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
      height: '100%',
      width: '100%',
      objectFit: 'contain',
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
}));

const ActorName = (props) => {
  const { name } = props;
  const classes = useStyles(props);

  if (!name) return null;

  return (
    <div>
      <Typography variant="h1" className={classes.cardTitle}>
        {name}
      </Typography>
      <div className={classes.border} />
    </div>
  );
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

const Actor = React.forwardRef((props, ref) => {
  const { actor } = props;
  const classes = useStyles();

  const actorPictures = actor?.pictures || [];

  const logo = useMemo(() => {
    const logoPictures = actorPictures.filter((picture) => picture.logo);
    return logoPictures.length > 0 ? logoPictures[0] : null;
  }, [actorPictures]);

  return (
    <AppLayout hideFooter ref={ref}>
      <Container className={classes.cardInfo}>
        <Grid container>
          <ActorName name={actor?.name} />
          <Grid item md={5} sm={10} className={[classes.align]}>
            <Grid container className={[classes.infoPratiqueGrid]}>
              {
                logo && logo.originalPicturePath && (
                  <div className={classes.image}>
                    <img
                      width="100%"
                      height="100px"
                      objectFit="contain"
                      src={`${process.env.NEXT_PUBLIC_URI}${logo.originalPicturePath}`}
                    />
                  </div>
                )
              }

              <Grid container alignItems="center" className={[classes.item]}>
                <Grid item xs={2}>
                  <img
                    src="/icons/location.svg"
                    alt="Localisation"
                    width="25"
                    height="25"
                    objectFit="contain"
                    className={[classes.icon]}
                  />
                </Grid>

                <Grid item container xs={10} direction="row" className={[classes.alignLeft]}>
                  <Grid item xs={6} container direction="column">
                    <div className={[classes.infoLabel]}>LOCALISATION</div>
                    <span className={[classes.infoValue]}>
                      {!actor?.city && (
                        <span> Adresse manquante</span>
                      )}
                      {!actor?.address && actor?.city && (
                        <span>
                          {/* @ts-ignore */}
                          {actor?.city}
                        </span>
                      )}
                      {actor?.address && actor?.city && (
                        <span>
                          {/* @ts-ignore */}
                          {`${actor?.address} ${actor?.city}`}
                        </span>
                      )}
                    </span>
                  </Grid>
                  {
                    entriesHasElementWithCode(
                      actor?.entries,
                      'actor_location_action',
                    ) && (
                      <Grid item xs={6} container direction="column" className={[classes.infoDiv]}>
                        <div className={[classes.infoLabel]}>
                          {'TERRITOIRE D\'ACTION'}
                        </div>
                        <span className={[classes.infoValue]}>
                          <Typography
                            variant="h7"
                            className={classes.cardTitleCategories}
                          >
                            {
                              actor?.entries
                                .filter((entry) => entry.collection?.code === 'actor_location_action')
                                .map((entry) => entry.label)
                                .join(' ')
                            }
                          </Typography>
                        </span>
                      </Grid>
                    )
                  }
                </Grid>
              </Grid>
              {(actor?.phone || actor?.email) && (
                <Grid container direction="row" className={[classes.item]}>
                  <Grid item xs container justifyContent="center" alignItems="center">
                    <Grid item xs={3} className={[classes.alignRight]}>
                      <img
                        src="/icons/phone.svg"
                        width="25"
                        height="25"
                        objectFit="contain"
                        alt="Téléphone"
                        className={[classes.icon]}
                      />
                    </Grid>
                    <Grid item xs={8} className={[classes.alignLeft]}>
                      <div className={[classes.infoLabel]}>TELEPHONE</div>
                      <span className={[classes.infoValue]}>
                        {actor?.phone}
                      </span>
                    </Grid>
                  </Grid>

                  <Grid item xs container justifyContent="center" alignItems="center">
                    <Grid item xs={3} className={[classes.alignRight]}>
                      <img
                        src="/icons/email.svg"
                        width="25"
                        height="25"
                        objectFit="contain"
                        alt="Email"
                        className={[classes.icon]}
                      />
                    </Grid>
                    <Grid item xs={8} className={[classes.alignLeft]}>
                      <div className={[classes.infoLabel]}>Email</div>
                      <span className={[classes.infoValue]}>
                        {actor?.email}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {(actor?.website || actor?.socialNetwork) && (
                <Grid container direction="row" className={[classes.item]}>
                  <Grid item xs={6} container justifyContent="center" alignItems="center">
                    <Grid item xs={3} className={[classes.alignRight]}>
                      <img
                        src="/icons/web_site.svg"
                        width="25"
                        height="25"
                        objectFit="contain"
                        alt="Site Web"
                        className={[classes.icon]}
                      />
                    </Grid>
                    <Grid item xs={8} className={[classes.alignLeft]}>
                      <div className={[classes.infoLabel]}>
                        Site internet
                      </div>
                      <span className={[classes.infoValue]}>
                        <a
                          href={urlWithHttpsdefault(actor?.website)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {actor?.website}
                        </a>
                        {/* @ts-ignore */}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} container justifyContent="center" alignItems="center">
                    <Grid item xs={3} className={[classes.alignRight]}>
                      <img
                        src="/icons/social.svg"
                        width="25"
                        height="25"
                        objectFit="contain"
                        alt="Réseau social"
                        className={[classes.icon]}
                      />
                    </Grid>
                    <Grid item xs={8} className={[classes.alignLeft]}>
                      <div className={[classes.infoLabel]}>Réseau social</div>
                      <span className={[classes.infoValue]}>
                        <a
                          href={urlWithHttpsdefault(actor?.socialNetwork)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {actor?.socialNetwork}
                        </a>
                        {/* @ts-ignore */}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {
                actor?.openingHours?.length !== 0 && (
                  <Grid container alignItems="center" className={[classes.item]}>
                    <Grid item xs={3} className={[classes.alignRight]}>
                      <img
                        src="/icons/clock.svg"
                        width="25"
                        height="25"
                        objectFit="contain"
                        alt="Horaire"
                        className={[classes.icon]}
                      />
                    </Grid>
                    <Grid item xs={8} className={[classes.alignLeft]}>
                      <div className={[classes.infoLabel]}>Horaire</div>
                      {
                        actor?.openingHours.map((openingHour) => {
                          return (
                            <span className={[classes.infoValue]}>
                              {openingHour.place}
                              {openingHour.place && ' , '}
                              {openingHour.days
                                .filter((day) => day.selected)
                                .map((day, index) => {
                                  return (
                                    <>
                                      {index !== 0 && 'et '}
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
                        })
                      }
                    </Grid>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
          <br />
          <Grid item md={7} sm={10} className={classes.description}>
            <br />
            <p>
              {actor && Parser(actor?.description)}
            </p>
            <div>
              {
                actor?.entries.map(
                  (entry) => entry?.parentEntry?.collection?.code === 'category' && (
                    <div>
                      <Typography
                        variant="h7"
                        className={classes.cardTitleCategories}
                      >
                        {/* @ts-ignore */}
                        {` ${entry.parentEntry && entry.parentEntry.label} `}
                        {/* @ts-ignore */}
                        :
                        {entry.icon && (
                          <img
                            src={`/icons/${entry.icon}.svg`}
                            alt="icon"
                            width="30"
                            height="25"
                            objectFit="contain"
                            className={classes.iconEntry}
                          />
                        )}
                        {/* @ts-ignore */}
                        {` ${entry && entry.label}`}
                        {/* @ts-ignore */}
                      </Typography>
                    </div>
                  ),
                )
              }
            </div>
            <br />
            {
              entriesHasElementWithCode(actor?.entries, 'actor_status') && (
                <div className={[classes.descriptionInfoDiv]}>
                  <img
                    src="/icons/status.svg"
                    alt="Collectif & réseau"
                    width="25"
                    height="25"
                    objectFit="contain"
                    className={[classes.icon]}
                  />
                  <div className={[classes.descriptionInfoLabel]}>
                    {' '}
                    Statut :
                  </div>
                  <span className={[classes.descriptionInfoValue]}>
                    {
                      actor?.entries.map(
                        (entry) => entry.collection?.code === 'actor_status' && (
                          <div>
                            <Typography
                              variant="h7"
                              className={classes.cardTitleCategories}
                            >
                              {`  ${entry && entry.label}`}
                            </Typography>
                          </div>
                        ),
                      )
                    }
                  </span>
                </div>
              )
            }
            {
              entriesHasElementWithCode(actor?.entries, 'public_target') && (
                <div className={[classes.descriptionInfoDiv]}>
                  <img
                    src="/icons/public.svg"
                    alt="Collectif & réseau"
                    width="25"
                    height="25"
                    objectFit="contain"
                    className={[classes.icon]}
                  />
                  <div className={[classes.descriptionInfoLabel]}>
                    Public principal visé
                  </div>
                  <span className={[classes.descriptionInfoValue]}>
                    {
                      actor?.entries.map(
                        (entry) => entry.collection?.code === 'public_target' && (
                          <div>
                            <Typography
                              variant="h7"
                              className={classes.cardTitleCategories}
                            >
                              {` ${entry && entry.label}`}
                            </Typography>
                          </div>
                        ),
                      )
                    }
                  </span>
                </div>
              )
            }
            {
              entriesHasElementWithCode(actor?.entries, 'collectif') && (
                <div className={[classes.descriptionInfoDiv]}>
                  <img
                    src="/icons/network.svg"
                    alt="Collectif & réseau"
                    width="25"
                    height="25"
                    objectFit="contain"
                    className={[classes.icon]}
                  />
                  <div className={[classes.descriptionInfoLabel]}>
                    Collectif & réseaux
                  </div>
                  <span className={[classes.descriptionInfoValue]}>
                    {
                      actor?.entries.map((entry) => entry.collection?.code === 'collectif' && (
                        <div>
                          <Typography
                            variant="h7"
                            className={classes.cardTitleCategories}
                          >
                            {` ${entry && entry.label}`}
                          </Typography>
                        </div>
                      ))
                    }
                  </span>
                </div>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
});

export default Actor;
