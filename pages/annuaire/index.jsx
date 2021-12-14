import { Typography, Container } from '@material-ui/core';
import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { withApollo } from 'hoc/withApollo.jsx';
import Grid from '@mui/material/Grid';
import CategoryCard from '../../components/cards/CategoryCard';

const GET_CATEGORIES = `
query categories {
  categories {
    id
    label
    color
    description
    icon
  }
}`;

const AnnuairePage = ({ initialData }) => {
  const { data } = initialData;

  return (
    <AppLayout>
      <Container maxWidth="md">
        <Typography variant="h1">Annuaire</Typography>

        <Grid container spacing={2}>
          {initialData && data?.categories?.map((category) => {
            return <CategoryCard key={category.id} category={category} />;
          })}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default withApollo()(AnnuairePage);

export async function getServerSideProps(ctxt) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'categories',
      query: GET_CATEGORIES,
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
      initialData,
    },
  };
}
