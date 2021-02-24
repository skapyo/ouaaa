import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Checkbox,
} from '@material-ui/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledTreeItem from './StyledTreeItem';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#bf083e',
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
    <Grid item xs={2}>
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
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ArrowDropDownIcon />}
                  defaultExpandIcon={<ArrowRightIcon />}
                  defaultEndIcon={<div style={{ width: 24 }} />}
                >

              {collection.entries && collection.entries.map((entry) => {
                return (
                  <StyledTreeItem
                    key={entry.id}
                    nodeId={entry.id}
                    labelText={entry.label}

                  >  {entry.subEntries && entry.subEntries.map((subEntry) => {
                      return (
                        <StyledTreeItem
                          key={subEntry.id}
                          nodeId={subEntry.id}
                          labelText={subEntry.label}
                          categoryChange={categoryChange}
                        />
                      );
                    })}
                  </StyledTreeItem>
                );
              })}
            </TreeView>
            )
}            { //display &&
             !IsTree(collection) && (
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
