import { TextField } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { RadioGroupContext } from 'containers/forms/RadioGroupForContext';
import { useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import makeStyles from '@mui/styles/makeStyles';

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
