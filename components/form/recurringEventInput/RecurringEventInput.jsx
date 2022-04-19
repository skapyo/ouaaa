import React, { useCallback, useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';

const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

const getDayOfTheWeek = (day) => {
  switch (day) {
    case 'MO':
      return 'lundi';
    case 'TU':
      return 'mardi';
    case 'WE':
      return 'mercredi';
    case 'TH':
      return 'jeudi';
    case 'FR':
      return 'vendredi';
    case 'SA':
      return 'samedi';
    case 'SU':
      return 'dimanche';
    default:
      return 'dimanche';
  }
};

const nbWeeksInMonth = (date) => {
  return moment(date).endOf('month').week() - moment(date).startOf('month').week() + 1;
};

const currentWeek = (date) => {
  return moment(date).week() - moment(date).startOf('month').week() + 1;
};

const weekOfMonth = (date) => {
  const week = currentWeek(date);
  const nbWeeks = nbWeeksInMonth(date);
  return nbWeeks === week ? '' : week;
};

const getDateSuffix = (date) => {
  const week = currentWeek(date);
  const nbWeeks = nbWeeksInMonth(date);
  if (nbWeeks === week) return 'dernier';
  return week > 1 ? 'eme' : 'er';
};

const styles = {
  menuItem: {
    display: 'flex !important',
  },
  buttonDay: {
    height: '30px !important',
    width: '30px !important',
    borderRadius: '50% !important',
    marginRight: '10px !important',
    backgroundColor: 'rgba(86, 86, 86, 0.05) !important',
    '&.Mui-selected': {
      backgroundColor: '#2c367e !important',
      color: 'white  !important',
      '&:hover': {
        backgroundColor: 'rgba(44, 54, 126, 0.7) !important',
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(86, 86, 86, 0.15) !important',
    },
  },
  radioButtonIcon: {
    mr: '5px !important',
  },
};

const GridWrapper = (props) => {
  const { isOpen, children, ...gridProps } = props;

  if (!isOpen) return null;

  return (
    <Grid {...gridProps}>
      {children}
    </Grid>
  );
};
const extractfromString = (value, variable, defaultValue) => {
  if (value !== undefined && value) {
    let returnValue = '';
    value.split(';').forEach((elm) => {
      if (elm === '') return;
      const spl = elm.split('=');
      if (spl[0] === variable) {
        // eslint-disable-next-line prefer-destructuring
        returnValue = spl[1];
      }
    });
    if (returnValue.length > 0) {
      return returnValue;
    }
  }
  return defaultValue;
};

const getEndMode = (value) => {
  if (extractfromString(value, 'UNTIL', '') !== '') {
    return 'until';
  }
  if (extractfromString(value, 'COUNT', '') !== '') {
    return 'nb';
  }

  return 'never';
};
const getUntilDate = (value) => {
  if (extractfromString(value, 'UNTIL', '') !== '') {
    return moment(extractfromString(value, 'UNTIL', ''), 'YYYYMMDDT000000[Z]');
  }
  return '';
};
const getByDay = (value) => {
  if (extractfromString(value, 'BYDAY', '') !== '') {
    return extractfromString(value, 'BYDAY', '').split(',');
  }
  return [DAYS[moment().day() - 1]];
};

const RecurringEventInput = (props) => {
  const { onChange, value, startDate } = props;
 
  const [isRecurring, setIsRecurring] = useState(value !== undefined && value != null);
  const [freq, setFreq] = useState(extractfromString(value, 'FREQ', 'WEEKLY'));
  const [count, setCount] = useState(extractfromString(value, 'COUNT', 1));
  const [interval, setInterval] = useState(extractfromString(value, 'INTERVAL', 1));
  const [endMode, setEndMode] = useState(getEndMode(value));
  const [monthMode, setMonthMode] = useState('day');
  const [untilDate, setUntilDate] = useState(getUntilDate(value));
  const [daysOfWeek, setDaysOfWeek] = useState(getByDay(value));

  const handleChangeFreq = useCallback((e) => {
    setFreq(e.target.value);
  }, []);

  const handleChangeEndMode = useCallback((e) => {
    setEndMode(e.target.value);
  }, []);

  const handleChangeUntilDate = useCallback((date) => {
    setUntilDate(date);
  }, []);

  const handleChangeMonthMode = useCallback((e) => {
    setMonthMode(e.target.value);
  }, []);

  const handleChangeDaysOfWeek = useCallback((evt, days) => {
    if (days.length > 0) {
      setDaysOfWeek(days);
    }
  }, [daysOfWeek]);

  const handleChangeCount = useCallback((evt) => {
    setCount(parseInt(evt.target.value));
  }, []);

  const handleChangeInterval = useCallback((evt) => {
    setInterval(parseInt(evt.target.value));
  }, []);

  useEffect(() => {
    if (!isRecurring) {
      onChange(null);
    } else {
      const values = [];

      // FREQ
      values.push(`FREQ=${freq || 'WEEKLY'}`);

      // INTERVAL
      values.push(`INTERVAL=${interval || 1}`);

      if (endMode !== 'never') {
        if (endMode === 'nb') {
          // COUNT
          values.push(`COUNT=${count || 1}`);
        }

        if (endMode === 'until' && moment(untilDate).isValid()) {
          // UNTIL
          values.push(`UNTIL=${moment(untilDate).format('YYYYMMDDT000000[Z]')}`);
        }
      }

      if (freq === 'WEEKLY') {
        // BYDAY
        values.push(`BYDAY=${daysOfWeek.join(',')}`);
      }

      if (freq === 'MONTHLY' && moment(startDate).isValid()) {
        if (monthMode === 'date') {
          // BYMONTHDATE
          values.push(`BYMONTHDAY=${moment(startDate).date()}`);
        }

        if (monthMode === 'day') {
          // BYDAY
          values.push(`BYDAY=${currentWeek(startDate)}${DAYS[moment(startDate).day() - 1]}`);
        }
      }
      debugger;
      onChange(values.join(';'));
    }
  }, [onChange, freq, interval, count, endMode, daysOfWeek, untilDate, monthMode, startDate, isRecurring, value]);

  return (
    <Grid container>
      <Grid item sx={{ p: 2, pl: 3 }}>
        <FormControlLabel
          control={<Checkbox />}
          label="évènement récurrent"
          labelPlacement="right"
          value={isRecurring}
          checked={isRecurring}
          onChange={() => setIsRecurring(!isRecurring)}
        />
      </Grid>

      <GridWrapper item container isOpen={isRecurring} sx={{ p: 2, pl: 2 }}>
        <Grid item container alignItems="center">
          <Grid item>
            Répéter tou(te)s les
          </Grid>
          <Grid item>
            <TextField
              type="number"
              variant="outlined"
              value={interval}
              onChange={handleChangeInterval}
            />
          </Grid>
          <Grid item>
            <Select
              value={freq}
              onChange={handleChangeFreq}
              fullWidth
            >
              <MenuItem sx={styles.menuItem} value="DAILY">jours</MenuItem>
              <MenuItem sx={styles.menuItem} value="WEEKLY">semaines</MenuItem>
              <MenuItem sx={styles.menuItem} value="MONTHLY">mois</MenuItem>
              <MenuItem sx={styles.menuItem} value="YEARLY">années</MenuItem>
            </Select>
          </Grid>
        </Grid>

        {
          freq === 'WEEKLY' && (
            <Grid item container direction="column" alignItems="flex-start">
              <Grid item>
                Répéter le
              </Grid>

              <Grid item>
                <ToggleButtonGroup value={daysOfWeek} onChange={handleChangeDaysOfWeek}>
                  <ToggleButton value="MO" sx={styles.buttonDay}>
                    L
                  </ToggleButton>
                  <ToggleButton value="TU" sx={styles.buttonDay}>
                    M
                  </ToggleButton>
                  <ToggleButton value="WE" sx={styles.buttonDay}>
                    M
                  </ToggleButton>
                  <ToggleButton value="TH" sx={styles.buttonDay}>
                    J
                  </ToggleButton>
                  <ToggleButton value="FR" sx={styles.buttonDay}>
                    V
                  </ToggleButton>
                  <ToggleButton value="SA" sx={styles.buttonDay}>
                    S
                  </ToggleButton>
                  <ToggleButton value="SU" sx={styles.buttonDay}>
                    D
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          )
        }

        {
          freq === 'MONTHLY' && (
            <Grid>
              <Select
                value={monthMode}
                onChange={handleChangeMonthMode}
              >
                <MenuItem value="date" sx={styles.menuItem}>
                  Tous les mois le
                  {' '}
                  {moment(startDate).date()}
                </MenuItem>
                <MenuItem value="day" sx={styles.menuItem}>
                  Tous les mois le
                  {' '}
                  {weekOfMonth(startDate)}
                  {getDateSuffix(startDate)}
                  {' '}
                  {getDayOfTheWeek(DAYS[moment(startDate).day() - 1])}
                </MenuItem>
              </Select>
            </Grid>
          )
        }

        <Grid item container direction="column" alignItems="flex-start">
          <Grid item sx={{ py: 2 }}>
            Se termine
          </Grid>
          <Grid item container alignItems="left" sx={{ pl: 1 }}>
            <RadioGroup
              value={endMode}
              onChange={handleChangeEndMode}
            >
              <FormControlLabel
                value="never"
                control={<Radio sx={styles.radioButtonIcon} />}
                label="Jamais"
                sx={{ py: 1 }}
              />
              <FormControlLabel
                value="until"
                control={<Radio sx={styles.radioButtonIcon} />}
                sx={{ py: 1 }}
                label={(
                  <Grid container alignItems="center">
                    <Grid item>Le</Grid>
                    <Grid item>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={untilDate}
                          onChange={handleChangeUntilDate}
                          inputFormat="dd/MM/yyyy"
                          minDate={new Date()}
                          renderInput={(params) => (
                            <TextField {...params} />
                          )}
                          disabled={endMode !== 'until'}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                )}
              />
              <FormControlLabel
                value="nb"
                control={<Radio sx={styles.radioButtonIcon} />}
                sx={{ py: 1 }}
                label={(
                  <Grid container alignItems="center">
                    <Grid item>Après</Grid>
                    <Grid item>
                      <TextField
                        type="number"
                        disabled={endMode !== 'nb'}
                        value={count}
                        onChange={handleChangeCount}
                      />
                    </Grid>
                    <Grid item>occurence(s)</Grid>
                  </Grid>
                )}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </GridWrapper>
    </Grid>
  );
};

export default RecurringEventInput;
