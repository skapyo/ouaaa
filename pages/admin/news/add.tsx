import React, { useCallback, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import ArticleForm, { ArticleFields } from '../../../containers/forms/ArticleForm.tsx';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import { formatPicture, uploadPictures } from '../../../components/fields/ImageUploadField';

const ADD_ARTICLE = gql`
  mutation createArticle(
    $articleInfos: ArticleInfos
    $content: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    createArticle(articleInfos: $articleInfos, content: $content, mainPictures: $mainPictures, pictures: $pictures) {
      id
      label
      content
    }
  }
`;

const AddArticle = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addArticle, { data, error }] = useMutation(ADD_ARTICLE);

  useGraphQLErrorDisplay(error);
  useEffect(() => {
    if (data) {
      enqueueSnackbar('Article créé avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/article/${data.createArticle.id}`);
    }
  }, [data]);

  const handleSubmit: SubmitHandler<ArticleFields> = useCallback(async (formValues) => {
    const { label, shortDescription, content, mainPicture, pictures } = formValues;

    await uploadPictures([...mainPicture, ...pictures]);

    addArticle({
      variables: {
        articleInfos: {
          label,
          shortDescription,
          published: true,
        },
        content,
        mainPictures: mainPicture.map((picture) => ({
          main: true,
          ...formatPicture(picture),
        })),
        pictures: pictures.map((picture) => ({
          main: false,
          ...formatPicture(picture),
        })),
      },
    });
  }, []);

  return (
    <AdminPageLayout authorizedRoles={['admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Ajouter une actualité
        </Typography>

        <ArticleForm submitLabel="Créer l'actualité" onSubmit={handleSubmit} />
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(AddArticle);
