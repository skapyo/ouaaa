import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Typography, Container, TextField, Box, IconButton, InputAdornment, CircularProgress, Stack, Tooltip, useMediaQuery, useTheme, } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { withApollo } from 'hoc/withApollo.jsx';
import VideoActorCard from 'components/cards/VideoActorCard';
import ArticleListItem from 'components/list/ArticleListItem';
import AppLayout from 'containers/layouts/AppLayout';
import { useSessionState } from 'context/session/session';
import Link from 'components/Link';


const SEARCH_RESOURCES = gql`
  query resources($search: String!) {
    resources(search: $search, type: "video_actor") {
      id
      type
      actor {
        id
        name
        hasVideoVouaaar
      }
    }
  }
`;

const GET_RESOURCES = `
  query resources {
    resources(type: "video_actor") {
      id
      type
      actor {
        id
        name
        hasVideoVouaaar
      }
    }
  }
`;

const styles = {
  title: {
    fontSize: {
      xs: '2.5rem !important',
      sm: '3rem  !important',
      md: '4rem  !important',
    }
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: '10px'
    }
  },
  searchContainer: {
    width: {
      xs: '90%',
      sm: '80%',
      md: '50%',
    },
  },
  searchInput: {
    borderRadius: '30px'
  },
  list: {
    padding: '10px 100px'
  },
  addRecipeBtn: {
    display: 'flex',
  }
}

const Videos = (props) => {
  const { resources } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useSessionState();
  const [search, setSearch] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [searchResources, { loading: loadingSearch, data: searchResults }] = useLazyQuery(SEARCH_RESOURCES);

  const handleSearch = useCallback((evt) => {
    searchResources({ variables: { search: evt.target.value } });
    setSearch(evt.target.value);
  }, [searchResources]);

  const resourcesToRender = useMemo(() => {
    let _resources = resources;

    if (search) {
      _resources = searchResults?.resources || [];
     
    }

    return _resources
      .filter(resource => resource.actor)
      .map(resource => {
        return resource.actor;
      });
  }, [search, resources, searchResults]);

  const handleClickEraseSearch = useCallback(() => {
    setSearch('');
  }, []);

  const searchInputAdornment = useMemo(() => {
    if (loadingSearch) {
      return (
        <CircularProgress />
      );
    }

    if (search) {
      return (
        <IconButton onClick={handleClickEraseSearch}>
          <CloseIcon />
        </IconButton>
      );
    }

    return null;
  }, [handleClickEraseSearch, search, loadingSearch]);

  const handleClickChangeView = useCallback(() => {
    setIsGridView((prev) => !prev);
  }, []);

  const viewIcon = useMemo(() => {
    return !isGridView ? <GridViewIcon /> : <ViewListIcon />;
  }, [isGridView]);

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Typography sx={styles.title} variant="h1" align="center">Vidéos des ACTEUR À VOUAAAR !</Typography>
        <Box sx={styles.searchBox}>
          <TextField
            sx={styles.searchContainer}
            onChange={handleSearch}
            value={search}
            placeholder='Recherche dans les vidéos ...'
            InputProps={{
              sx: styles.searchInput,
              endAdornment: (
                <InputAdornment>
                  {searchInputAdornment}
                </InputAdornment>
              )
            }}
          />

        </Box>
        {
          (isGridView || isMobile) && (
            <Grid container spacing={2} py={4} justifyContent='center'>
              {
                resourcesToRender.map((resource) => {
                  return (
                    <Grid item key={resource.id}>
                      <VideoActorCard actor={resource} />
                    </Grid>
                  );
                })
              }
            </Grid>
          )
        }

        {
          (!isGridView && !isMobile) && (
            <Stack spacing={2} sx={styles.list}>
              {
                resourcesToRender.map((resource) => {
                  return (
                    <ArticleListItem article={resource} />
                  );
                })
              }
            </Stack>
          )
        }
      </Container>
    </AppLayout>
  );
};

export default withApollo()(Videos);

export async function getServerSideProps(ctxt) {
 
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'resources',
      query: GET_RESOURCES,
      variables: {
        tag: 'video_actor',
      },
      
    }),
  });

  const response = await res.json();
 
  if (response.errors) {
    console.error(
      `Error fetching videos, error message : ${response.errors[0].message}`,
    );
  }
  console.warn(response?.data?.resources)
  return {
    props: {
      resources: response?.data?.resources || [],
    },
  };
}
