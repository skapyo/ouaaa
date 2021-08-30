import React, { useContext, useState } from 'react';

import PropTypes from 'prop-types';
import { Checkbox, TextField } from '@material-ui/core';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { EntriesContext } from 'containers/forms/Entries';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import ParentFilterContext from './ParentFilterContext';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  entryDescription: {
    width: '100%',
  },
  checkbox: {
    padding: '1px',
    margin: '0px 0px 0px 3px',
  },
  icon: {
    height: '20px',
    marginRight: '1em',
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    color,
    bgColor,
    categoryChange,
    handleChildCheckboxChange,
    hideCheckBox,
    checked,
    id,
    isParent,
    isForm,
    icon,
    description,
    ...other
  } = props;

  const context = useContext(ParentFilterContext);
  const entriesContext = useContext(EntriesContext);
  let isThisEntryNotInTopSEO = false;
  if (entriesContext !== undefined) {
    isThisEntryNotInTopSEO = entriesContext.getList().indexOf(parseInt(other.nodeId, 10)) >= 3;
    /* console.log(
      !isThisEntryNotInTopSEO +
        ' ' +
        entriesContext.getList() +
        ' ' +
        parseInt(other.nodeId, 10),
    ); */
  }

  const handleCheckboxChange = (event) => {
    const checkStatus = event.target.checked;
    const index = parseInt(id, 10);
    if (isParent) {
      context.handleParentCheckboxChange(checkStatus);
      context.checkHandleToggle(event);
    } else {
      const eventEntry = event;
      if (entriesContext) {
        let isTopSEO;
        if (checkStatus) {
          isTopSEO = !entriesContext.addCheckedCheckbox(
            parseInt(other.nodeId, 10),
          );
        } else {
          entriesContext.removeCheckedCheckbox(parseInt(other.nodeId), 10);
        }
        eventEntry.target.entryId = other.nodeId;
        eventEntry.target.topSEO = isTopSEO;
      }
      categoryChange(eventEntry);
      if (typeof context.handleChildCheckboxChange !== 'undefined') {
        context.handleChildCheckboxChange(checkStatus, index);
      }
    }
  };
  const handleDescriptionChange = (event) => {
    const eventEntry = event;
    eventEntry.target.entryId = other.nodeId;
    // eventEntry.target.topSEO = !isThisEntryNotInTopSEO;
    eventEntry.target.linkDescription = event.target.value;
    categoryChange(event);
  };
  //
  // console.log(`${checked} ${other.nodeId}`);
  return (
    <TreeItem
      label={(
        <div>
          <div className={classes.labelRoot}>
            { icon && (
            <img src={icon} alt="icon" className={classes.icon} />
            )}
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            {isForm && isThisEntryNotInTopSEO && (
              <Tooltip title="Seuls les 3 premiers sujets seront utilsés pour le référencement">
                <InfoIcon />
              </Tooltip>
            )}
            { description && (
              <Tooltip title={description}>
                <InfoIcon />
              </Tooltip>
            )}
            {!hideCheckBox && (
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                name="entries"
                value={other.nodeId}
                className={classes.checkbox}
                style={{ color: '#2C367E' }}
                checked={checked}
                onChange={(e) => handleCheckboxChange(e)}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
          {isForm && checked && !hideCheckBox && (
            <TextField
              className={classes.entryDescription}
              variant="outlined"
              name="linkDescription"
              placeholder={`Votre lien avec le sujet ${labelText}`}
              onChange={handleDescriptionChange}
              value={other.linkDescription}
              linkDescription
            />
          )}
        </div>
      )}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  checked: PropTypes.boolean,
  labelText: PropTypes.string.isRequired,
  categoryChange: PropTypes.func,
  handleChildCheckboxChange: PropTypes.func,
  hideCheckBox: PropTypes.boolean,
  isParent: PropTypes.boolean,
  id: PropTypes.string,
  isForm: PropTypes.boolean,
  icon: PropTypes.string,
  description: PropTypes.string,
};

export default StyledTreeItem;
