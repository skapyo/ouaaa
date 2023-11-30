import { useQuery } from '@apollo/client';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, Grid, Link, TextField, Typography, useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import makeStyles from '@mui/styles/makeStyles';
import Entries from 'containers/forms/Entries';
import SuggestActorForm from 'containers/forms/SuggestActorForm';
import gql from 'graphql-tag';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import DateFilter from '../../containers/layouts/agendaPage/DateFilter';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSessionState } from '../../context/session/session';
import ParentContainer from './ParentContainer';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    flexGrow: 1,
    maxWidth: 400,
    overflowY: 'auto',
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
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
  search: {
    height:"max-content"
  },
  indication: {
    fontSize:"0.9em"
  }
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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
  const [dataActorReferent, setDataActorReferent] = useState(null);
  const [errorPostCode, setErrorPostCode] = useState(false);
  const [filters, setFilters] = useState({});
  const [openFilters, setOpenFilters] = useState(false);
  const [openModalAddActor, setOpenModalAddActor] = useState(inviteActor);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles({ openFilters });
  const [favorite, setFavorite] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const handleFilterChange = useCallback((name, value) => {
    const currentFilters = filters || {};
    currentFilters[name] = value;
    setFilters(currentFilters);
    onFiltersChange(currentFilters);
  }, [filters, onFiltersChange]);

  const handleDateChange = useCallback((date) => {
    handleFilterChange('startingDate', date);
  }, [handleFilterChange]);


  const handleChangeperiodicEvent = useCallback((e) => {
  
    handleFilterChange('periodicEvent', e.target.checked);
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
    const currentEntries = [...(filters.entries || [])];
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
      <IconButton
        aria-label="Close"
        className={classes.closeButton}
        onClick={() => setOpenModalAddActor(false)}
        size="large">
        <CloseIcon />
      </IconButton>
  
      <h2 id="simple-modal-title">{ noEmailInviteActor ? "Ajouter l'acteur que vous avez contacté" : 'Inviter un nouvel acteur de la transition'}</h2>
      <p className={classes.indication}>Le site vous propose d’envoyer un mail de découverte à X en votre nom. Votre mail et votre nom ne sont conservés que le temps d’envoyer le mail. Toutes les traces sont ensuite supprimées. Le destinataire reçoit un mail d’invitation lui expliquant également que ses traces (nom/adresse/mail) ne sont pas conservés et l’invitant à venir découvrir l’initiative, notamment par une prise de contact direct avant de se créer une fiche acteur. Vous pouvez contacter le Délégué de la Protection des données dpd@ouaaa-transition.fr. Pour toute question, vous pouvez nous contacter <Link href={`/contact`} target="_blank"> en cliquant ici</Link></p>
      <SuggestActorForm noEmailInviteActor={noEmailInviteActor} />
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
        <Search className={classes.search}>
   
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
             onChange={(newValue) => { handleFilterChange('search', newValue.currentTarget.value); }}
             onCancelSearch={() => { handleFilterChange('search', ''); }}
              placeholder="Recherche par nom"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
      {isEventList && (
       <Grid  container className={classes.favoriteGrid}>
        <Grid item>
        <FormControlLabel control={<Switch defaultChecked onChange={handleChangeperiodicEvent} />} label="Evénements récurents" />
        </Grid>
      </Grid>
      )}
      <Grid container className={classes.favoriteGrid}>
        <Grid item xs={5}>
          <div className={classes.favorite} onClick={() => changeFavorite(!favorite)}>
          {
          favorite && (
            <FavoriteIcon className={classes.favoriteIcon} />
          )
        }
         {
            !favorite && (
              <FavoriteBorderIcon className={classes.favoriteIcon} />
            )
          }
          </div>
        </Grid>
        <Grid item xs={7}>
       
          <div>Mes favoris</div>
        </Grid>
      </Grid>

      {filterCollections.map((collection) => {
        return (
          <Accordion
            key={collection.id}
            defaultExpanded={IsTree(collection)}
            className={classes.expansionPanel}
          >
            <AccordionSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.collectionLabel}>
                {collection.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionPanelDetails}>
              <FilterItem
                collection={collection}
                onEntryChange={handleEntryChange}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}

      {
      !isEventList && (
        <>
        <Button
          variant="contained"
          color="secondary"
          className={classes.inviteActor}
          startIcon={<AddIcon />}
          onClick={handleOpenModalAddActor}
        >
          Inviter un acteur non référencé
        </Button>
        { (user.role === 'admin' || user.role === 'acteurAdminRole') && (
          <>
           <Link href={`/addactor?proposeNewActor=true`}>
            <Button
            variant="contained"
            color="secondary"
            className={classes.inviteActor}
            startIcon={<AddIcon />}
          >
            Ajouter un acteur non référencé
          </Button>
        </Link>
         </>    
          )}
        </>
     
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
