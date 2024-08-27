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
import ActorForm, { ActorFields } from 'containers/forms/ActorForm';
import { useSessionDispatch, useSessionState } from 'context/session/session';

const ADD_STAGE = gql`
  mutation createActor(
    $actorInfos: ActorInfos
    $userId: Int!
    $description: String!
    $volunteerDescription: String
    $logoPictures: [InputPictureType]
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $openingHours: [InputOpeningHour]
  ) {
    createActor(
      actorInfos: $actorInfos
      userId: $userId
      description: $description
      volunteerDescription: $volunteerDescription
      pictures: $pictures
      mainPictures: $mainPictures
      logoPictures: $logoPictures
      openingHours: $openingHours
    ) {
      id
      name
      url
    }
  }
`;

const AddActor = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();
  const [addActor, { data, loading, error }] = useMutation(ADD_STAGE);

  useGraphQLErrorDisplay(error);
  useEffect(() => {
    if (data) {
      enqueueSnackbar('Page acteur créée avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/acteur/${data.createActor.url}`);
    }
  }, [data]);

  const handleSubmit: SubmitHandler<ActorFields> = useCallback(async (formValues) => {
    const {
      name,
      address,
      email,
      phone,
      shortDescription,
      description,
      mainPicture,
      website,
      socialNetwork,
      activity,
      entries,
      entriesWithInformation,
      volunteerDescription,
      siren,
      enableOpenData,
      memberOf,
      referencingActor,
      removeReferencingActor,
      logoPicture,
      pictures,
    } = formValues;

    debugger;
    await uploadPictures([ ...logoPicture,...mainPicture, ...pictures,]);

    addActor({
      variables: {
        actorInfos: {
          name,
          email,
          phone,
          address: address.address,
          postCode: address.postcode,
          city: address.city,
          shortDescription,
          lat: address.lat,
          lng: address.lng,
          activity,
          website,
          socialNetwork,
          entries,
          entriesWithInformation,
          volunteerDescription,
          siren,
          enableOpenData,
          memberOf,
          referencingActor,
          removeReferencingActor
        },
        userId: parseInt(user.id),
        description,
        mainPictures: mainPicture.map((picture) => ({
          main: true,
          logo: false,
          ...formatPicture(picture),
        })),
        pictures: pictures.map((picture) => ({
          main: false,
          logo: false,
          ...formatPicture(picture),
        })),
        logoPictures: logoPicture.map((picture) => ({
          logo: true,
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
          Ajouter une page acteur
        </Typography>

        <ActorForm
          loading={loading || data?.createActor}
          submitLabel="Créer la page acteur"
          onSubmit={handleSubmit}
          defaultValues={{ }}
        />
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(AddActor);
