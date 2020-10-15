import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {fr} from "date-fns/locale";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const DateFilter = (refetch) => {

  const [selectedDate, setSelectedDate] = React.useState(
    Date.now()
  )

  const handleDateChange = (date) => {
    setSelectedDate(date);

    refetch.refetch.refetch({startingDate:date})
  }

  return (
    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
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
  )
}

export default DateFilter