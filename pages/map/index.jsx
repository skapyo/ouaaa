import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Collapse from '@material-ui/core/Collapse/Collapse';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from '../../components/Link';
import { withApollo } from '../../hoc/withApollo';
import AppLayout from '../../containers/layouts/AppLayout';
import { getImageUrl } from '../../utils/utils';
import Fab from '@material-ui/core/Fab';
import Actors from 'containers/layouts/mapPage/actors';
import Filters from '../../components/filters';
import Parser from 'html-react-parser';

if (typeof window !== 'undefined') {
  var L = require('leaflet');
  var Map = require('react-leaflet').Map;
  var TileLayer = require('react-leaflet').TileLayer;
  var Marker = require('react-leaflet').Marker;
  var Popup = require('react-leaflet').Popup;
  var Tooltip = require('react-leaflet').Tooltip;
  var MarkerClusterGroup = require('react-leaflet-markercluster').default;
}

const useStyles = makeStyles((theme) => ({
  layout: {
    backgroundColor: '#F6F6F6',
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
  listButton: {
    marginBottom: '-4em',
    zIndex: '10000',
    color: '#fff',
    backgroundColor: '#2C367E',
    '&:hover': {
      color: '#2C367E',
      backgroundColor: '#fff',
    },
  },
  shortDescription: {
    wordBreak: 'break-all',
    width: '100%',
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
  const [categoriesChecked, setCategoriesChecked] = useState(categories.Sujets);
  const [otherCategoriesChecked, setOtherCategoriesChecked] = useState(
    otherCategories,
  );
  const [favorite, setFavorite] = useState(false);
  const [listMode, setListMode] = useState(true);
  const [postCode, setPostCode] = useState(null);
  const isFirstRef = useRef(true);

  useEffect(() => {
    const { current = {} } = mapRef;
  }, [mapRef]);

  const styles = useStyles();

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
      query actors($entries: [[String]], $postCode: String,$isValidated: Boolean) {
        actors(entries: $entries, postCode: $postCode,isValidated: $isValidated) {
          id
          name
          address
          city
          shortDescription
          lat
          lng
          categories {
            label
            icon
            color
          }
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
          }
        }
      }
    `;

    const { data, loading, error, refetch } = useQuery(GET_ACTORS, {
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
          //If filter still empty no refetch
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

    const parentCategoryChange = useCallback((arr) => {
      const tempCategories = [...categoriesChecked];
      const tempCategoriesChecked = [];
      const tempCategoriesUnchecked = [];
      arr.forEach((checkbox) => {
        const { checked, id } = checkbox;
        if (checked) {
          tempCategoriesChecked.push(id);
        }
        if (!checked) {
          tempCategoriesUnchecked.push(id);
        }
      });

      // delete the unchecked boxes
      tempCategoriesUnchecked.forEach((value) => {
        const currentIndex = tempCategories.indexOf(value);
        if (currentIndex !== -1) {
          tempCategories.splice(currentIndex, 1);
        }
      });

      // add the recent checkedboxes
      const newCategoriesChecked = [
        ...new Set([...tempCategories, ...tempCategoriesChecked]),
      ];

      setCategoriesChecked(newCategoriesChecked);
    });

    const categoryChange = useCallback((e) => {
      const tempCategories = [...categoriesChecked];

      const categoryId = e.target.value;

      const currentIndex = tempCategories.indexOf(categoryId);

      if (currentIndex === -1) {
        tempCategories.push(categoryId);
      } else {
        tempCategories.splice(currentIndex, 1);
      }

      setCategoriesChecked(tempCategories);
    });

    const postCodeChange = (e) => {
      if (e.target.value == '') {
        setPostCode(null);
      } else {
        setPostCode(e.target.value);
      }
    };

    function splitWord(word, number) {
      if (word != null) {
        var indexMax = Math.round(word.length / number);
        var wordSplit = '';
        if (indexMax > 1) {
          for (let i = 0; i < indexMax; i++) {
            wordSplit += word.slice(i * number, (i + 1) * number);
            if (i + 1 <= indexMax) {
              wordSplit += '<br><br> '
            }
          }
          return wordSplit;
        } else {
          return word;
        }
      } else {
        return '';
      }
    };

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

    return (
      <AppLayout>
        <Grid container className={styles.layout}>
          <Grid container justify="center">
            <Fab
              variant="extended"
              size="medium"
              aria-label="add"
              className={styles.listButton}
              onClick={switchMode}
            >
              {listMode && <span>Liste</span>} {!listMode && <span>Carte</span>}
            </Fab>
          </Grid>
          <Filters
            parentCategoryChange={parentCategoryChange}
            categoryChange={categoryChange}
            otherCategoryChange={otherCategoryChange}
            postCodeChange={postCodeChange}
            isActorList
          />

          {listMode && (
            <Grid item sm={10} xs={12}>
              <Map ref={mapRef} center={position} zoom={11}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                  {typeof data !== 'undefined' &&
                    data.actors.map((actor, index) => {
                      let icone;
                      let color;
                      if (actor.lat != null && actor.lng != null) {
                        if (
                          actor.entries &&
                          actor.entries.length > 0 &&
                          actor.entries[0].icon
                        ) {
                          icone = '/icons/marker/marker_' + actor.entries[0].icon + '.svg';
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
                            <Tooltip
                            >
                              <div
                                className={styles.image}
                                style={{
                                  backgroundImage:
                                    actor.pictures.length >= 1
                                      ? `url(${getImageUrl(
                                        actor.pictures.sort((a, b) =>
                                          a.logo ? -1 : 1,
                                        )[0].croppedPicturePath,
                                      )})`
                                      : '',
                                }}
                              >
                                <div className={styles.categorie}
                                >
                                  <Typography
                                    className={styles.categorie}
                                    style={{ color: actor?.entries[0]?.parentEntry?.color }}
                                    gutterBottom
                                  >
                                    {actor.entries &&
                                      actor.entries.length > 0 &&
                                      actor.entries[0].label}



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
                                <p className={styles.shortDescription}>
                                  {!actor.address && actor.city && (
                                    <span>
                                      {/* @ts-ignore */}
                                      <img src={"/icons/location.svg"} alt="Localisation" className={[styles.icon]} /> {actor.city}
                                    </span>
                                  )}
                                  {actor.address && actor.city && (
                                    <span>
                                      {/* @ts-ignore */}
                                      <img src={"/icons/location.svg"} alt="Localisation" className={[styles.icon]} /> {`${actor.address} ${actor.city
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
                              <div
                                className={styles.image}
                                style={{
                                  backgroundImage:
                                    actor.pictures.length >= 1
                                      ? `url(${getImageUrl(
                                        actor.pictures[0].croppedPicturePath,
                                      )})`
                                      : '',
                                }}
                              >
                                <div className={styles.categorie} >
                                  <Typography
                                    className={styles.categorie}
                                    style={{ color: actor?.entries[0]?.parentEntry?.color }}
                                    gutterBottom
                                  >
                                    {actor.entries &&
                                      actor.entries.length > 0 &&
                                      actor.entries[0].label}
                                  </Typography>
                                </div>
                              </div>
                              <div className={styles.content}>
                                <Grid container>
                                  <Grid item xs={10}>
                                    <div className={styles.titleDiv}>
                                      <Typography
                                        variant="h6"
                                        component="h2"
                                        className={styles.title}
                                      >
                                        {actor && actor.name}
                                      </Typography>
                                    </div>
                                    <p className={styles.shortDescription}>
                                      {!actor.address && actor.city && (
                                        <span>
                                          {/* @ts-ignore */}
                                          <img src={"/icons/location.svg"} alt="Localisation" className={[styles.icon]} /> {actor.city}
                                        </span>
                                      )}
                                      {actor.address && actor.city && (
                                        <span>
                                          {/* @ts-ignore */}
                                          <img src={"/icons/location.svg"} alt="Localisation" className={[styles.icon]} /> {`${actor.address} ${actor.city
                                            }`}
                                        </span>
                                      )}
                                    </p>
                                  </Grid>

                                  <Grid item xs={2}>
                                    <div
                                      className={styles.favorite}
                                      onClick={() => setFavorite(!favorite)}
                                    >
                                      {!favorite && (
                                        <FavoriteBorderRoundedIcon
                                          className={styles.favoriteIcon}
                                        />
                                      )}
                                      {favorite && (
                                        <FavoriteRoundedIcon
                                          className={styles.favoriteIcon}
                                        />
                                      )}
                                    </div>
                                  </Grid>
                                </Grid>

                                <Typography component="p">
                                  {actor && actor.shortDescription}
                                </Typography>
                              </div>
                              <a href={`/actor/${actor.id}`} target="_blank">
                                <button className={styles.buttonGrid}>
                                  EN SAVOIR PLUS
                                </button>
                              </a>
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
            <Grid item sm={10} xs={12} justify="center">
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
