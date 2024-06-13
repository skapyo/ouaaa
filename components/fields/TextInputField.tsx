import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

export type Props = TextFieldProps & {
  name: string;
  label: string;
  rules?: RegisterOptions;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  helperText?: string;
};

const TextInputField = ({ name, label, type, rules, placeholder, helperText, ...rest }: Props) => {
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
      type={type}
      placeholder={placeholder}
      error={fieldState.invalid}
      helperText={fieldState.error?.message|| helperText}
      required={rules && Object.keys(rules).includes('required')}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      {...rest}
    />
  );
};

export default TextInputField;
