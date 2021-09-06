import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import Grid from '@material-ui/core/Grid';

const DateFilter = (props) => {
  const { onDateChange } = props;
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const handleDateChange = useCallback(date => {
    setSelectedDate(date);
    onDateChange(date);
  }, [onDateChange]);

  return (
    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <DatePicker
          autoOk
          disablePast
          disableToolbar
          variant="static"
          format="dd/MM/yyyy"
          margin="normal"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

DateFilter.propTypes = {
  onDateChange: PropTypes.func
};

DateFilter.defaultProps = {
  onDateChange: () => { }
};

export default DateFilter;
