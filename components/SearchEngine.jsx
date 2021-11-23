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
          lat
          lng
        }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: 'white',
    borderRadius: '34px',
    paddingTop: '3em',
  },
  popupIndicator: {
    transform: 'none',
    marginRight: 2
  },
  group: {
    marginLeft: 10,
    borderBottom: '1px solid #d9d7d7'
  }
}));

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
    const actorOptions = data.actors.map(actor => ({ ...actor, type: 'Acteurs', label: actor.name  }));

    return eventOptions.concat(actorOptions);
  }, [data]);

  const handleClickOption = useCallback((evt, option) => {
    if (option.type === 'Actions') {
      router.push('/event/' + option.id);
    } else {
      router.push('/actor/' + option.id);
    }
  }, [router]);

  return (
    <Autocomplete
      id="search-engine"
      clearOnBlur={false}
      classes={{
        inputRoot: classes.inputRoot,
        popupIndicator: classes.popupIndicator
      }}
      style={{ width: '45em', paddingTop: '3em', margin: 'auto' }}
      onInputChange={handleInputChange}
      onChange={handleClickOption}
      openOnFocus={false}
      open={open}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, currentvalue) => option.label === currentvalue.label}
      noOptionsText={'Pas de résultat'}
      options={options}
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
    />
  )
};

export default SearchEngine;