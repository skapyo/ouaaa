import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
    ...other
  } = props;

  const context = useContext(ParentFilterContext);

  const handleCheckboxChange = (event) => {
    categoryChange(event);

    const checkStatus = event.target.checked;
    const index = parseInt(id, 10);

    if (!isParent) {
      context.handleChildCheckboxChange(checkStatus, index);
    } else {
      context.handleParentCheckboxChange(checkStatus);
      context.checkHandleToggle(event);
    }
  };

  // console.log("item : " + labelText);
  return (
    <TreeItem
      label={(
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          {!hideCheckBox && (
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            name="entries"
            value={other.nodeId}
            style={{ color: '#019077' }}
            checked={checked}
            onChange={handleCheckboxChange}
            onClick={(e) => (e.stopPropagation())}
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
};

export default StyledTreeItem;
