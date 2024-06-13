import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  minDateTime?: Date;
  defaultCalendarMonth?: Date;
  shouldDisableTime?: boolean;
  shouldDisableDate?: boolean;
  helperText?: string;
};

const DateTimePickerField = (props: Props) => {
  const {
    name,
    label,
    rules,
    minDateTime,
    defaultCalendarMonth,
    shouldDisableTime,
    shouldDisableDate,
    helperText,
  } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const [value, setValue] = useState<Date | null>(new Date(field.value));

  const handleChange = useCallback((d: Date | null) => {
    setValue((date) => {
      if (shouldDisableDate) {
        if (!date || isNaN(date.getTime())) return date;
        const newDate = new Date(date.getTime());
        newDate.setHours(d?.getHours() || 0, d?.getMinutes() || 0);
        return newDate;

      } else if (shouldDisableTime) {
        if (!d || isNaN(d.getTime())) return d;
        const newDate = new Date(d.getTime());
        newDate.setHours(0, 0, 0);
        return newDate;
      }

      return d;
    });
  }, []);

  // Updates internal value if field value changes
  useEffect(() => {
    setValue(new Date(field.value));
  }, [field.value]);

  // Reset time if shouldDisableTime is enabled
  useEffect(() => {
    if (shouldDisableTime) {
      setValue((date) => {
        if (!date || isNaN(date.getTime())) return date;

        const newDate = new Date(date.toISOString());
        newDate.setHours(0, 0, 0, 0);
        return newDate;
      });
    }
  }, [shouldDisableTime]);

  // Forward value changes to onChange event
  useEffect(() => {
    field.onChange?.({
      target: {
        name: name || '',
        value: value && !isNaN(value.getTime()) ? value.toISOString() : undefined,
      },
      type: 'change',
    });
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <DateTimePicker
        label={label}
        ampm={false}
        inputFormat={shouldDisableTime ? 'dd MMM yyyy' : 'dd MMM yyyy à HH:mm'}
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={field.onBlur}
            required={rules && Object.keys(rules).includes('required')}
            helperText={fieldState.error?.message || helperText}
            error={fieldState.invalid}
            sx={{ flex: 1 }}
          />
        )}
        value={value || null}
        onChange={handleChange}
        disablePast
        minDateTime={minDateTime}
        defaultCalendarMonth={defaultCalendarMonth}
        views={shouldDisableTime ? ['day'] : shouldDisableDate ? ['hours', 'minutes'] : ['day', 'hours', 'minutes']}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerField;
