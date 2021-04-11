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
import ParentContainer from './ParentContainer';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#bf083e',
  },
  postCode: {
    '& input': {
      boxShadow: 'initial!important',
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
      if (e.target.value.length === 5 && e.target.value.match(regex)) {
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
    <Grid item xs={2} alignItems="center">
      <TextField
        variant="outlined"
        label="Code Postal"
        name="postCode"
        onChange={postCodeChangeHandler}
        error={errorPostCode}
        helperText={
          errorPostCode ? 'Le code postal doit être oomposé de 5 chiffres' : ''
        }
      />

      {dataCollections.collections &&
        dataCollections.collections.map((collection) => {
          if (!(collection.filter && collection.actor)) return '';
          const compare = (a, b) => {
            return a.position > b.position;
          };
          return (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  className={classes.collectionLabel}
                  //       onClick={setDisplay(!display)}
                >
                  {collection.label}
                </Typography>
              </ExpansionPanelSummary>

              {
                // display &&
                IsTree(collection) &&
                  collection.entries &&
                  collection.entries.sort(compare).map((entry) => {
                    return (
                      <ParentContainer
                        key={entry.id}
                        entry={entry}
                        subEntries={entry.subEntries}
                        categoryChange={categoryChange}
                        parentCategoryChange={parentCategoryChange}
                      />
                    );
                  })
              }
              <ExpansionPanelDetails>
                {!IsTree(collection) && (
                  <List>
                    {collection.entries &&
                      collection.entries.map((entry) => {
                        return (
                          <ListItem key={entry.id} role={undefined} dense>
                            <ListItemText primary={entry.label} />
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                              onChange={(e) =>
                                otherCategoryChange(e, collection.label)
                              }
                              name="{categoryChange.id}"
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
