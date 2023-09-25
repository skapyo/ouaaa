import React, { useCallback, useMemo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';

const SEARCH = gql`
  query search($searchEvent: Boolean, $searchActor: Boolean, $searchArticle: Boolean, $searchValue: String!) {
    search(searchEvent: $searchEvent, searchActor: $searchActor, searchArticle: $searchArticle, searchValue: $searchValue) {
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
        articles
        {
          id
          label
          shortDescription
        }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '45em',
    paddingTop: '3em',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      paddingTop: '1em',
    },
  },
  inputRoot: {
    backgroundColor: 'white',
    borderRadius: 34,
    paddingTop: '3em',
  },
  popupIndicator: {
    transform: 'none',
    marginRight: 2,
  },
  group: {
    marginLeft: 10,
    borderBottom: '1px solid #d9d7d7',
  },
  optionShortDescription: {
    fontSize: 14,
    marginLeft: 14,
    fontStyle: 'italic',
  },
  optionActivity: {
    fontSize: 14,
    marginLeft: 14,
    fontStyle: 'italic',
  },
  option: {
    padding: '0.5em 1em 0.5em 1em',
  }
}));

const getTextWithSearchValue = (originalText, inputValue) => {
  let newOriginalText = originalText;
  if (originalText) {
    // Find the position value in the original string
    var matchIndex = -1;
    try {
      matchIndex = originalText.toLowerCase().search(inputValue.toLowerCase());
    
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
  }catch(error){
        
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
      searchArticle: true,
      searchValue: '',
    },
    onCompleted: (response) => {
      if (value !== null) {
        const { events = [], actors = [], articles = [] } = response.search;
        setData({ events, actors, articles });
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
      refetch({
        searchValue: newValue, searchActor: true, searchEvent: true, searchArticle: true,
      });
    } else {
      setOpen(false);
    }
  }, [refetch]);

  const options = useMemo(() => {
    if (!data) return [];

    const eventOptions = data.events.map((event) => ({ ...event, type: 'Actions' }));
    const actorOptions = data.actors.map((actor) => ({ ...actor, type: 'Acteurs', label: actor.name }));
    const articleOptions = data.articles.map((article) => ({ ...article, type: 'Articles' }));

    return eventOptions.concat(actorOptions).concat(articleOptions);
  }, [data]);

  const handleClickOption = useCallback((evt, option) => {
    if (option.type === 'Actions') {
      router.push(`/event/${option.id}`);
    } if (option.type === 'Acteurs') {
      router.push(`/actor/${option.id}`);
    } else if (option.type === 'Articles') {
      router.push(`/article/${option.id}`);
    }
  }, [router]);

  const filterOptions = useCallback(() => {
    return options;
  }, [options]);

  return (
    <Autocomplete
      id="search-engine"
      clearOnBlur={false}
      classes={{
        root: classes.root,
        inputRoot: classes.inputRoot,
        popupIndicator: classes.popupIndicator,
      }}
      onInputChange={handleInputChange}
      onChange={handleClickOption}
      openOnFocus={false}
      open={open}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, currentvalue) => option.label === currentvalue.label}
      noOptionsText="Pas de résultat"
      options={options}
      filterOptions={filterOptions}ule
      loading={loading}
      popupIcon={(
        <SearchIcon size={48} />
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder="Rechercher un acteur du PAT ou une action"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
      renderOption={(props, option, { inputValue }) => {
        const { label, activity, shortDescription } = option;

        const newLabel = getTextWithSearchValue(label, inputValue);
        const newActivity = getTextWithSearchValue(activity, inputValue);
        const newShortDescription = getTextWithSearchValue(shortDescription, inputValue);
        return (
          <li {...props}>
            <div className={classes.option}>
              <div>
                {newLabel}
                {' '}
                {newActivity && <div className={classes.optionActivity}>{newActivity}</div>}
              </div>
              {shortDescription && <div className={classes.optionShortDescription}>{newShortDescription}</div>}
            </div>
            </li>
        );
      }}
    />
  );
};

export default SearchEngine;
