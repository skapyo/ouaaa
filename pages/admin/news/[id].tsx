import React, { useCallback, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import ArticleForm, { ArticleFields } from '../../../containers/forms/ArticleForm.tsx';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import { formatPicture, uploadPictures } from 'components/fields/ImageUploadField';

const GET_ARTICLE = gql`
  query article($id: String!) {
    article(id: $id) {
      id
      label
      content
      shortDescription
      bannerPrincipalPicture
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

const EDIT_ARTICLE = gql`
  mutation editArticle(
    $articleInfos: ArticleInfos
    $articleId: Int!
    $content: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    editArticle(
      articleInfos: $articleInfos
      articleId: $articleId
      content: $content
      mainPictures: $mainPictures
      pictures: $pictures
    ) {
      id
      label
      content
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

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;

  const { enqueueSnackbar } = useSnackbar();
  const [editArticle, { data: updateData, error: updateError }] = useMutation(EDIT_ARTICLE);

  const { error: getError, data: articleData } = useQuery(GET_ARTICLE, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  useGraphQLErrorDisplay(getError);
  useGraphQLErrorDisplay(updateError);

  useEffect(() => {
    if (updateData) {
      enqueueSnackbar('Article modifié avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/article/${updateData.editArticle.id}`);
    }
  }, [updateData]);

  const handleSubmit: SubmitHandler<ArticleFields> = useCallback(async (formValues) => {
    const { label, shortDescription, content, mainPicture, pictures } = formValues;

    await uploadPictures([...mainPicture, ...pictures]);

    editArticle({
      variables: {
        articleId: parseInt(id, 10),
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
          Editer une actualité
        </Typography>

        {articleData && (
          <ArticleForm
            defaultValues={{
              label: articleData.article.label,
              shortDescription: articleData.article.shortDescription,
              content: articleData.article.content,
              mainPicture: articleData.article.pictures
                .filter((p) => p.main)
                .map((p) => ({
                  id: p.id,
                  src: p.originalPicturePath,
                  deleted: false,
                })),
              pictures: articleData.article.pictures
                .filter((p) => !p.main)
                .map((p) => ({
                  id: p.id,
                  src: p.originalPicturePath,
                  deleted: false,
                })),
            }}
            submitLabel="Mettre à jour l'actualité"
            onSubmit={handleSubmit}
          />
        )}
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(EditArticle);
