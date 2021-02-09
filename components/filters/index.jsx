import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledTreeItem from './StyledTreeItem';

/* function Filters(props) {
  const { dataCategorie, categoryChange } = props;

  const [checked, setChecked] = useState([0]);
  const newChecked = [...checked];

  const handleToggle = (value, index) => () => {
    const currentIndex = checked.indexOf(value);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    open[index] = !open[index];
  };

  // const [open, setOpen] = React.useState([false]);

  return (
    <Grid item xs={2}>
      <List>
        {typeof dataCategorie !== 'undefined' && dataCategorie.categories.map((category, index) => {
          return (
            <div>
              <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0, index)}>
                <ListItemIcon />
                <ListItemText primary={category.label} />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {typeof category.subCategories !== 'undefined' && category.subCategories != null && category.subCategories.map((subcategory, subIndex) => {
                return (
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            name="categories"
                            value={subcategory.id}
                            onChange={categoryChange}
                          />
                        </ListItemIcon>
                        <ListItemText primary={subcategory.label} />
                      </ListItem>
                    </List>
                  </Collapse>
                );
              })}
            </div>
          );
        })}

      </List>
    </Grid>
  );
} */






const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function Filters(props) {
  const { categoryChange } = props;
  const classes = useStyles();

  const GET_CATEGORIES = gql`
  { categories
    {   id,
        label
        icon
        color
        
        subCategories {
            id,
            label
            icon
            color
            subCategories {
                id,
                label
                icon
                color
                subCategories {
                    label
                    icon
                }
            }
        }
    }
  }
  `;

  const [dataCategorie, setDataCategorie] = useState({});
  const {
    loading: loadingCategorie,
    error: errorCategorie
  } = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      // console.log('on completed' + data);
      setDataCategorie(data);
    }
  });
  if (loadingCategorie) return 'Loading...';
  if (errorCategorie) return `Error! ${error.message}`;

  // console.log(dataCategorie);
  return (
    <Grid item xs={2}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {dataCategorie.categories && dataCategorie.categories.map((category) => {
          //console.log(category);
          return (
            <StyledTreeItem
              key={category.id}
              nodeId={category.id}
              labelText={category.label} >
              {category.subCategories && category.subCategories.map((subcategory) => {
                //console.log(subcategory);
                return (
                  <StyledTreeItem
                    key={subcategory.id}
                    nodeId={subcategory.id}
                    labelText={subcategory.label}
                    categoryChange={categoryChange}
                  />
                )
              })
              }
            </StyledTreeItem>
          )
        })
        }
      </TreeView>
    </Grid>
  );
}

Filters.propTypes = {
  categoryChange: PropTypes.func.isRequired,
};

export default Filters;