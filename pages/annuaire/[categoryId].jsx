import React from 'react';
import { Typography, Container, Stack } from '@mui/material';
import ActorCard from 'components/cards/ActorCard';
import AppLayout from 'containers/layouts/AppLayout';
import { withApollo } from 'hoc/withApollo.jsx';

const GET_CATEGORY = `
query category($id: String!) {
  category(id: $id) {
    id
    label
    description
  }
}`;

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
    favorites {
      id
    }
  }
}`;

const AnnuaireCategoryPage = ({ category, actors }) => {
  const { data } = actors;

  return (
    <AppLayout>
      <Container sx={{
        backgroundColor: '#F6F6F6',
      }}
      >
        <Container maxWidth="md">
          <Typography variant="h1" pt={4}>{ category.data.category.label }</Typography>
          <Typography variant="h2">{ category.data.category.description }</Typography>
          <Stack spacing={2} py={4}>
            {actors && (data?.actorsByCategory?.map((actor) => {
              return <ActorCard key={actor.id} actor={actor} />;
            }))}
            {actors && (data?.actorsByCategory?.length < 1)
            && (<Typography>Pas d'acteur dans cette catégorie</Typography>)}
          </Stack>
        </Container>
      </Container>
    </AppLayout>
  );
};

export default withApollo()(AnnuaireCategoryPage);

export async function getServerSideProps(context) {
  const { categoryId } = context.query;
  const actorsResponse = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'actorsByCategory',
      variables: {
        categoryId,
      },
      query: GET_ACTORS_BY_CATEGORY,
    }),
  });
  const categoryResponse = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'category',
      variables: {
        id: categoryId,
      },
      query: GET_CATEGORY,
    }),
  });

  const actors = await actorsResponse.json();
  const category = await categoryResponse.json();
  if (actors.errors) {
    console.error(
      `Error fetching actors by category, error message : ${actors.errors[0].message}`,
    );
  }
  if (category.errors) {
    console.error(
      `Error fetching category, error message : ${category.errors[0].message}`,
    );
  }

  return {
    props: {
      category,
      actors,
    },
  };
}
