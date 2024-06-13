import React, { useCallback, useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import { formatPicture, uploadPictures } from '../../../components/fields/ImageUploadField';
import EventForm, { EventFields } from 'containers/forms/EventForm';
import { useSessionState } from 'context/session/session';
import LoadingButton from '@mui/lab/LoadingButton';
import EventDeletionModal from 'components/modals/EventDeletionModal';

const GET_EVENT = gql`
  query getEvent($eventId: String) {
    event(id: $eventId) {
      label
      shortDescription
      startedAt
      endedAt
      lat
      lng
      address
      postCode
      city
      description
      participateButton
      practicalInfo
      facebookUrl
      category
      pictures {
        id
        originalPicturePath
        main
      }
      stages {
        id
        name
        startedAt
        referents {
          id
        }
      }
    }
  }
`;

const EDIT_EVENT = gql`
  mutation editEvent(
    $eventInfos: EventInfos
    $eventId: Int!
    $description: String!
    $practicalInfo: String
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    editEvent(
      eventInfos: $eventInfos
      eventId: $eventId
      description: $description
      practicalInfo: $practicalInfo
      pictures: $pictures
      mainPictures: $mainPictures
    ) {
      id
    }
  }
`;

const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(eventId: $eventId)
  }
`;

const EditEvent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();
  const router = useRouter();
  const { id } = router.query;

  const { data: eventData, error: getError } = useQuery(GET_EVENT, {
    variables: { eventId: id },
    fetchPolicy: 'no-cache',
  });
  const [editEvent, { data, loading, error }] = useMutation(EDIT_EVENT);
  const [deleteEvent, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_EVENT);

  const [deletionModalOpen, setDeletionModalOpen] = useState(false);

  useGraphQLErrorDisplay(error);

  // Redirect if non-existent or non-authorized stage
  useEffect(() => {
    if (eventData?.event && user.role === 'user') {
      if (!eventData.event.stages[0].referents.map((r) => r.id).includes(user.id)) {
        router.push('/');
      }
    } else if (getError) {
      router.push('/');
    }
  }, [eventData, getError]);

  useEffect(() => {
    if (data && data.editEvent && eventData?.event) {
      enqueueSnackbar('Activité modifiée avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/etape/${eventData.event.stages[0].name}/activite/${data.editEvent.id}`);
    }
  }, [data, eventData]);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteEvent) {
      enqueueSnackbar('Activité supprimée.', {
        preventDuplicate: true,
      });
      router.push(`/admin/events`);
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'activité a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleDeletion = useCallback(() => {
    deleteEvent({
      variables: {
        eventId: parseInt(`${id}`, 10),
      },
    });
    setDeletionModalOpen(false);
  }, []);

  const handleSubmit: SubmitHandler<EventFields> = useCallback(async (formValues) => {
    const { label, address, shortDescription, description, facebookUrl, practicalInfo, startedAt, endedAt, category,participateButton } =
      formValues;
    await uploadPictures([...formValues.mainPicture, ...formValues.pictures]);

    editEvent({
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
        eventId: parseInt(id, 10),
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

  if (!eventData?.event) {
    return null;
  }

  const { event } = eventData;

  return (
    <AdminPageLayout authorizedRoles={['user', 'admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Editer une activité
        </Typography>
        <EventForm
          disabledFields={['stage']}
          defaultValues={{
            stage: event.stages[0].id,
            label: event.label,
            shortDescription: event.shortDescription,
            address: {
              address: event.address,
              postcode: event.postCode,
              city: event.city,
              lat: event.lat,
              lng: event.lng,
            },
            startedAt: new Date(parseInt(event.startedAt, 10)).toISOString(),
            endedAt: new Date(parseInt(event.endedAt, 10)).toISOString(),
            description: event.description,
            facebookUrl: event.facebookUrl,
            practicalInfo: event.practicalInfo,
            category: event.category,
            participateButton : event.participateButton,
            mainPicture: event.pictures
              .filter((p) => p.main)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            pictures: event.pictures
              .filter((p) => !p.main)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
          }}
          submitLabel="Mettre à jour l'activité"
          loading={loading || data?.editEvent}
          onSubmit={handleSubmit}
          additionalButton={
            <LoadingButton
              loading={deleteLoading}
              color="error"
              type="submit"
              variant="outlined"
              sx={{ margin: 'auto' }}
              onClick={(e) => {
                setDeletionModalOpen(true);
                e.preventDefault();
              }}
            >
              Supprimer l'activité
            </LoadingButton>
          }
        />
      </Container>
      <EventDeletionModal
        open={deletionModalOpen}
        onClose={() => setDeletionModalOpen(false)}
        onSubmit={() => handleDeletion()}
      />
    </AdminPageLayout>
  );
};

export default withApollo()(EditEvent);
