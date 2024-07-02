import React, { useCallback, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import { formatPicture, uploadPictures } from '../../../components/fields/ImageUploadField';
import ActorForm, { StageFields } from 'containers/forms/ActorForm';

const ADD_STAGE = gql`
  mutation createStage(
    $stageInfos: StageInfos
    $description: String!
    $mainPictures: [InputPictureType]
    $partnerPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    createStage(
      stageInfos: $stageInfos
      description: $description
      mainPictures: $mainPictures
      pictures: $pictures
      partnerPictures: $partnerPictures
    ) {
      id
      name
    }
  }
`;

const AddStage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addStage, { data, loading, error }] = useMutation(ADD_STAGE);

  useGraphQLErrorDisplay(error);
  useEffect(() => {
    if (data) {
      enqueueSnackbar('Etape créée avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/etape/${data.createStage.name}`);
    }
  }, [data]);

  const handleSubmit: SubmitHandler<StageFields> = useCallback(async (formValues) => {
    const {
      address,
      email,
      shortDescription,
      description,
      startedAt,
      endedAt,
      isExtendedStage,
      mainPicture,
      website,
      volunteerAction,
      volunteerForm,
      pictures,
      partners,
    } = formValues;

    await uploadPictures([...mainPicture, ...pictures, ...partners]);

    addStage({
      variables: {
        stageInfos: {
          name: address.city,
          email,
          address: address.address,
          postCode: address.postcode,
          city: address.city,
          shortDescription,
          lat: address.lat,
          lng: address.lng,
          startedAt,
          website,
          volunteerAction,
          volunteerForm,
          endedAt,
          extendStage: isExtendedStage,
        },
        description,
        mainPictures: mainPicture.map((picture) => ({
          main: true,
          partner: false,
          ...formatPicture(picture),
        })),
        pictures: pictures.map((picture) => ({
          main: false,
          partner: false,
          ...formatPicture(picture),
        })),
        partnerPictures: partners.map((picture) => ({
          main: false,
          partner: true,
          ...formatPicture(picture),
        })),
      },
    });
  }, []);

  return (
    <AdminPageLayout authorizedRoles={['admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Ajouter une page acteur
        </Typography>

        <ActorForm
          loading={loading || data?.createStage}
          submitLabel="Créer la page acteur"
          onSubmit={handleSubmit}
          defaultValues={{ showHours: true }}
        />
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(AddStage);
