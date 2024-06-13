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

const GET_STAGE = gql`
  query stage($stageId: String!) {
    stage(id: $stageId) {
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

const EDIT_STAGE = gql`
  mutation editStage(
    $stageInfos: StageInfos
    $stageId: Int!
    $description: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $partnerPictures: [InputPictureType]
  ) {
    editStage(
      stageInfos: $stageInfos
      stageId: $stageId
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

const DELETE_STAGE = gql`
  mutation deleteStage($stageId: Int!, $deleteEvent: Boolean) {
    deleteStage(stageId: $stageId, deleteEvent: $deleteEvent)
  }
`;

const EditStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();
  const router = useRouter();
  const { id } = router.query;

  const { data: stageData, error: getError } = useQuery(GET_STAGE, {
    variables: { stageId: id },
    fetchPolicy: 'no-cache',
  });
  const [editStage, { data, loading, error }] = useMutation(EDIT_STAGE);
  const [deleteStage, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_STAGE);

  const [deletionModalOpen, setDeletionModalOpen] = useState(false);

  useGraphQLErrorDisplay(error);

  // Redirect if non-existent or non-authorized stage
  useEffect(() => {
    if (stageData?.stage && user?.role === 'user') {
      if (!stageData.stage.referents.map((r) => r.id).includes(user.id)) {
        router.push('/');
      }
    } else if (getError) {
      router.push('/');
    }
  }, [stageData, getError]);

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
      router.push(`/admin/stages`);
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'étape a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleDeletion = useCallback(() => {
    deleteStage({
      variables: {
        stageId: parseInt(`${id}`, 10),
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
        stageId: parseInt(id, 10),
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

  if (!stageData?.stage) {
    return null;
  }

  const { stage } = stageData;

  const startedAt = new Date(parseInt(stage.startedAt, 10));
  const endedAt = new Date(parseInt(stage.endedAt, 10));

  return (
    <AdminPageLayout authorizedRoles={['user', 'admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Editer une étape
        </Typography>
        <StageForm
          showReferents
          referentsList={user?.role === 'user' ? stage.referents : undefined}
          disabledFields={
            user?.role === 'user' ? ['address', 'startedAt', 'endedAt', 'isExtendedStage', 'referents'] : []
          }
          defaultValues={{
            address: {
              address: stage.address || stage.city,
              postcode: stage.postCode,
              city: stage.city,
              lat: parseFloat(stage.lat),
              lng: parseFloat(stage.lng),
            },
            email: stage.email,
            startedAt: startedAt.toISOString(),
            endedAt: endedAt.toISOString(),
            showHours: startedAt.getHours() !== 0 || endedAt.getHours() !== 0,
            isExtendedStage: stage.extendStage,
            shortDescription: stage.shortDescription,
            description: stage.description,
            website: stage.website,
            volunteerAction: stage.volunteerAction,
            volunteerForm: stage.volunteerForm,
            mainPicture: stage.pictures
              .filter((p) => p.main && !p.partner)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            pictures: stage.pictures
              .filter((p) => !p.main && !p.partner)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            partners: stage.pictures
              .filter((p) => !p.main && p.partner)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            referents: stage.referents.map((r) => r.id),
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
