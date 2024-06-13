import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

type Props<T> = {
  name: string;
  label: string;
  multiple?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions;
  helperText?: string;
  options: T[];
};

const AutocompleteField = <T extends { id: string; label: string }>({
  name,
  label,
  multiple,
  disabled,
  rules,
  helperText,
  options,
}: Props<T>) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const [value, setValue] = useState<T[]>([]);

  useEffect(() => {
    if (multiple) {
      setValue(options.filter((s) => (field.value || []).includes(s.id)));
    } else {
      setValue(options.filter((s) => s.id === field.value));
    }
  }, [options, field.value]);

  const handleChange = useCallback(
    (newValue: T[] | T) => {
      field.onChange?.({
        target: {
          name: name || '',
          value: Array.isArray(newValue) ? newValue.map((v) => v.id) : newValue?.id,
        },
        type: 'change',
      });
    },
    [field.onChange],
  );

  return (
    <Autocomplete
      disabled={disabled}
      multiple={multiple}
      options={options || []}
      getOptionLabel={(option) => option.label}
      value={multiple ? value : value[0] ?? null}
      onChange={(e, v) => handleChange(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={rules && Object.keys(rules).includes('required')}
          onBlur={field.onBlur}
          helperText={fieldState.error?.message || helperText}
          error={fieldState.invalid}
        />
      )}
    />
  );
};

export default AutocompleteField;
