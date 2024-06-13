import { BoxProps, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  rules?: RegisterOptions;
  helperText?: string;
  row?: boolean;
};

const RadioField = ({ name, label, options, rules, helperText, row, sx }: Props & BoxProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormControl required={rules && Object.keys(rules).includes('required')} error={fieldState.invalid} sx={sx}>
      {label !== "" && <FormLabel id={name}>{label}</FormLabel>}
      <RadioGroup aria-labelledby={name} value={field.value} row={row} onChange={field.onChange} onBlur={field.onBlur}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{fieldState.error?.message || helperText}</FormHelperText>
    </FormControl>
  );
};

export default RadioField;
