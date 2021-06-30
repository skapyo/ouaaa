import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Checkbox,
  TextField,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
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
  entriesCheckbox: {
    padding: '1px',
  },
  listItemText: {
    marginTop: '0px',
    marginBottom: '0px',
  },
});

function Filters(props) {
  const {
    categoryChange,
    parentCategoryChange,
    postCodeChange,
    otherCategoryChange,
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
          subEntries {
            id
            label
            position
          }
        }
        filter
        actor
      }
    }
  `;
  function IsTree(collection) {
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
  }
  const [dataCollections, setDataCollections] = useState({});
  const [errorPostCode, setErrorPostCode] = useState(false);
  const postCodeChangeHandler = useCallback(
    (e) => {
      const regex = /[0-9]{5}/g;
      if (
        e.target.value.length === 0
        || (e.target.value.length === 5 && e.target.value.match(regex))
      ) {
        postCodeChange(e);
        setErrorPostCode(false);
      } else {
        setErrorPostCode(true);
      }
    },
    [setErrorPostCode],
  );

  const { loading: loadingCollections, error: errorCollections } = useQuery(
    GET_COLLECTIONS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        setDataCollections(data);
      },
    },
  );
  if (loadingCollections) return 'Loading...';
  if (errorCollections) return `Error! ${errorCollections.message}`;

  // TODO: not working
  const displayEntries = (id) => {
    expanded[id] = true;
  };

  return (
    <Grid item xm={12} sm={2} alignItems="center">
      <TextField
        variant="outlined"
        label="Code Postal"
        name="postCode"
        onChange={postCodeChangeHandler}
        error={errorPostCode}
        className={classes.postCode}
        helperText={
          errorPostCode ? 'Le code postal doit être oomposé de 5 chiffres' : ''
        }
      />

      {dataCollections.collections
        && dataCollections.collections.map((collection) => {
          if (!(collection.filter && collection.actor)) return '';
          const compare = (a, b) => {
            return a.position > b.position;
          };
          return (
            <ExpansionPanel defaultExpanded={ IsTree(collection) ? true : false}  className={classes.expansionPanel}>
              <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                <Typography
                  className={classes.collectionLabel}
                  //       onClick={setDisplay(!display)}
                >
                  {collection.label}
                </Typography>
              </ExpansionPanelSummary>
              <Entries className={classes.entries} initValues={[]}>
                {
                  // display &&
                  IsTree(collection)
                    && collection.entries
                    && collection.entries.sort(compare).map((entry) => {
                      return (
                        <ParentContainer
                          key={entry.id}
                          entry={entry}
                          subEntries={entry.subEntries}
                          categoryChange={categoryChange}
                          parentCategoryChange={parentCategoryChange}
                          isForm={false}
                        />
                      );
                    })
                }
              </Entries>
              <ExpansionPanelDetails className={classes.entriesExpend}>
                {!IsTree(collection) && (
                  <List className={classes.listEntries}>
                    {collection.entries
                      && collection.entries.map((entry) => {
                        return (
                          <ListItem
                            key={entry.id}
                            role={undefined}
                            className={classes.entries}
                          >
                            <ListItemText primary={entry.label}  className={classes.listItemText}/>
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                              onChange={(e) => otherCategoryChange(e, collection.label)}
                              name="{categoryChange.id}"
                              className={classes.entriesCheckbox}
                              value={entry.id}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
    </Grid>
  );
}

Filters.propTypes = {
  categoryChange: PropTypes.func.isRequired,
  parentCategoryChange: PropTypes.func.isRequired,
  otherCategoryChange: PropTypes.func.isRequired,
  postCodeChange: PropTypes.func.isRequired,
};

export default Filters;
