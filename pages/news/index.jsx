import React from 'react';
import { Grid, Typography, Container, } from '@mui/material';

import { withApollo } from 'hoc/withApollo.jsx';
import ArticleCard from 'components/cards/ArticleCard';
import AppLayout from 'containers/layouts/AppLayout';

const GET_ARTICLES = `
query articles {
  articles {
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
}`;

const News = (props) => {
  const { articles } = props;

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Typography variant="h1" align="center">Les Articles</Typography>
        <Grid container spacing={2} py={4} justifyContent='center'>
          {
            articles.map((article) => {
              return (
                <Grid item key={article.id}>
                  <ArticleCard article={article} />
                </Grid>
              );
            })
          }
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default withApollo()(News);

export async function getServerSideProps(ctxt) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'articles',
      query: GET_ARTICLES,
    }),
  });

  const initialData = await res.json();

  if (initialData.errors) {
    console.error(
      `Error fetching categories, error message : ${initialData.errors[0].message}`,
    );
  }

  return {
    props: {
      articles: initialData?.data?.articles || [],
    },
  };
}
