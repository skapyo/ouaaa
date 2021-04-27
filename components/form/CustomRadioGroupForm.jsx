import { TextField, withStyles } from '@material-ui/core';
import { RadioGroupContext } from 'containers/forms/RadioGroupForContext';
import { useContext, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl :{
    width: "100%"
  },
}));

function CustomRadioGroupForm(props) {
  const {
    formChangeHandler,
    defaultValue,
    children,
    ...other
  } = props;
  const radioGroupContect = useContext(RadioGroupContext);
  const styles = useStyles();
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
    <FormControl component="fieldset" className={styles.formControl} >
      <RadioGroup
        row
        aria-label="entries"
        name="entries"
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e)}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioGroupForm;
