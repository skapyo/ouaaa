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
import EventForm, { EventFields } from 'containers/forms/EventForm';

const ADD_EVENT = gql`
  mutation createEvent(
    $eventInfos: EventInfos
    $stageId: Int!
    $description: String!
    $practicalInfo: String
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    createEvent(
      eventInfos: $eventInfos
      stageId: $stageId
      description: $description
      practicalInfo: $practicalInfo
      pictures: $pictures
      mainPictures: $mainPictures
    ) {
      id
      stages {
        id
        name
      }
    }
  }
`;

const AddEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { stageId } = router.query;

  const [addEvent, { data, loading, error }] = useMutation(ADD_EVENT);

  useGraphQLErrorDisplay(error);

  useEffect(() => {
    if (data && data.createEvent) {
      enqueueSnackbar('Activité créée avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/etape/${data.createEvent.stages[0].name}/activite/${data.createEvent.id}`);
    }
  }, [data]);

  const handleSubmit: SubmitHandler<EventFields> = useCallback(async (formValues) => {
    const {
      label,
      address,
      shortDescription,
      description,
      practicalInfo,
      startedAt,
      endedAt,
      facebookUrl,
      category,
      stage,
      participateButton
    } = formValues;

    await uploadPictures([...formValues.mainPicture, ...formValues.pictures]);

    addEvent({
      variables: {
        eventInfos: {
          label,
          shortDescription,
          startedAt,
          endedAt,
          lat: address.lat,
          lng: address.lng,
          address: address.address,
          postCode: address.postcode,
          city: address.city,
          facebookUrl,
          category,
          participateButton,
        },
        stageId: parseInt(stage, 10),
        description,
        practicalInfo,
        mainPictures: formValues.mainPicture.map((picture) => ({
          main: true,
          ...formatPicture(picture),
        })),
        pictures: formValues.pictures.map((picture) => ({
          main: false,
          ...formatPicture(picture),
        })),
      },
    });
  }, []);

  return (
    <AdminPageLayout authorizedRoles={['user', 'admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Ajouter une activité
        </Typography>
        <EventForm
          loading={loading || data?.createEvent}
          submitLabel="Ajouter l'activité"
          onSubmit={handleSubmit}
          defaultValues={{
            stage: stageId ? `${stageId}` : undefined,
          }}
        />
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(AddEvent);
