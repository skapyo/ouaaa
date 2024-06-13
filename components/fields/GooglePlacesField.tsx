import React, { useEffect, useState, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDvUKXlWS1470oj8C-vD6s62Bs9Y8XQf00';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
  };
}

export type LocationType = Partial<{
  address: string;
  postcode: string;
  city: string;
  lat: number;
  lng: number;
}>;

type Props = {
  name: string;
  label: string;
  noOptionsText: string;
  rules?: RegisterOptions;
  disabled?: boolean;
};

const GooglePlacesField = (props: Props) => {
  const { name, label, noOptionsText, rules, disabled } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const [value, setValue] = useState<PlaceType | null>(field.value?.address || null);
  const [inputValue, setInputValue] = useState(field.value?.address || '');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  useEffect(() => {
    const computeFormValue = async () => {
      if (!(window as any).google) {
        return;
      }

      if (value && inputValue) {
        const response = await geocodeByAddress(inputValue);
        const coordinates = await getLatLng(response[0]);

        const city = response[0].address_components.find((component) =>
          component.types.includes('locality'),
        )?.long_name;
        const postcode = response[0].address_components.find((component) =>
          component.types.includes('postal_code'),
        )?.long_name;
        const address = value.description;

        field.onChange?.({
          target: {
            name: name || '',
            value: {
              address,
              city,
              postcode,
              lat: coordinates.lat || undefined,
              lng: coordinates.lng || undefined,
            },
          },
          type: 'change',
        });
      } else {
        field.onChange?.({
          target: {
            name: name || '',
            value: undefined,
          },
          type: 'change',
        });
      }
    };

    computeFormValue();
  }, [value]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      disabled={disabled}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={noOptionsText}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onBlur={field.onBlur}
          label={label}
          fullWidth
          helperText={fieldState.error?.message}
          required={rules && Object.keys(rules).includes('required')}
          error={fieldState.invalid}
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting?.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting?.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default GooglePlacesField;
