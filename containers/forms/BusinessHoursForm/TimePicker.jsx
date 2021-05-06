import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 80,
  },
}));

export default function TimePicker(props) {
  const classes = useStyles();

  const [startTime, setStartTime] = useState('07:30');
  const [endTime, setEndTime] = useState('8:00');
  const startRef = useRef();
  const endRef = useRef();

  const { selectHours, indexTimer } = props;

  const changeStartTime = (e) => {
    const newTime = e.target.value;
    setStartTime(newTime);
  };

  const changeEndTime = (e) => {
    const newTime = e.target.value;
    setEndTime(newTime);
  };

  useEffect(() => {
    console.log(indexTimer);
    selectHours(startTime, endTime, indexTimer);
  }, [startTime, endTime]);

  return (
    <form className={classes.container} noValidate>
      <TextField
        ref={startRef}
        label="à partir de"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1200, // 5 min
        }}
        onChange={(e) => changeStartTime(e)}
      />
      <TextField
        inputRef={endRef}
        label="jusqu'à"
        type="time"
        defaultValue="08:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1200, // 5 min
        }}
        onChange={(e) => changeEndTime(e)}
      />
    </form>
  );
}
