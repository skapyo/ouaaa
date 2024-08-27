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
import ActorForm, { ActorFields } from 'containers/forms/ActorForm';
import ActorDeletionModal from 'components/modals/ActorDeletionModal';

const GET_ACTOR = gql`
  query actor($actorId: String!) {
    actor(id: $actorId) {
      id
      name
      email
      phone
      address
      postCode
      city
      website
      socialNetwork
      siren
      hasVideoVouaaar
      enableOpenData
      description
      lat
      lng
      activity
      shortDescription
      volunteerDescription
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        position
        logo
        main
      }
      entries {
        id
        label
        icon
        description
        actorEntries {
          linkDescription
          topSEO
          id
        }
        parentEntry {
          id
          code
          label
        }
        subEntries {
          id
          code
          label
          icon
          description
          actorEntries {
            linkDescription
            topSEO
            id
          }
        }
        collection {
          id
          code
          label
        }
      }
      contact_id
      openingHours {
        id
        days {
          id
          day
          selected
          identifier
        }
        hours
        place
      }
      referents {
        id
        surname
        lastname
      }
      memberOf {
        id
        name
      }
      referencingActor {
        id
        name
      }
    }
  }
`;


const EDIT_ACTOR = gql`
  mutation editActor(
    $actorInfos: ActorInfos
    $actorId: Int!
    $description: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $partnerPictures: [InputPictureType]
  ) {
    editActor(
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
  mutation deleteActor($actorId: Int!, $deleteEvent: Boolean) {
    deleteActor(actorId: $actorId, deleteEvent: $deleteEvent)
  }
`;

const EditActor = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSessionState();
  const router = useRouter();
  const { id } = router.query;

  const { data: actorData, error: getError } = useQuery(GET_ACTOR, {
    variables: { actorId: id },
    fetchPolicy: 'no-cache',
  });
  const [editActor, { data, loading, error }] = useMutation(EDIT_ACTOR);
  const [deleteActor, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_ACTOR);

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
    if (data && data.editActor) {
      enqueueSnackbar('Page acteur avec succès.', {
        preventDuplicate: true,
      });
      router.push(`/etape/${data.editActor.name}`);
    }
  }, [data]);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteActor) {
      enqueueSnackbar('Page acteur supprimé.', {
        preventDuplicate: true,
      });
      router.push(`/admin/actors`);
    } else if (deleteError) {
      enqueueSnackbar("La suppression de la page acteur a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleDeletion = useCallback(() => {
    deleteActor({
      variables: {
        actorId: parseInt(`${id}`, 10),
        deleteEvent: true,
      },
    });
    setDeletionModalOpen(false);
  }, []);

  const handleSubmit: SubmitHandler<ActorFields> = useCallback(async (formValues) => {
    const {
      address,
      email,
      shortDescription,
      description,
      mainPicture,
      website,
      pictures,
      partners,
      referents,

    } = formValues;

    await uploadPictures([...mainPicture, ...pictures, ...partners]);

    editActor({
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
          extendActor: isExtendedActor,
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
          Editer une page acteur
        </Typography>
        <ActorForm
          showReferents
          referentsList={user?.role === 'user' ? actor.referents : undefined}
          defaultValues={{
            address: {
              address: actor.address || actor.city,
              postcode: actor.postCode,
              city: actor.city,
              lat: parseFloat(actor.lat),
              lng: parseFloat(actor.lng),
            },
            name: actor.name,
            email: actor.email,
            phone: actor.phone,
            activity: actor.activity,
            socialNetwork: actor.socialNetwork,
            siren: actor.siren,
            enableOpenData: actor.enableOpenData,
            hasVideoVouaaar: actor.hasVideoVouaaar,
            shortDescription: actor.shortDescription,
            description: actor.description,
            website: actor.website,
            volunteerDescription: actor.volunteerDescription,
            volunteerAction: actor.volunteerAction,
            volunteerForm: actor.volunteerForm,
            entries: actor.entries.map((e) => e.id),
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
              logoPicture: actor.pictures
              .filter((p) => !p.main && p.logo)
              .map((p) => ({
                id: p.id,
                src: p.originalPicturePath,
                deleted: false,
              })),
            referents: actor.referents.map((r) => r.id),
          }}
          submitLabel="Mettre à jour l'étape"
          loading={loading || data?.editActor}
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
      <ActorDeletionModal
        open={deletionModalOpen}
        onClose={() => setDeletionModalOpen(false)}
        onSubmit={() => handleDeletion()}
      />
    </AdminPageLayout>
  );
};

export default withApollo()(EditActor);
