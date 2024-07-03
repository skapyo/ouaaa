import { Checkbox, FormControl, FormControlLabel,FormHelperText  } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  name: string;
  value: string;
  label: string;
  disabled?: boolean;
  control?: any;
};

const CheckboxField = ({ name, label, disabled,value:valueCheckbox,control  }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}  // Ensure the default value is an array
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
        <FormControlLabel
            control={
              <Checkbox
                checked={value ? value.includes(valueCheckbox) : false}
                onChange={() => {
                  debugger;
                  const newValue = value.includes(valueCheckbox)
                    ? value.filter(item => item !== valueCheckbox)
                    : [...value, valueCheckbox];
                  onChange(newValue);
                }}
              />
            }
            label={label}
            disabled={disabled}
          />
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default CheckboxField;
