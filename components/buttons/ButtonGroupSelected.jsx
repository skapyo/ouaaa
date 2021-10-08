import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 30,
    bottom: 20,
    zIndex: 1000,
    [theme.breakpoints.down('sm')]: {
      position: 'initial',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 0,
      '& > *': {
        borderRadius: 0,
        boxShadow: 'none !important',
        flexBasis: ({ buttons }) => `calc(100% / ${buttons.length})`
      },
      '& > *:first-child': {
        borderLeftWidth: 0
      },
      '& > *:last-child': {
        borderRightWidth: 0
      }
    }
  },
}));

const ButtonGroupSelected = props => {
  const { buttons, className } = props;
  const classes = useStyles(props);
  const [selectedButton, setSelectedButton] = useState(buttons[0].name);

  const handleClick = useCallback(button => {
    if (selectedButton !== button.name) {
      if (button.onClick) {
        button.onClick();
      }
      setSelectedButton(button.name);
    }
  }, [selectedButton]);

  return (
    <ButtonGroup color="primary" className={classNames(classes.root, className)}>
      {
        buttons.map(button => {
          return (
            <Button
              variant={selectedButton === button.name ? 'contained' : 'outlined'}
              onClick={() => handleClick(button)}
            >
              {button.label}
            </Button>
          )
        })
      }
    </ButtonGroup>
  )
};

export default ButtonGroupSelected;