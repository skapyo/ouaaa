import React, { useState, useEffect } from 'react';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Badge from '@material-ui/core/Badge';

import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/core/styles';
import ParentFilterContext from './ParentFilterContext';
import StyledTreeItem from './StyledTreeItem';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    width: '100%',
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#bf083e',
  },
  customBadge: {
    backgroundColor: '#019077',
    color: 'white',
    right: '12px',
  },
  MuiBadgeRoot: {
    width: '100%',
  },
  MuiTreeItemLabel: {
    height: '50px',
  },
});

function ParentContainer(props) {
  const classes = useStyles();
  const {
    labelText,
    color,
    bgColor,
    checked,
    entry,
    categoryChange,
    parentCategoryChange,
    ...other
  } = props;

  const [parentCheckboxChecked, setParentCheckboxChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const [parentCheckbox, setParentCheckbox] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const [nodesArray, setNodesArray] = useState([]);
  const [numberChecked, setNumberChecked] = useState(0);

  /* update the checkboxes children */
  useEffect(() => {
    // setup parent checkbox
    const parentCheckboxState = {
      id: entry.id,
      label: entry.label,
      checked: false,
    };

    // setup children checkboxes and NodeIds
    const newCheckboxesState = [];
    const newNodesArray = [parentCheckboxState.id];

    const compare = (a, b) => {
      debugger;
      return a.position > b.position;
    };

    entry.subEntries.sort(compare).map(({ id, label }) => {
      newCheckboxesState.push({
        id,
        label,
        checked: false,
      });

      newNodesArray.push(id);
    });

    setNodesArray(newNodesArray);
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

  const updateNumberChecked = () => {
    let newNumberChecked = 0;
    checkboxes.map((checkboxe) => {
      if (checkboxe.checked === true) {
        newNumberChecked += 1;
      }
    });
    return newNumberChecked;
  };

  useEffect(() => {
    updateParentWithChildren();

    if (parentCheckboxChecked) {
      // update the categories changed
      parentCategoryChange(checkboxes);
    }

    if (!parentCheckboxChecked && numberChecked > 0) {
      parentCategoryChange(checkboxes);
    }

    // // update the badge
    setNumberChecked(updateNumberChecked());
  }, [checkboxes, parentCheckboxChecked]);

  const handleToggle = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? nodesArray : []));
  };

  /*
  tree will not collapse if already expanded
  when you check the parent checkbox
  */
  const checkHandleToggle = () => {
    if (expanded.length > 0) {
      return;
    }
    handleToggle();
  };

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
    const newCheckState = checkboxes.map((aCheckbox) => {
      return index == aCheckbox.id
        ? { ...aCheckbox, checked: isChecked }
        : aCheckbox;
    });

    handleCheckboxgroupChange(newCheckState);
  };

  return (
    <ParentFilterContext.Provider
      value={{
        checked: false,
        handleParentCheckboxChange,
        handleChildCheckboxChange,
        checkHandleToggle,
      }}
    >
      {parentCheckbox && (
        <Badge
          badgeContent={numberChecked}
          showZero={false}
          className={classes.root}
          classes={{ badge: classes.customBadge }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <TreeView
            className={classes.root}
            aria-label="controlled"
            expanded={expanded}
            onNodeToggle={handleToggle}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            <StyledTreeItem
              key={parentCheckbox.id}
              nodeId={parentCheckbox.id}
              labelText={parentCheckbox.label}
              categoryChange={categoryChange}
              parentCategoryChange={parentCategoryChange}
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
        </Badge>
      )}
    </ParentFilterContext.Provider>
  );
}
export default ParentContainer;
