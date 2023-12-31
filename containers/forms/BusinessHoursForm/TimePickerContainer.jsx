import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// const defaultTimeRange = {
//   start: moment().set('minute', 0).set('hour', 8).add(1, 'day').toDate(),
//   end: moment().set('minute', 0).set('hour', 18).add(1, 'day').toDate(),
// };

const defaultTimeRange = {
  start: null,
  end: null,
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

export default function TimePickerContainer(props) {
  const classes = useStyles();

  const { selectHours, indexTimer, timeRange } = props;
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    timeRange !== undefined ? timeRange[0] : defaultTimeRange.start,
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    timeRange !== undefined ? timeRange[1] : defaultTimeRange.end,
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
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
        error={!selectedStartDate}
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
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
        error={!selectedEndDate}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
    </form>
  );
}
