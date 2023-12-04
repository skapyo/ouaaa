import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Badge from '@mui/material/Badge';
import TreeView from '@mui/lab/TreeView';
import makeStyles from '@mui/styles/makeStyles';

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
    color: '#2C367E',
  },
  customBadge: {
    backgroundColor: '#2C367E',
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

const compare = (a, b) => a.position > b.position;

function ParentContainer(props) {
  const classes = useStyles();
  const { entry, onCategoryChange, isForm } = props;

  const [parentCheckboxChecked, setParentCheckboxChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [nodesArray, setNodesArray] = useState([]);
  const isFirstRef = useRef(true);

  /* update the checkboxes children */
  useEffect(() => {
    // setup children checkboxes and NodeIds
    const newCheckboxesState = [];
    const newNodesArray = [entry.id];

    entry.subEntries.sort(compare).map(({ id, label, icon, description, actorEntries,subEntries }) => {
      newCheckboxesState.push({
        id,
        label,
        icon,
        color: entry.color,
        description,
        checked: false,
        isSubEntries: false,
        subEntries
      });
      newNodesArray.push(id);
      if(subEntries!=undefined){
      subEntries.sort(compare).map(({ id, label, icon, description, actorEntries,subEntries }) => {
        newCheckboxesState.push({
          id,
          label,
          icon,
          color: entry.color,
          description,
          checked: false,
          isSubEntries: true,
          subEntries
        });
    
        newNodesArray.push(id);
  
        
      });
    }
    });

    setNodesArray(newNodesArray);
    setCheckboxes(newCheckboxesState);
  }, []);

  const updateParentWithChildren = useCallback(() => {
    if (entry.subEntries && entry.subEntries.length > 0) {
      const allChecked = checkboxes.filter(({ checked }) => checked).length === checkboxes.length;

      setParentCheckboxChecked(allChecked);
    }
  }, [entry.subEntries, checkboxes]);

  useEffect(() => {
    // avoid first rendering
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    updateParentWithChildren();
  }, [checkboxes]);

  const handleToggle = useCallback(() => {
    //debugger;
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? nodesArray : []));
  }, [nodesArray]);

  /**
    * tree will not collapse if already expanded
    * when you check the parent checkbox
    */
  const checkHandleToggle = useCallback(() => {
    if (expanded.length === 0) {
      handleToggle();
    }
  }, [expanded, handleToggle]);

  const handleParentCheckboxChange = useCallback((isChecked) => {
    if (entry.subEntries && entry.subEntries.length > 0) {
      const newChildrenCheckState = [...checkboxes].map((aCheckbox) => ({
        ...aCheckbox,
        checked: isChecked,
      }));

      setCheckboxes(newChildrenCheckState);
      onCategoryChange(newChildrenCheckState)
    } else {
      onCategoryChange([
        {
          ...entry,
          checked: isChecked
        }
      ]);
    }

    setParentCheckboxChecked(isChecked);
  }, [checkboxes]);

  const handleChildCheckboxChange = useCallback((isChecked, index) => {

    const newCheckState = checkboxes.map((aCheckbox) => {
      return index == aCheckbox.id
        ? { ...aCheckbox, checked: isChecked }
        : aCheckbox;
    });

    setCheckboxes(newCheckState);
    onCategoryChange(newCheckState);
  }, [onCategoryChange, checkboxes]);

  const numberChecked = useMemo(() => {
    return checkboxes.filter(({ checked }) => checked).length;
  }, [checkboxes]);

  return (
    <ParentFilterContext.Provider
      value={{
        checked: false,
        handleParentCheckboxChange,
        handleChildCheckboxChange,
        checkHandleToggle,
      }}
    >
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
          disableSelection
        >
          <StyledTreeItem
            key={entry.id}
            nodeId={entry.id}
            labelText={entry.label}
            color={entry.color}
            description={entry.description}
            icon={entry.icon}
            isParent
            hasSubEntries={entry.subEntries && entry.subEntries.length > 0}
            checked={parentCheckboxChecked}
            isForm={isForm}
          >

            {checkboxes.map((subEntry) => {
              if(!subEntry.isSubEntries){
              return (
                <StyledTreeItem
                  key={subEntry.id}
                  nodeId={subEntry.id}
                  id={subEntry.id}
                  labelText={subEntry.label}
                  checked={subEntry.checked}
                  description={subEntry.description}
                  color={entry.color}
                  icon={subEntry.icon}
                  isForm={isForm}
                  hasSubEntries={
                    subEntry.subEntries &&
                    subEntry.subEntries.length > 0
                  }
                >
                              {subEntry.subEntries &&
                          subEntry.subEntries.map((subSubEntry) => {
                            return (
                              <StyledTreeItem
                                key={subSubEntry.id}
                                id={subSubEntry.id}
                                // @ts-ignore
                                nodeId={subSubEntry.id}
                                isForm={isForm}
                                expanded={false}
                                labelText={subSubEntry.label}
                                checked={subSubEntry.checked}
                                description={subSubEntry.description}
                                icon={subSubEntry.icon}
                                color={subSubEntry.color}
                                hasSubEntries={
                                  subSubEntry.subEntries &&
                                  subSubEntry.subEntries.length > 0
                                }
                              />
                            );
                          })}
                  </StyledTreeItem>
              );
              }
            })}
          </StyledTreeItem>
        </TreeView>
      </Badge>
    </ParentFilterContext.Provider>
  );
}

export default ParentContainer;
