import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Entries from 'containers/forms/Entries';
import ParentContainer from './ParentContainer';
import DateFilter from '../../containers/layouts/agendaPage/DateFilter';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#2C367E',
  },
  postCode: {
    '& input': {
      boxShadow: 'initial!important',
    },
    width: '100%',
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
    padding: 'inherit!important',
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
  listItemText: {
    marginTop: '0px',
    marginBottom: '0px',
  },
});

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
  const { collection, categoryChange, onCategoryChange } = props;
  const classes = useStyles();

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
              onCategoryChange={onCategoryChange}
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
    onFiltersChange
  } = props;
  const classes = useStyles();

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

  const [dataCollections, setDataCollections] = useState({});
  const [errorPostCode, setErrorPostCode] = useState(false);
  const [filters, setFilters] = useState({});

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

  const handleCategoryChange = useCallback((categories) => {
    let currentCategories = [...filters.categories || []];
    categories.forEach(newCategory => {
      const alreadyChecked = currentCategories.find(id => id === newCategory.id);
      if (alreadyChecked) {
        if (!newCategory.checked) {
          currentCategories = currentCategories.filter(id => id !== newCategory.id);
        }
      } else {
        if (newCategory.checked) {
          currentCategories.push(newCategory.id);
        }
      }
    });

    handleFilterChange('entries', currentCategories);
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

  const filterCollections = useMemo(() => {
    if (dataCollections && dataCollections.collections && dataCollections.collections.length > 0) {
      return dataCollections.collections.filter(collection => {
        return collection.filter && (isEventList ? collection.event : collection.actor)
      });
    }
    return [];
  }, [dataCollections, isEventList]);

  if (loadingCollections) return 'Loading...';
  if (errorCollections) return `Error! ${errorCollections.message}`;

  return (
    <Grid item xm={12} sm={2} alignItems="center">

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
                onCategoryChange={handleCategoryChange}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Grid>
  );
}

Filters.propTypes = {
  isEventList: PropTypes.bool,
  isActorList: PropTypes.bool,
  onFiltersChange: PropTypes.func
};

Filters.defaultProps = {
  isEventList: false,
  isActorList: false,
  onFiltersChange: () => { }
}

export default Filters;
