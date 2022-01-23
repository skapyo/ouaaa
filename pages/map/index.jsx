import React, {
  useCallback, useEffect, useRef, useState, useMemo,
} from 'react';
import {
  Grid, Typography, useMediaQuery, Button,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Actors from 'containers/layouts/mapPage/actors';
import Parser from 'html-react-parser';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Drawer from '@material-ui/core/Drawer';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ButtonGroupSelected from '../../components/buttons/ButtonGroupSelected';
import Filters from '../../components/filters';
import { getImageUrl } from '../../utils/utils';
import ActorPopup from '../../components/popup/ActorPopup';

import AppLayout from '../../containers/layouts/AppLayout';
import { withApollo } from '../../hoc/withApollo';

let matchesWindow = false;
if (typeof window !== 'undefined') {
  var L = require('leaflet');
  const { Map } = require('react-leaflet');
  const { TileLayer } = require('react-leaflet');
  const { Marker } = require('react-leaflet');
  const { Popup } = require('react-leaflet');
  const { Tooltip } = require('react-leaflet');
  const { ZoomControl } = require('react-leaflet');
  const MarkerClusterGroup = require('react-leaflet-markercluster').default;
  matchesWindow = window.matchMedia('(max-width: 600px)').matches;
}

const drawerWidth = 310;

const useStyles = makeStyles((theme) => ({
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
    height: 'calc(100vh - 100px)',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
      width: '100%',
    },
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
    },
  }),
  filterButtonIcon: ({ isMenuOpen }) => ({
    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  listButton: {
    position: 'absolute',
    bottom: 10,
    zIndex: 10000,
    color: '#fff',
    backgroundColor: '#2C367E',
    '&:hover': {
      color: '#2C367E',
      backgroundColor: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'initial',
      marginTop: 25,
      width: '75%',
    },
  },
  listButtonIcon: {
    marginRight: 10,
  },
  gridList: {
    overflow: 'hidden auto',
  },
  leftTitle: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(1),
    backgroundColor: '#F7F7F7',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  leftGridItem: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(2),
    borderRadius: '6px',
    width: '100%',
  },
  rightGridItem: {
    backgroundColor: '#FFFFFF',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(3),
    borderRadius: '6px',
    width: '100%',
  },
  topContainer: {
    padding: theme.spacing(4),
    maxWidth: '1120px',
  },
  leftTitles: {
    marginBottom: theme.spacing(10),
  },
  buyButton: {
    backgroundColor: '#009C95',
    width: '170px',
    borderRadius: '30px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: '#FFFFFF',
  },
  price: {},
  sticky: {
    position: 'sticky',
    top: '100px',
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
    boxShadow: '0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1)',
    padding: theme.spacing(3),
  },
  hightlightsBox: {
    padding: theme.spacing(2),
    backgroundColor: '#F9F9F9',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  stickyFirstLine: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: '#bd0b3d',
    width: '20px',
  },
  datePicker: {
    border: '0.5px solid',
    borderRadius: '10px',
    padding: theme.spacing(2),
    width: '100%',
    color: '#B0B0B0',
    marginBottom: theme.spacing(2),
    '& label': {
      position: 'relative',
      fontWeight: '800',
    },
    '&.MuiInput-formControl': {
      margin: '0px',
    },
  },
  root: {
    minWidth: 120,
    width: '220px',
    padding: 'inherit',
    'box-shadow': '0px 5px 26px -10px rgba(0, 0, 0, 0.46)',
    margin: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  categorie: {
    backgroundColor: 'white',
    borderRadius: '0.3em',
    width: 'max-content',
    padding: '0 5px 0 5px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  image: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    textAlign: 'inherit',
    height: '10em',
  },
  title: {
    textAlign: 'left',
    color: '#2C367E',
    width: '100%',
  },
  content: {
    padding: '10px',
    width: '100%',
  },
  date: {
    textAlign: 'right',
    color: '#2C367E',
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
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
    backgroundImage: "url('/arrow.svg')",
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
    color: '#2C367E;',
  },
  shortDescription: {
    wordBreak: 'break-all',
    width: '100%',
  },
  mapContainer: {
    height: '100% !important',
    [theme.breakpoints.down('sm')]: {
      height: '80vh !important',
    },
  },
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

const carto = () => {
  const mapRef = useRef();
  const isFirstRef = useRef(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { inviteActor, noEmailInviteActor } = router.query;
  const [categoriesChecked, setCategoriesChecked] = useState(categories.Sujets);

  const [otherCategoriesChecked, setOtherCategoriesChecked] = useState(
    otherCategories,
  );
  const [favorite, setFavorite] = useState(false);
  const [listMode, setListMode] = useState(true);
  const [postCode, setPostCode] = useState(null);
  const [filters, setFilters] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(!matchesWindow);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const { current = {} } = mapRef;
  }, [mapRef]);

  const styles = useStyles({ isMenuOpen, isMapMode: listMode });

  const position = [46.1085193, -0.9864794];

  const switchMode = useCallback(() => {
    setListMode(!listMode);
  }, [listMode]);

  if (typeof window !== 'undefined') {
    L.Icon.Default.mergeOptions({
      iconUrl: null,
    });
    const [popupOpen, setPopupOpen] = useState(false);
    const [stylesProps, setStylesProps] = useState({
      topImageSize: '250px',
      headerDisplay: 'static',
    });
    const GET_ACTORS = gql`
      query actors($entries: [[String]], $search: String,$postCode: String,$favoritesForUser: String,$isValidated: Boolean) {
        actors(entries: $entries, search: $search,postCode: $postCode,favoritesForUser: $favoritesForUser,isValidated: $isValidated) {
          id
          name
          address
          city
          shortDescription
          lat
          lng
          entries {
            label
            icon
            color
            description
            parentEntry {
              code
              label
              color
            }
          }
          favorites{
            id
          }
          pictures {
            id
            label
            originalPicturePath
            originalPictureFilename
            position
            logo
          }
        }
      }
    `;

    const {
      data, loading, error, refetch,
    } = useQuery(GET_ACTORS, {
      variables: {
        entries: [categoriesChecked],
        isValidated: true,
      },
    });

    useEffect(() => {
      // avoid first rendering

      const filterChange = () => {
        const newOtherCategoriesLists = Object.values(otherCategoriesChecked);
        const newEntries = [categoriesChecked];

        newOtherCategoriesLists.forEach((otherCategoryList) => {
          if (otherCategoryList.length > 0) newEntries.push(otherCategoryList);
        });

        if (isFirstRef.current) {
          // If filter still empty no refetch
          if (newEntries.length != 0 || typeof postcode !== 'undefined') {
            isFirstRef.current = false;
          } else {
            return;
          }
        }
        refetch({ entries: newEntries, postCode, isValidated: true });
      };
      filterChange();
    }, [categoriesChecked, otherCategoriesChecked, postCode]);

    const handleFiltersChange = useCallback((newFilters) => {
      setFilters(newFilters);
      refetch({ ...newFilters });
    }, [refetch]);

    function splitWord(word, number) {
      if (word != null) {
        const indexMax = Math.round(word.length / number);
        let wordSplit = '';
        if (indexMax > 1) {
          for (let i = 0; i < indexMax; i++) {
            wordSplit += word.slice(i * number, (i + 1) * number);
            if (i + 1 <= indexMax) {
              wordSplit += '<br><br> ';
            }
          }
          return wordSplit;
        }
        return word;
      }
      return '';
    }

    const otherCategoryChange = useCallback((e, collectionLabel) => {
      const newOtherCategories = { ...otherCategoriesChecked };

      const otherCategoryId = e.target.value;
      const tempCollection = newOtherCategories[collectionLabel];

      const currentIndex = tempCollection.indexOf(otherCategoryId);

      if (currentIndex === -1) {
        tempCollection.push(otherCategoryId);
      } else {
        tempCollection.splice(currentIndex, 1);
      }

      setOtherCategoriesChecked(newOtherCategories);
    });

    const fabActions = useMemo(() => {
      return [
        { name: 'map', label: 'Carte', onClick: switchMode },
        { name: 'list', label: 'Liste', onClick: switchMode },
      ];
    }, [switchMode]);

    return (
      <AppLayout hideFooter>
        <Head>
          <title>Les acteurs de la transition citoyenne et écologique autour de la Rochelle, Aunis, Charente-Maritime</title>
          <meta name="description" content="Viens découvrir les acteurs agissant pour :  l'éducation, la culture, la santé, l'alimentation, la justice, l'économie, la citoyenneté, l'agriculture, l'industrie, l'habitat, la mobilité, l'énergie, le recyclage, la réduction des déchets, le climat, la qualité de l'air, la biodiversité, la gestion de l'eau, l'aménagement du territoire et d'autres sujets sur la transition citoyenne et écologique" />
        </Head>
        <Grid container className={styles.layout}>
          <ButtonGroupSelected buttons={fabActions} />

          <Drawer
            anchor="left"
            variant={matches ? 'temporary' : 'persistent'}
            open={isMenuOpen}
            className={styles.drawer}
            classes={{
              paper: styles.drawerPaper,
            }}
            onClose={toggleMenu}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Filters
              onFiltersChange={handleFiltersChange}
              closeHandler={toggleMenu}
              isActorList
              inviteActor={inviteActor}
              noEmailInviteActor={noEmailInviteActor}
            />
          </Drawer>

          {
            (!matches || !isMenuOpen) && (
              <Button
                variant="contained"
                className={styles.filterButton}
                onClick={toggleMenu}
                startIcon={<DoubleArrowIcon className={styles.filterButtonIcon} />}
                color="primary"
              >
                Filtres
              </Button>
            )
          }

          {listMode && (
            <Grid item style={{ width: '100%' }}>
              <Map ref={mapRef} center={position} zoom={11} className={styles.mapContainer}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
                <MarkerClusterGroup>
                  {typeof data !== 'undefined'
                    && data.actors.map((actor, index) => {
                      let icone;
                      let color;
                      if (actor.lat != null && actor.lng != null) {
                        if (
                          actor.entries
                          && actor.entries.length > 0
                          && actor.entries[0].icon
                        ) {
                          icone = `/icons/marker/marker_${actor.entries[0].icon}.svg`;
                          color = actor.entries[0].color;
                        } else {
                          icone = '/icons/' + 'place' + '.svg';
                          color = 'ref';
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
                            position={[actor.lat, actor.lng]}
                            icon={suitcasePoint}
                          >
                            <Tooltip>
                              <div
                                className={styles.image}
                                style={{
                                  backgroundImage:
                                    actor.pictures.length >= 1
                                      ? `url(${getImageUrl(
                                        actor.pictures.sort((a, b) => (a.logo ? -1 : 1))[0].originalPicturePath,
                                      )})`
                                      : '',
                                }}
                              >
                                <div className={styles.categorie}>
                                  <Typography
                                    className={styles.categorie}
                                    style={{ color: actor?.entries && actor?.entries[0]?.parentEntry?.color }}
                                    gutterBottom
                                  >
                                    {actor.entries
                                      && actor.entries.length > 0
                                      && actor.entries[0].label}

                                  </Typography>
                                </div>
                              </div>

                              <div className={styles.content}>
                                <div className={styles.titleDiv}>
                                  <Typography
                                    variant="h6"
                                    component="h2"
                                    className={styles.title}
                                  >
                                    {actor && actor.name}
                                  </Typography>
                                </div>
                                <p>
                                  {!actor.address && actor.city && (
                                    <span>
                                      {/* @ts-ignore */}
                                      <img src="/icons/location.svg" alt="Localisation" className={[styles.icon]} />
                                      {' '}
                                      {actor.city}
                                    </span>
                                  )}
                                  {actor.address && actor.city && (
                                    <span>
                                      {/* @ts-ignore */}
                                      <img src="/icons/location.svg" alt="Localisation" className={[styles.icon]} />
                                      {' '}
                                      {`${actor.address} ${actor.city
                                      }`}
                                    </span>
                                  )}
                                </p>
                                <p className={styles.shortDescription}>
                                  {actor && Parser(splitWord(actor.shortDescription, 300))}
                                </p>

                              </div>
                            </Tooltip>
                            <Popup>
                              <ActorPopup actor={actor} />
                            </Popup>
                          </Marker>
                        );
                      }
                    })}
                </MarkerClusterGroup>
              </Map>
            </Grid>
          )}
          {!listMode && (
            <Grid item sm={10} xs={12} justify="center" className={styles.gridList}>
              {typeof data !== 'undefined' && <Actors data={data} />}
            </Grid>
          )}
        </Grid>
      </AppLayout>
    );
  }
  return <div />;
};
export default withApollo()(carto);
