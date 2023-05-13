import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Typography, Container, TextField, Box, IconButton, InputAdornment, CircularProgress, Stack, Tooltip, useMediaQuery, useTheme, Link } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { withApollo } from 'hoc/withApollo.jsx';
import ArticleCard from 'components/cards/ArticleCard';
import ArticleListItem from 'components/list/ArticleListItem';
import AppLayout from 'containers/layouts/AppLayout';

const SEARCH_ARTICLES = gql`
  query articles($search: String!) {
    articles(search: $search) {
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
`;

const GET_RESOURCES = `
  query resources {
    resources {
      id
      type
      article {
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
  }
}

const News = (props) => {
  const { resources } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [search, setSearch] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [searchArticles, { loading: loadingSearch, error, data }] = useLazyQuery(SEARCH_ARTICLES);

  const handleSearch = useCallback((evt) => {
    searchArticles({ variables: { search: evt.target.value } });
    setSearch(evt.target.value);
  }, [searchArticles]);

  const resourcesToRender = useMemo(() => {
    if (search) {
      return data?.articles || [];
    }

    return resources
      .filter(resource => resource.article || resource.recipe)
      .map(resource => {
        return resource.article || resource.recipe;
      });
  }, [search, resources, data]);

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
        <Typography sx={styles.title} variant="h1" align="center">Les Articles</Typography>
        <Box sx={styles.searchBox}>
          <TextField
            sx={styles.searchContainer}
            onChange={handleSearch}
            value={search}
            placeholder='Recherche dans les articles ...'
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
        </Box>
        {
          (isGridView || isMobile) && (
            <Grid container spacing={2} py={4} justifyContent='center'>
              {
                resourcesToRender.map((resource) => {
                  return (
                    <Grid item key={resource.id}>
                      <ArticleCard article={resource} />
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

export default withApollo()(News);

export async function getServerSideProps(ctxt) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'resources',
      query: GET_RESOURCES,
    }),
  });
  const initialData = await res.json();
 // console.log("test"+JSON.stringify(initialData))
  if (initialData.errors) {
    console.error(
      `Error fetching categories, error message : ${initialData.errors[0].message}`,
    );
  }

  return {
    props: {
      resources: initialData?.data?.resources || [],
    },
  };
}
