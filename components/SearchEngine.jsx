import React, { useCallback, useMemo, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router'

const SEARCH = gql`
  query search($searchEvent: Boolean, $searchActor: Boolean, $searchValue: String!) {
    search(searchEvent: $searchEvent, searchActor: $searchActor, searchValue: $searchValue) {
      events
      {
        id
        label
        startedAt
        endedAt
        published
        lat
        lng
        address
        city
        shortDescription
      }
      actors
        {
          id
          name
          address
          city
          shortDescription
          activity
          lat
          lng
        }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '45em',
    paddingTop: '3em',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      paddingTop: '1em'
    },
  },
  inputRoot: {
    backgroundColor: 'white',
    borderRadius: 34,
    paddingTop: '3em',
  },
  popupIndicator: {
    transform: 'none',
    marginRight: 2
  },
  group: {
    marginLeft: 10,
    borderBottom: '1px solid #d9d7d7'
  },
  optionShortDescription: {
    fontSize: 14,
    marginLeft: 14,
    fontStyle: 'italic'
  },
  optionActivity: {
    fontSize: 14,
    marginLeft: 14,
    fontStyle: 'italic'
  },
}));

const getTextWithSearchValue = (originalText, inputValue) => {
  let newOriginalText = originalText;
  if (originalText) {
    // Find the position value in the original string
    const matchIndex = originalText.toLowerCase().search(inputValue.toLowerCase());

    if (matchIndex !== -1) {
      // Build string list with the first part, the match part and last part of the original string
      // And return the match part surrounded by bold tag
      newOriginalText = [originalText.slice(0, matchIndex)]
        .concat(originalText.slice(matchIndex, matchIndex + inputValue.length))
        .concat(originalText.slice(matchIndex + inputValue.length))
        .map((part, index) => {
          if (index === 1) return <b key={index}>{part}</b>;
          return part;
        });
    }
  }
  return newOriginalText;
};

const SearchEngine = (props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [value, setValue] = useState(null);
  const classes = useStyles();
  const router = useRouter();

  const { refetch, loading } = useQuery(SEARCH, {
    variables: {
      searchActor: true,
      searchEvent: true,
      searchValue: ""
    },
    onCompleted: (response) => {
      if (value !== null) {
        const { events = [], actors = [] } = response.search;
        setData({ events, actors });
        if (!open) {
          setOpen(true);
        }
      }
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleInputChange = useCallback((evt, newValue) => {
    setValue(newValue);
    if (newValue.length >= 3) {
      refetch({ searchValue: newValue, searchActor: true, searchEvent: true });
    } else {
      setOpen(false);
    }
  }, [refetch]);

  const options = useMemo(() => {
    if (!data) return [];

    const eventOptions = data.events.map(event => ({ ...event, type: 'Actions' }));
    const actorOptions = data.actors.map(actor => ({ ...actor, type: 'Acteurs', label: actor.name }));

    return eventOptions.concat(actorOptions);
  }, [data]);

  const handleClickOption = useCallback((evt, option) => {
    if (option.type === 'Actions') {
      router.push('/event/' + option.id);
    } else {
      router.push('/actor/' + option.id);
    }
  }, [router]);

  const filterOptions = useCallback(() => {
    return options;
  }, [options])

  return (
    <Autocomplete
      id="search-engine"
      clearOnBlur={false}
      classes={{
        root: classes.root,
        inputRoot: classes.inputRoot,
        popupIndicator: classes.popupIndicator
      }}
      onInputChange={handleInputChange}
      onChange={handleClickOption}
      openOnFocus={false}
      open={open}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, currentvalue) => option.label === currentvalue.label}
      noOptionsText="Pas de résultat"
      options={options}
      filterOptions={filterOptions}
      loading={loading}
      popupIcon={(
        <SearchIcon size={48} />
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder="Rechercher un acteur ou une action"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )
      }}
      renderOption={(option, state) => {
        const { label, activity, shortDescription } = option;
        const { inputValue } = state;

        const newLabel = getTextWithSearchValue(label, inputValue);
        const newActivity = getTextWithSearchValue(activity, inputValue);
        const newShortDescription = getTextWithSearchValue(shortDescription, inputValue);

        return (
          <div>
            <div>{newLabel} {newActivity && <div className={classes.optionActivity}>{newActivity}</div>}</div>
            {shortDescription && <div className={classes.optionShortDescription}>{newShortDescription}</div>}
          </div>
        )
      }}
    />
  )
};

export default SearchEngine;