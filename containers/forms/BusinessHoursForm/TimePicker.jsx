import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const defaultTimeRange = {
  start: moment().set('minute', 0).set('hour', 8).add(1, 'day').toDate(),
  end: moment().set('minute', 0).set('hour', 18).add(1, 'day').toDate(),
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  textField: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    width: 75,
  },
}));

export default function TimePicker(props) {
  const classes = useStyles();

  const { selectHours, indexTimer, timeRange } = props;
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    timeRange !== undefined ? timeRange[0] : defaultTimeRange[0],
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    timeRange !== undefined ? timeRange[1] : defaultTimeRange[1],
  );

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    selectHours(selectedStartDate, selectedEndDate, indexTimer);
  }, [selectedStartDate, selectedEndDate]);

  return (
    <form className={classes.container} noValidate>
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="à partir de"
        value={selectedStartDate}
        onChange={handleStartDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
        // keyboardIcon={false}
        timeIcon={false}
        ampm={false}
        minutesStep={5}
        error={!!selectedStartDate && moment(selectedStartDate) <= moment()}
      />
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="jusqu'à"
        value={selectedEndDate}
        onChange={handleEndDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
        ampm={false}
        minutesStep={5}
        error={!!selectedStartDate && moment(selectedStartDate) <= moment()}
      />
    </form>
  );
}
