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
  useTheme
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Entries from 'containers/forms/Entries';
import ProposeActorForm from 'containers/forms/ProposeActorForm';

import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import ParentContainer from './ParentContainer';
import DateFilter from '../../containers/layouts/agendaPage/DateFilter';

const useStyles = makeStyles(theme => ({
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
      backgroundColor: 'white'
    }
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
      borderRadius: 0
    }
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
        boxShadow: 'none'
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
    flexDirection: 'column'
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

const FilterItem = props => {
  const { collection, categoryChange, onEntryChange } = props;
  const classes = useStyles();

  const handleCategoryChange = useCallback((entries) => {
    onEntryChange(entries, collection);
  }, [collection, onEntryChange])

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
  )
}

function Filters(props) {
  const {
    isEventList,
    onFiltersChange,
    closeHandler
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
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
    
  const [modalStyle] = React.useState(getModalStyle);
  const [dataCollections, setDataCollections] = useState(null);
  const [errorPostCode, setErrorPostCode] = useState(false);
  const [filters, setFilters] = useState({});
  const [openFilters, setOpenFilters] = useState(false);
  const [openModalAddActor, setOpenModalAddActor] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ openFilters });

  const handleFilterChange = useCallback((name, value) => {
    let currentFilters = filters || {};
    currentFilters[name] = value;
    setFilters(currentFilters);
    onFiltersChange(currentFilters);
  }, [filters, onFiltersChange]);

  const handleDateChange = useCallback(date => {
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
    let currentEntries = [...filters.entries || []];
    entries.forEach(newEntry => {
      const alreadyChecked = currentEntries.find(subEntries => subEntries.find(id => id === newEntry.id));
      if (alreadyChecked) {
        if (!newEntry.checked) {
          currentEntries[collection.position] = currentEntries[collection.position].filter(id => id !== newEntry.id);
        }
      } else {
        if (newEntry.checked) {
          let collectionEntries = currentEntries[collection.position] || [];
          collectionEntries.push(newEntry.id);
          currentEntries[collection.position] = collectionEntries;
        }
      }
    });

    handleFilterChange('entries', currentEntries);
  }, [filters, handleFilterChange]);

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
      return dataCollections.collections.filter(collection => {
        return collection.filter && (isEventList ? collection.event : collection.actor)
      });
    }
    return [];
  }, [dataCollections, isEventList]);

  if (loadingCollections && !dataCollections) return 'Loading...';
  if (errorCollections) return `Error! ${errorCollections.message}`;


  const bodyModalAddActor = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Inviter un nouvel acteur de la transition</h2>
      <ProposeActorForm />
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
};

Filters.defaultProps = {
  isEventList: false,
  isActorList: false,
  onFiltersChange: () => { },
  closeHandler: () => { },
}

export default Filters;
