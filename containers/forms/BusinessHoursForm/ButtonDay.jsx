import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';

const StyledButton = withStyles({
  root: {
    background: 'white',
    borderRadius: 1,
    border: 0,
    color: 'white',
    padding: '0 0',
    margin: '2px',
    minWidth: '20px',
    borderRadius: '20px',
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
    //debugger;
    setFlag(!flag);
    selectDays(e);
    //debugger;

  };

  return (
    <StyledButton
      onClick={handleClick}
      variant="contained"
      style={{ backgroundColor: flag ? '#2C367E' : 'white', color: flag ? 'white' : '#2C367E' }}
      data-id={dayId}
      disabled={alreadySelected}
    >
      {text}
    </StyledButton>
  );
}
