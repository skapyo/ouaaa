import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  disabled?: boolean;
};

const CheckboxField = ({ name, label, disabled }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl>
          <FormControlLabel
            control={<Checkbox checked={Boolean(value)} onChange={onChange} />}
            label={label}
            disabled={disabled}
          />
        </FormControl>
      )}
    />
  );
};

export default CheckboxField;
