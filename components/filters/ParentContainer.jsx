import React, { useState, useEffect } from 'react';

import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Checkbox,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import ParentFilterContext from './ParentFilterContext';
import StyledTreeItem from './StyledTreeItem';

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#bf083e',
  },
});

function ParentContainer(props) {
  const classes = useStyles();
  const {
    labelText, color, bgColor, categoryChange, checked, entry, parentCategoryChange, ...other
  } = props;

  const [parentCheckboxChecked, setParentCheckboxChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const [parentCheckbox, setParentCheckbox] = useState(null);

  /* update the checkboxes children */
  useEffect(() => {
    // setup parent checkbox
    const parentCheckboxState = {
      id: entry.id,
      label: entry.label,
      checked: false,
    };

    // setup children checkboxes
    const newCheckboxesState = [];
    entry.subEntries.map(({ id, label }) => {
      newCheckboxesState.push({
        id, label, checked: false,
      });
    });

    setParentCheckbox(parentCheckboxState);
    setCheckboxes(newCheckboxesState);
  }, []);

  const updateParentWithChildren = () => {
    let allChecked = false;
    for (let i = 0; i < checkboxes.length; i += 1) {
      if (checkboxes[i].checked) {
        allChecked = true;
      } else {
        allChecked = false;
        break;
      }
    }

    setParentCheckboxChecked(allChecked);
  };

  useEffect(() => {
    updateParentWithChildren();
  }, [checkboxes]);

  const handleCheckboxgroupChange = (updatedUsecaseCBState) => {
    setCheckboxes(updatedUsecaseCBState);
  };

  const handleParentCheckboxChange = (isChecked) => {
    const newChildrenCheckState = checkboxes.map((aCheckbox) => ({
      ...aCheckbox,
      checked: isChecked,
    }));

    setParentCheckboxChecked(isChecked);
    handleCheckboxgroupChange(newChildrenCheckState);
  };

  const handleChildCheckboxChange = (isChecked, index) => {
    const newCheckState = checkboxes.map(
      (aCheckbox) => {
        return (index == aCheckbox.id ? { ...aCheckbox, checked: isChecked } : aCheckbox);
      },
    );

    handleCheckboxgroupChange(newCheckState);
  };

  return (
    <ParentFilterContext.Provider value={
    {
      checked: false,
      handleParentCheckboxChange,
      handleChildCheckboxChange,
    }
  }
    >
      {parentCheckbox && (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        <StyledTreeItem
          key={parentCheckbox.id}
          nodeId={parentCheckbox.id}
          labelText={parentCheckbox.label}
          categoryChange={categoryChange}
          isParent
          checked={parentCheckboxChecked}
        >
          {checkboxes.map((subEntry) => {
            return (
              <StyledTreeItem
                key={subEntry.id}
                nodeId={subEntry.id}
                id={subEntry.id}
                labelText={subEntry.label}
                categoryChange={categoryChange}
                checked={subEntry.checked}
              />
            );
          })}
        </StyledTreeItem>

      </TreeView>
      )}
    </ParentFilterContext.Provider>
  );
}
export default ParentContainer;
