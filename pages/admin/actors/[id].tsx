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
import { useSessionState } from 'context/session/session';
import LoadingButton from '@mui/lab/LoadingButton';
import StageForm, { StageFields } from 'containers/forms/StageForm';
import StageDeletionModal from 'components/modals/StageDeletionModal';

const GET_ACTOR = gql`
  query actor($actorId: String!) {
    actor(id: $actorId) {
      id
      name
      email
      startedAt
      endedAt
      extendStage
      address
      postCode
      city
      lat
      lng
      shortDescription
      description
      website
      volunteerAction
      volunteerForm
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        position
        logo
        main
        partner
      }
      referents {
        id
        surname
        lastname
      }
    }
  }
`;

const EDIT_ACTOR = gql`
  mutation editStage(
    $actorInfos: StageInfos
    $actorId: Int!
    $description: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $partnerPictures: [InputPictureType]
  ) {
    editStage(
      actorInfos: $actorInfos
      actorId: $actorId
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

const DELETE_ACTOR = gql`
  mutation deleteStage($actorId: Int!, $deleteEvent: Boolean) {
    deleteStage(actorId: $actorId, deleteEvent: $deleteEvent)
  }
`;

const EditStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();
  const router = useRouter();
  const { id } = router.query;

  const { data: actorData, error: getError } = useQuery(GET_ACTOR, {
    variables: { actorId: id },
    fetchPolicy: 'no-cache',
  });
  const [editStage, { data, loading, error }] = useMutation(EDIT_ACTOR);
  const [deleteStage, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_ACTOR);

  const [deletionModalOpen, setDeletionModalOpen] = useState(false);

  useGraphQLErrorDisplay(error);

  // Redirect if non-existent or non-authorized actor
  useEffect(() => {
    if (actorData?.actor && user?.role === 'user') {
      if (!actorData.actor.referents.map((r) => r.id).includes(user.id)) {
        router.push('/');
      }
    } else if (getError) {
      router.push('/');
    }
  }, [actorData, getError]);

  useEffect(() => {
    if (data && data.editStage) {
      enqueueSnackbar('Etape modifiée avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/etape/${data.editStage.name}`);
    }
  }, [data]);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteStage) {
      enqueueSnackbar('Etape supprimée.', {
        preventDuplicate: true,
      });
      router.push(`/admin/actors`);
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'étape a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleDeletion = useCallback(() => {
    deleteStage({
      variables: {
        actorId: parseInt(`${id}`, 10),
        deleteEvent: true,
      },
    });
    setDeletionModalOpen(false);
  }, []);

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
      referents,
    } = formValues;

    await uploadPictures([...mainPicture, ...pictures, ...partners]);

    editStage({
      variables: {
        actorId: parseInt(id, 10),
        actorInfos: {
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
          referents,
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

  if (!actorData?.actor) {
    return null;
  }

  const { actor } = actorData;

  const startedAt = new Date(parseInt(actor.startedAt, 10));
  const endedAt = new Date(parseInt(actor.endedAt, 10));

  return (
    <AdminPageLayout authorizedRoles={['user', 'admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Editer une étape
        </Typography>
        <StageForm
          showReferents
          referentsList={user?.role === 'user' ? actor.referents : undefined}
          disabledFields={
            user?.role === 'user' ? ['address', 'startedAt', 'endedAt', 'isExtendedStage', 'referents'] : []
          }
          defaultValues={{
            address: {
              address: actor.address || actor.city,
              postcode: actor.postCode,
              city: actor.city,
              lat: parseFloat(actor.lat),
              lng: parseFloat(actor.lng),
            },
            email: actor.email,
            startedAt: startedAt.toISOString(),
            endedAt: endedAt.toISOString(),
            showHours: startedAt.getHours() !== 0 || endedAt.getHours() !== 0,
            isExtendedStage: actor.extendStage,
            shortDescription: actor.shortDescription,
            description: actor.description,
            website: actor.website,
            volunteerAction: actor.volunteerAction,
            volunteerForm: actor.volunteerForm,
            mainPicture: actor.pictures
              .filter((p) => p.main && !p.partner)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            pictures: actor.pictures
              .filter((p) => !p.main && !p.partner)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            partners: actor.pictures
              .filter((p) => !p.main && p.partner)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            referents: actor.referents.map((r) => r.id),
          }}
          submitLabel="Mettre à jour l'étape"
          loading={loading || data?.editStage}
          onSubmit={handleSubmit}
          additionalButton={
            user?.role === 'admin' ? (
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
                Supprimer l'étape
              </LoadingButton>
            ) : undefined
          }
        />
      </Container>
      <StageDeletionModal
        open={deletionModalOpen}
        onClose={() => setDeletionModalOpen(false)}
        onSubmit={() => handleDeletion()}
      />
    </AdminPageLayout>
  );
};

export default withApollo()(EditStage);
