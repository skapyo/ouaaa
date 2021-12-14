import React from 'react';
import { Typography, Container } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import ActorCard from 'components/cards/ActorCard';
import AppLayout from 'containers/layouts/AppLayout';
import { withApollo } from 'hoc/withApollo.jsx';

const GET_ACTORS_BY_CATEGORY = `
query actorsByCategory($categoryId: String!) {
  actorsByCategory(categoryId: $categoryId) {
    id
    name
    address
    city
    shortDescription
    lat
    lng
    entries {
      label
      icon
      color
      description
      parentEntry {
        code
        label
        color
      }
    }
    pictures {
      id
      label
      originalPicturePath
      originalPictureFilename
      position
      logo
    }
  }
}`;

const AnnuaireCategoryPage = ({ initialData }) => {
  const { data } = initialData;

  return (
    <AppLayout>
      <Container maxWidth="md">
        <Typography variant="h1">Category</Typography>

        <Stack spacing={2}>
          {initialData && data?.actorsByCategory?.map((actor) => {
            return <ActorCard key={actor.id} actor={actor} />;
          })}
        </Stack>
      </Container>
    </AppLayout>
  );
};

export default withApollo()(AnnuaireCategoryPage);

export async function getServerSideProps(context) {
  const { categoryId } = context.query;
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'actorsByCategory',
      variables: {
        categoryId,
      },
      query: GET_ACTORS_BY_CATEGORY,
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
