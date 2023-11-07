import { TextField } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { RadioGroupContext } from 'containers/forms/RadioGroupForContext';
import { useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import makeStyles from '@mui/styles/makeStyles';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme, props) => ({
  formControlLabel: (props) => ({
    margin: '0px',
    textAlign: 'left'
  }),
}));

function CustomRadioGroup(props) {
  const classes = useStyles();
  const {
    formChangeHandler,
    defaultValue,
    entries,
    ...other
  } = props;
  const radioGroupContect = useContext(RadioGroupContext);
  if (radioGroupContect.getCurrentValue() === '') {
    radioGroupContect.setCurrentValue(defaultValue);
  }

  const handleChange = (event) => {
    //  formChangeHandler(event);
    const eventModified = event;
    eventModified.target.oldValueToRemove = radioGroupContect.getCurrentValue();
    formChangeHandler(event);
    radioGroupContect.setCurrentValue(eventModified.target.value);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="entries"
        name="entries"
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e)}
        className={classes.formControlLabel}
      >
        {entries
          && entries.map((entry) => {
            return (
              <>
              <FormControlLabel
                key={entry.id}
                value={entry.id}
                control={<Radio />}
                label={entry.label}
              />
              
              </>
            );
          })}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioGroup;
