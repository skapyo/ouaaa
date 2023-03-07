import React, { useCallback, useState } from 'react';
import 'dayjs/locale/fr';
import PropTypes from 'prop-types';
import { DatePicker, MuiPickersUtilsProvider } from '@mui/x-date-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import { styled, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StaticDatePicker, frFR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateFilter = (props) => {
  const { onDateChange } = props;
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const handleDateChange = useCallback(date => {
    setSelectedDate(date);
    onDateChange(date);
  }, [onDateChange]);
  const [locale, setLocale] = React.useState('fr');
  return (
    <>
      <Grid container justify="space-around">
      <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="fr"
  localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}>
        <StaticDatePicker
          autoOk
          disablePast
          displayStaticWrapperAs="desktop"
          disableToolbar
          margin="normal" 
          value={selectedDate}
          onChange={handleDateChange}
          openTo='day'
          views={[ 'month', 'day']}
        />
        </LocalizationProvider>
      </Grid>
    </>
  );
};

DateFilter.propTypes = {
  onDateChange: PropTypes.func
};

DateFilter.defaultProps = {
  onDateChange: () => { }
};

export default DateFilter;
