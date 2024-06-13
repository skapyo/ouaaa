import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  rules?: RegisterOptions;
};

const SelectField: React.FC<Props> = ({ name, label, rules, options }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      select
      helperText={fieldState.error?.message}
      required={rules && Object.keys(rules).includes('required')}
      error={fieldState.invalid}
      onBlur={field.onBlur}
      onChange={field.onChange}
      value={field.value}
    >
      {options.map(({ value, label}) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
