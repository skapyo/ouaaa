import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  useTheme,
} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import gql from 'graphql-tag';
import { useSnackbar } from 'notistack';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Entries from 'containers/forms/Entries';
import ProposeActorForm from 'containers/forms/ProposeActorForm';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ParentContainer from './ParentContainer';
import DateFilter from '../../containers/layouts/agendaPage/DateFilter';
import { useSessionState } from '../../context/session/session';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    flexGrow: 1,
    maxWidth: 400,
    overflowY: 'auto',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
      paddingBottom: 56,
    },
    '& > *:not(button)': {
      width: '100%',
      backgroundColor: 'white',
    },
  }),
  collectionLabel: {
    textAlign: 'center',
    color: '#2C367E',
  },
  postCode: {
    '& input': {
      boxShadow: 'initial!important',
    },
    width: '100%',
    '& .MuiInputBase-root': {
      borderRadius: 0,
    },
  },
  listItem: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  postCodeLayout: {
    textAlign: 'center',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  listEntries: {
    width: '100%',
    padding: 'inherit!important',
  },
  entriesExpend: {
    padding: 'inherit!important',
  },
  entries: {
    padding: '0px 5px 0px 5px!important',
  },
  expansionPanel: {
    margin: 'inherit!important',
    [theme.breakpoints.down('sm')]: {
      '&:nth-last-child(2)': {
        boxShadow: 'none',
      },
    },
  },
  inviteActor: {
    width: '90%',
    margin: '1em',
  },
  expansionPanelSummary: {
    padding: '0px 5px 0px 5px!important',
  },
  expansionPanelDetails: {
    flexDirection: 'column',
  },
  entriesCheckbox: {
    padding: '1px',
  },
  filterButton: {
    color: 'white',
    backgroundColor: '#2c367e !important',
    position: 'absolute',
    bottom: 0,
    margin: '10px 0',
    width: '80%',
  },
  filterButtonIcon: {
    transform: 'rotate(180deg)',
  },
  listItemText: {
    marginTop: '0px',
    marginBottom: '0px',
  },
  paper: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: theme.palette.grey[500],
  },
  favoriteGrid: {
    textAlign: 'center',
    borderBottom: '0.1em solid rgb(200, 200, 200)',
    borderWidth: '1px',
    padding: '0.3em',
    marginTop: '10px',
  },
  favoriteIcon: {
    color: '#2C367E;',
  },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const compare = (a, b) => a.position > b.position;

const IsTree = (collection) => {
  let isTree = false;
  if (collection.entries) {
    collection.entries.map((entry) => {
      if (entry.subEntries) {
        entry.subEntries.map(() => {
          isTree = true;
          return isTree;
        });
      }
    });
  }
  return isTree;
};

const FilterItem = (props) => {
  const { collection, categoryChange, onEntryChange } = props;
  const classes = useStyles();

  const handleCategoryChange = useCallback((entries) => {
    onEntryChange(entries, collection);
  }, [collection, onEntryChange]);

  return (
    <Entries className={classes.entries} initValues={[]}>
      {
        (collection?.entries || []).sort(compare).map((entry) => {
          return (
            <ParentContainer
              key={entry.id}
              entry={entry}
              subEntries={entry.subEntries}
              categoryChange={categoryChange}
              onCategoryChange={handleCategoryChange}
              isForm={false}
            />
          );
        })
      }
    </Entries>
  );
};

