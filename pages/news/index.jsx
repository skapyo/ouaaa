import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { withApollo } from 'hoc/withApollo.jsx';
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import CardSliderArticle from '../../components/cards/CardSliderArticle';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
}));

const GET_ARTICLES = `
query articles {
  articles {
    id
    label
    shortDescription
  }
}`;
const News = (props) => {
  const styles = useStyles();
  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container className={styles.align} maxWidth="md">
            <Typography variant="h1"  pt={4}>Les Articles</Typography>
            <Grid container spacing={2} py={4}>
              {props.initialData.data?.articles && (props?.initialData?.data?.articles?.map((article) => {
                return <CardSliderArticle key={article.id} article={article} />;
              }))}
            </Grid>
          </Container>
        </Box>
      </RootRef>
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

  console.log(initialData.data.articles);
  return {
    props: {
      initialData,
    },
  };
}
