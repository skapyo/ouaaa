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
} from '@material-ui/core';

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
});

function Filters(props) {
  const { categoryChange } = props;
  const classes = useStyles();

  const GET_COLLECTIONS = gql`
{ collections
  {   id,
      label,
      multipleSelection,
      position
      entries {
          id,
          label
          subEntries {
              id,
              label
          }
      }
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
      if (e.target.value.length === 5 && (e.target.value).match(regex)) {
        setErrorPostCode(false);
      } else {
        setErrorPostCode(true);
      }
    },
    [setErrorPostCode],
  );

  const {
    loading: loadingCollections,
    error: errorCollections,
  } = useQuery(GET_COLLECTIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setDataCollections(data);
    },
  });
  if (loadingCollections) return 'Loading...';
  if (errorCollections) return `Error! ${errorCollections.message}`;

  return (
    <Grid item xs={2} alignItems="center">

      <TextField
        variant="outlined"
        label="Code Postal"
        name="postCode"
        onChange={postCodeChangeHandler}
        error={errorPostCode}
        helperText={errorPostCode ? 'Le code postal doit être oomposé de 5 chiffres' : ''}
      />

      {dataCollections.collections && dataCollections.collections.map((collection) => {
        //    const [display, setDisplay] = useState(false);
        return (
          <div>

            <Typography
              className={classes.collectionLabel}
       //       onClick={setDisplay(!display)}
            >
              {collection.label}
            </Typography>
            { // display &&
            IsTree(collection) && (

              collection.entries && collection.entries.map((entry) => {
                return (
                  <ParentContainer
                    key={entry.id}
                    entry={entry}
                    subEntries={entry.subEntries}
                    categoryChange={categoryChange}
                  />
                );
              })
            )
            }

            {!IsTree(collection) && (
            <List>
              {collection.entries && collection.entries.map((entry) => {
                return (
                  <ListItem
                    key={entry.id}
                    role={undefined}
                    dense
                  >
                    <ListItemText primary={entry.label} />
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      onChange={categoryChange}
                      name="{categoryChange.id}"
                      value={entry.id}
                      onClick={(e) => (e.stopPropagation())}
                    />
                  </ListItem>
                );
              })}
            </List>
            )}
          </div>
        );
      })}
    </Grid>
  );
}

Filters.propTypes = {
  categoryChange: PropTypes.func.isRequired,
};

export default Filters;