function Filters(props) {
  const {
    isEventList,
    onFiltersChange,
    closeHandler,
    inviteActor,
    noEmailInviteActor,
  } = props;

  const GET_COLLECTIONS = gql`
  {
    collections {
        id
        label
        multipleSelection
        position
        entries {
          id
          label
          position
          color
          icon
          description
          subEntries {
            id
            label
            position
            color
            icon
            description
          }
        }
        filter
        actor
        event
      }
    }
  `;

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      height: '90%',
      overflow: 'auto',
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);

  const [dataCollections, setDataCollections] = useState(null);
  const [errorPostCode, setErrorPostCode] = useState(false);
  const [filters, setFilters] = useState({});
  const [openFilters, setOpenFilters] = useState(false);
  const [openModalAddActor, setOpenModalAddActor] = useState(inviteActor);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ openFilters });
  const [favorite, setFavorite] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const FavoriteIconComponent = useMemo(() => {
    return favorite ? FavoriteRoundedIcon : FavoriteBorderRoundedIcon;
  }, [favorite]);

  const handleFilterChange = useCallback((name, value) => {
    const currentFilters = filters || {};
    currentFilters[name] = value;
    setFilters(currentFilters);
    onFiltersChange(currentFilters);
  }, [filters, onFiltersChange]);

  const handleDateChange = useCallback((date) => {
    handleFilterChange('startingDate', date);
  }, [handleFilterChange]);

  const handleChangePostCode = useCallback((e) => {
    const regex = /[0-9]{5}/g;
    if (
      e.target.value.length === 0
      || (e.target.value.length === 5 && e.target.value.match(regex))
    ) {
      handleFilterChange('postCode', e.target.value);
      setErrorPostCode(false);
    } else {
      setErrorPostCode(true);
    }
  }, [setErrorPostCode]);

  const handleEntryChange = useCallback((entries, collection) => {
    const currentEntries = [...filters.entries || []];
    entries.forEach((newEntry) => {
      const alreadyChecked = currentEntries.find((subEntries) => subEntries != undefined && subEntries.find((id) => id === newEntry.id));
      if (alreadyChecked) {
        if (!newEntry.checked) {
          currentEntries[collection.position] = currentEntries[collection.position].filter((id) => id !== newEntry.id);
        }
      } else if (newEntry.checked) {
        const collectionEntries = currentEntries[collection.position] || [];
        collectionEntries.push(newEntry.id);
        currentEntries[collection.position] = collectionEntries;
      }
    });

    handleFilterChange('entries', currentEntries);
  }, [filters, handleFilterChange]);
  const user = useSessionState();
  const changeFavorite = (isFavorite) => {
    if (user == null) {
      enqueueSnackbar('Veuillez vous connecter pour filtrer sur vos favoris ', {
        preventDuplicate: true,
      });
    } else {
      setFavorite(isFavorite);
      if (isFavorite) {
        handleFilterChange('favoritesForUser', user.id);
      } else {
        handleFilterChange('favoritesForUser', null);
      }
    }
  };
  const { loading: loadingCollections, error: errorCollections } = useQuery(
    GET_COLLECTIONS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        setDataCollections(data);
      },
    },
  );
  const handleOpenModalAddActor = () => {
    setOpenModalAddActor(true);
  };

  const handleCloseModalAddActor = () => {
    setOpenModalAddActor(false);
  };
  const filterCollections = useMemo(() => {
    if (dataCollections && dataCollections.collections && dataCollections.collections.length > 0) {
      return dataCollections.collections.filter((collection) => {
        return collection.filter && (isEventList ? collection.event : collection.actor);
      });
    }
    return [];
  }, [dataCollections, isEventList]);

  if (loadingCollections && !dataCollections) return 'Loading...';
  if (errorCollections) return `Error! ${errorCollections.message}`;

  const bodyModalAddActor = (
    <div style={modalStyle} className={classes.paper}>
      <IconButton aria-label="Close" className={classes.closeButton} onClick={() => setOpenModalAddActor(false)}>
        <CloseIcon />
      </IconButton>
      <h2 id="simple-modal-title">{ noEmailInviteActor ? "Ajouter l'acteur que vous avez contacté" : 'Inviter un nouvel acteur de la transition'}</h2>
      <p>Le site vous propose d’envoyer un mail de découverte à X en votre nom. Votre mail et votre nom ne sont conservés que le temps d’envoyer le mail. Toutes les traces sont ensuite supprimées. Le destinataire reçoit un mail d’invitation lui expliquant également que ses traces (nom/adresse/mail) ne sont pas conservés et l’invitant à venir découvrir l’initiative, notamment par une prise de contact direct avant de se créer une fiche acteur. Vous pouvez contacter le Délégué de la Protection des données dpd@ouaaa-transition.fr</p>
      <ProposeActorForm noEmailInviteActor={noEmailInviteActor} />
    </div>
  );
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      wrap="nowrap"
      className={classes.root}
    >

      {
        isEventList && (
          <DateFilter
            onDateChange={handleDateChange}
          />
        )
      }
      <SearchBar
       // value={this.state.value}
        placeholder="Recherche par nom"
        onChange={(newValue) => { handleFilterChange('search', newValue); }}
        onCancelSearch={() => { handleFilterChange('search', ''); }}

        // onRequestSearch={() => doSomethingWith(this.state.value)}
      />
      <TextField
        variant="outlined"
        label="Code Postal"
        name="postCode"
        onChange={handleChangePostCode}
        error={errorPostCode}
        className={classes.postCode}
        helperText={
          errorPostCode ? 'Le code postal doit être composé de 5 chiffres' : ''
        }
      />
      <Grid container className={classes.favoriteGrid}>
        <Grid item xs={5}>
          <div className={classes.favorite} onClick={() => changeFavorite(!favorite)}>
            <FavoriteIconComponent className={classes.favoriteIcon} />
          </div>
        </Grid>
        <Grid item xs={7}>
          <div>Mes favoris</div>
        </Grid>
      </Grid>

      {filterCollections.map((collection) => {
        return (
          <ExpansionPanel
            key={collection.id}
            defaultExpanded={IsTree(collection)}
            className={classes.expansionPanel}
          >
            <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.collectionLabel}>
                {collection.label}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <FilterItem
                collection={collection}
                onEntryChange={handleEntryChange}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}

      {
      !isEventList && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.inviteActor}
          startIcon={<AddIcon />}
          onClick={handleOpenModalAddActor}
        >
          Inviter un acteur non référencé
        </Button>
      )
    }
      <Modal
        open={openModalAddActor}
        onClose={handleCloseModalAddActor}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        {bodyModalAddActor}
      </Modal>
      {
        matches && (
          <Button
            variant="contained"
            className={classes.filterButton}
            onClick={closeHandler}
            startIcon={<DoubleArrowIcon className={classes.filterButtonIcon} />}
            color="primary"
          >
            Filtres
          </Button>
        )
      }
    </Grid>
  );
}

Filters.propTypes = {
  isEventList: PropTypes.bool,
  isActorList: PropTypes.bool,
  onFiltersChange: PropTypes.func,
  closeHandler: PropTypes.func,
  inviteActor: PropTypes.bool,
  noEmailInviteActor: PropTypes.bool,

};

Filters.defaultProps = {
  isEventList: false,
  isActorList: false,
  inviteActor: false,
  noEmailInviteActor: false,
  onFiltersChange: () => { },
  closeHandler: () => { },
};

export default Filters;
