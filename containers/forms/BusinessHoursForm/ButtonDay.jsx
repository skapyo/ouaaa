import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    background: '#4db6ac',
    borderRadius: 1,
    border: 0,
    color: 'white',
    padding: '0 0',
    margin: '2px',
    minWidth: '20px',
    borderRadius: '20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function ButtonDay(props) {
  const { text, selectDays, selected, dayId, alreadySelected } = props;
  const [flag, setFlag] = React.useState(selected);

  // console.log("flag", flag);

  const handleClick = (e) => {
    setFlag(!flag);
    selectDays(e);
  };

  return (
    <StyledButton
      onClick={handleClick}
      variant="contained"
      style={{ backgroundColor: flag ? '#bf083e' : '#25AAA4' }}
      data-id={dayId}
      disabled={alreadySelected}
    >
      {text}
    </StyledButton>
  );
}
