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
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#bf083e',
  },
});

function ParentContainer(props) {
  const classes = useStyles();
  const {
    labelText,
    color,
    bgColor,
    categoryChange,
    checked,
    entry,
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

    entry.subEntries.map(({ id, label }) => {
      newCheckboxesState.push({
        id, label, checked: false,
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
    setNumberChecked(updateNumberChecked());
  }, [checkboxes]);

  const handleToggle = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? nodesArray : []));
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
        handleToggle,
      }
    }
    >
      {parentCheckbox && (

        <Badge
          badgeContent={numberChecked}
          color="secondary"
          showZero={false}
          // anchorOrigin={{ vertical: 'middle', horizontal: 'left' }}
          anchorOrigin={numberChecked ? { vertical: 'bottom', horizontal: 'left' } : undefined}
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
