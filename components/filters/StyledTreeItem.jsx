import React, { useCallback, useContext, useState } from 'react';

import PropTypes from 'prop-types';
import { Checkbox, TextField } from '@mui/material';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { EntriesContext } from 'containers/forms/Entries';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
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
  labelTextParent: {
    fontWeight: '300',
    fontSize: '1.5em',
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
  entriesIcon: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
    maskPosition: 'center center',
    maskRepeat: 'no-repeat',
    maskSize: '22px',
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
    hasSubEntries,
    ...other
  } = props;

  const context = useContext(ParentFilterContext);
  const entriesContext = useContext(EntriesContext);
  let isThisEntryNotInTopSEO = false;
  if (entriesContext !== undefined) {
    isThisEntryNotInTopSEO = isForm && ((entriesContext.getList().length >=3 && entriesContext.getList().indexOf(parseInt(other.nodeId, 10)) < 0) && !checked);
     /*console.log(
      isThisEntryNotInTopSEO +
        ' ' +
        entriesContext.getList() +
        ' ' +
        parseInt(other.nodeId, 10)+
        ' ' +
        (entriesContext.getList() <=3 || (entriesContext.getList().indexOf(parseInt(other.nodeId, 10)) >= 0 && entriesContext.getList().indexOf(parseInt(other.nodeId, 10)) <= 3)),
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
      if (typeof categoryChange !== 'undefined') {
        categoryChange(eventEntry);
      }
      if (typeof context.handleChildCheckboxChange !== 'undefined') {
        context.handleChildCheckboxChange(checkStatus, index);
      }
    }
  };

  const handleClickItem = useCallback(evt => {
    if (!isParent || !hasSubEntries) {
      evt.stopPropagation();
      if(!isForm ){
        handleCheckboxChange({ target: { checked: !checked } });
      }
     
    }
  }, [checked, handleCheckboxChange, isParent]);

  const handleDescriptionChange = (event) => {
    const eventEntry = event;
    eventEntry.target.entryId = other.nodeId;
    eventEntry.target.linkDescription = event.target.value;
    categoryChange(event);
  };

  return (
    <TreeItem
      label={(
        <div>
          <div className={classes.labelRoot} onClick={handleClickItem}>
            {icon && (
              <>
                <span className={classes.entriesIcon} style={{ '-webkit-mask': `url('/icons/${icon}.svg') center center / 28px no-repeat`, backgroundColor: `${color}` }} />
              </>
            )}
             {hasSubEntries && isForm &&  (
              <>
                 <Typography variant="body2" className={classes.labelTextParent}   style={{  color: `${color}` }} >
                  {labelText}
                </Typography>
              </>
            )}
             {!(hasSubEntries && isForm) && (
              <>
                <Typography variant="body2" className={classes.labelText} style={{  color: `${color}` }}  >
                  {labelText}
                </Typography>
              </>
            )}
           
            {description && (
              <Tooltip title={description}>
                <InfoIcon />
              </Tooltip>
            )}
            {!hideCheckBox && (!isThisEntryNotInTopSEO)&& (
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                name="entries"
                value={other.nodeId}
                className={classes.checkbox}
                style={{ color: '#2C367E' }}
                checked={checked}
                onChange={handleCheckboxChange}
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
  hasSubEntries: PropTypes.boolean,
  icon: PropTypes.string,
  description: PropTypes.string,
};

export default StyledTreeItem;
