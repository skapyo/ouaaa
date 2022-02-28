import React, { useCallback, useState } from 'react';
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
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const GridWrapper = (props) => {
  const { isOpen, children, ...gridProps } = props;

  if (!isOpen) return null;

  return (
    <Grid {...gridProps}>
      {children}
    </Grid>
  );
};

const RecurringEventInput = (props) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [freq, setFreq] = useState('week');
  const [endMode, setEndMode] = useState('never');
  const [monthMode, setMonthMode] = useState('date');
  const [untilDate, setUntilDate] = useState();

  const handleChangeFreq = useCallback((e) => {
    setFreq(e.target.value);
  }, []);

  const handleChangeEndMode = useCallback((e) => {
    setEndMode(e.target.value);
  }, []);

  const handleChangeUntilDate = useCallback((e) => {
    setUntilDate(e.target.value);
  }, []);

  const handleChangeMonthMode = useCallback((e) => {
    setMonthMode(e.target.value);
  }, []);

  return (
    <Grid container>
      <Grid item sx={{ p: 2, pl: 3 }}>
        <FormControlLabel
          control={<Checkbox />}
          label="évènement récurrent"
          labelPlacement="right"
          value={isRecurring}
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
            />
          </Grid>
          <Grid item>
            <Select
              value={freq}
              onChange={handleChangeFreq}
            >
              <MenuItem value="day">jours</MenuItem>
              <MenuItem value="week">semaines</MenuItem>
              <MenuItem value="month">mois</MenuItem>
              <MenuItem value="year">années</MenuItem>
            </Select>
          </Grid>
        </Grid>

        {
          freq === 'week' && (
            <Grid item container direction="column" alignItems="flex-start">
              <Grid item>
                Répéter le
              </Grid>

              <Grid item>
                <ToggleButtonGroup>
                  <ToggleButton>
                    L
                  </ToggleButton>
                  <ToggleButton>
                    M
                  </ToggleButton>
                  <ToggleButton>
                    M
                  </ToggleButton>
                  <ToggleButton>
                    J
                  </ToggleButton>
                  <ToggleButton>
                    V
                  </ToggleButton>
                  <ToggleButton>
                    S
                  </ToggleButton>
                  <ToggleButton>
                    D
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          )
        }

        {
          freq === 'month' && (
            <Grid>
              <Select
                value={monthMode}
                onChange={handleChangeMonthMode}
              >
                <MenuItem value="date">Tous les mois le 21</MenuItem>
                <MenuItem value="day">Tous les mois le 3eme lundi</MenuItem>
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
                value="never" control={<Radio />} label="Jamais"
                sx={{ py: 1 }}
              />
              <FormControlLabel
                value="until" control={<Radio />}
                sx={{ py: 1 }}
                label={
                  <Grid container alignItems="center">
                    <Grid item>Le</Grid>
                    <Grid item>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          value={untilDate}
                          onChange={handleChangeUntilDate}
                          inputFormat="dd MMM yyyy"
                          minDate={new Date()}
                          renderInput={(params) => (
                            <TextField {...params} />
                          )}
                          disabled={endMode !== 'until'}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                }
              />
              <FormControlLabel
                value="nb" control={<Radio />}
                sx={{ py: 1 }}
                label={
                  <Grid container alignItems="center">
                    <Grid item>Après</Grid>
                    <Grid item>
                      <TextField
                        type="number"
                        disabled={endMode !== 'nb'}
                      />
                    </Grid>
                    <Grid item>occurence(s)</Grid>
                  </Grid>
                }
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </GridWrapper>
    </Grid>
  );
};

export default RecurringEventInput;