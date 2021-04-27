import { TextField, withStyles } from '@material-ui/core';
import { RadioGroupContext } from 'containers/forms/RadioGroupForContext';
import { useContext, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

function CustomRadioGroup(props) {
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
      >
        {entries
          && entries.map((entry) => {
            return (
              <FormControlLabel
                value={entry.id}
                control={<Radio />}
                label={entry.label}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioGroup;
