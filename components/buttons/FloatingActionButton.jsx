import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    [theme.breakpoints.down('md')]: {
      bottom: 10,
      right: 10
    }
  }
}));

const FloatingActionButton = props => {
  const { actions, className, SpeedDialProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const openButton = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeButton = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <SpeedDial
      ariaLabel="floating-action-button"
      className={classnames(classes.fab, className)}
      icon={<SpeedDialIcon />}
      onClose={closeButton}
      onOpen={openButton}
      open={isOpen}
      direction="up"
      {...SpeedDialProps}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.key}
          icon={action.icon}
          tooltipTitle={action.label}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

FloatingActionButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func
  })),
  className: PropTypes.object,
  SpeedDialProps: PropTypes.object
};

FloatingActionButton.defaultProps = {
  actions: null,
  className: {},
  SpeedDialProps: null
};

export default FloatingActionButton;