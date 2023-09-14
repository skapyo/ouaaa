import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Typography, Container, TextField, Box, IconButton, InputAdornment, CircularProgress, Stack, Tooltip, useMediaQuery, useTheme, } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { withApollo } from 'hoc/withApollo.jsx';
import RecetteCard from 'components/cards/RecetteCard';
import RecetteListItem from 'components/list/RecetteListItem';
import AppLayout from 'containers/layouts/AppLayout';
import { useSessionState } from 'context/session/session';
import Link from 'components/Link';


const SEARCH_RESOURCES = gql`
  query resources($search: String!) {
    resources(search: $search, type: "recipe") {
      id
      type
      recipe {
        id
        label
        shortDescription
        createdAt
        pictures {
          id
          label
          originalPicturePath
          originalPictureFilename
          position
          logo
          main
        }
      }
    }
  }
`;

const GET_RESOURCES = `
  query resources {
    resources(type: "recipe") {
      id
      type
      recipe {
        id
        label
        shortDescription
        createdAt
        pictures {
          id
          label
          originalPicturePath
          originalPictureFilename
          position
          logo
          main
        }
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

const Recettes = (props) => {
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
    debugger
    let _resources = resources;

    if (search) {
      _resources = searchResults?.resources || [];
    }

    return _resources
      .filter(resource => resource?.recipe)
      .map(resource => {
        return resource.recipe;
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
        <Typography sx={styles.title} variant="h1" align="center">Les Recettes</Typography>
        <Box sx={styles.searchBox}>
          <TextField
            sx={styles.searchContainer}
            onChange={handleSearch}
            value={search}
            placeholder='Recherche dans les recettes ...'
            InputProps={{
              sx: styles.searchInput,
              endAdornment: (
                <InputAdornment>
                  {searchInputAdornment}
                </InputAdornment>
              )
            }}
          />

          {
            !isMobile && (
              <Tooltip title={`Changer le mode de vue en ${isGridView ? 'liste' : 'grille'}`} placement='top'>
                <IconButton onClick={handleClickChangeView}>
                  {viewIcon}
                </IconButton>
              </Tooltip>
            )
          }

          {
            user && (
              <Link href='/recette/new' sx={styles.addRecipeBtn}>
                <Tooltip title='Créer une recette' placement='top'>
                  <IconButton>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )
          }
        </Box>
        {
          (isGridView || isMobile) && (
            <Grid container spacing={2} py={4} justifyContent='center'>
              {
                resourcesToRender.map((resource) => {
                  return (
                    <Grid item key={resource.id}>
                      <RecetteCard recette={resource} />
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
                    <RecetteListItem recette={resource} />
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

export default withApollo()(Recettes);

export async function getServerSideProps(ctxt) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({
      operationName: 'resources',
      query: GET_RESOURCES,
      
    }),
  });

  const response = await res.json();

  if (response.errors) {
    console.error(
      `Error fetching recipes, error message : ${response.errors[0].message}`,
    );
  }

  return {
    props: {
      resources: response?.data?.resources || [],
    },
  };
}
