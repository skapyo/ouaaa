/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import RichTextEditorField from '../../components/fields/RichTextEditorField';
import ImageUploadField, { FileType } from 'components/fields/ImageUploadField';
import GooglePlacesField, { LocationType } from '../../components/fields/GooglePlacesField';
import DateTimePickerField from '../../components/fields/DateTimePickerField';
import LoadingButton from '@mui/lab/LoadingButton';
import AutocompleteField from 'components/fields/AutocompleteField';
import { gql, useQuery } from '@apollo/client';
import RadioField from 'components/fields/RadioField';
import TextInputField from 'components/fields/TextInputField';
import UrlInputField from 'components/fields/UrlInputField';
import CheckboxField from 'components/fields/CheckboxField';

const GET_USERS = gql`
  query users {
    users {
      id
      surname
      lastname
    }
  }
`;

type GET_USERS_TYPE = {
  users: {
    id: string;
    surname: string;
    lastname: string;
  }[];
};

export type StageFields = {
  address: LocationType;
  email: string;
  startedAt: string | null;
  endedAt: string | null;
  showHours: boolean;
  isExtendedStage: boolean;
  shortDescription: string;
  description: string;
  website: string;
  volunteerAction: 'email' | 'externForm' | 'internForm';
  volunteerForm: string;
  mainPicture: FileType[];
  pictures: FileType[];
  partners: FileType[];
  referents: string[];
};

type Props = {
  submitLabel: string;
  onSubmit: SubmitHandler<StageFields>;
  loading?: boolean;
  defaultValues?: Partial<StageFields>;
  additionalButton?: JSX.Element;
  showReferents?: boolean;
  referentsList?: { id: string; surname: string; lastname: string }[];
  disabledFields?: (keyof StageFields)[];
};

const StageForm = ({
  defaultValues,
  submitLabel,
  onSubmit,
  loading,
  additionalButton,
  showReferents,
  referentsList,
  disabledFields,
}: Props) => {
  const form = useForm<StageFields>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { data } = useQuery<GET_USERS_TYPE>(GET_USERS);

  const previousStartedAt = useRef<string | null>();
  const startedAt = watch('startedAt');
  const endedAt = watch('endedAt');
  const showHours = watch('showHours');
  const volunteerAction = watch('volunteerAction');

  const errorMessages = Object.values(errors).map((e) => e.message);

  // Change endDate if startDate change
  useEffect(() => {
    if (
      startedAt &&
      previousStartedAt.current &&
      endedAt &&
      !defaultValues?.['startedAt'] &&
      !defaultValues?.['endedAt']
    ) {
      const previousStartedAtDate = new Date(previousStartedAt.current);
      const startedAtDate = new Date(startedAt);
      const endedAtDate = new Date(endedAt);
      const diff = endedAtDate.getTime() - previousStartedAtDate.getTime();
      setValue('endedAt', new Date(startedAtDate.getTime() + diff).toISOString());
    }

    previousStartedAt.current = startedAt;
  }, [startedAt]);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }}>
        <Stack direction="column" gap={3}>
          <GooglePlacesField
            name="address"
            label="Ville"
            noOptionsText="Aucune ville trouvée"
            rules={{ required: 'Ville requise' }}
            disabled={disabledFields?.includes('address')}
          />

          <TextInputField
            name="email"
            label="Email de contact"
            type="email"
            helperText={
              'Un email générique type "contact@structure.fr" est préférable à un mail nominatif type "prenom.nom@gmail.com" notamment pour limiter la pollution publicitaire des boites mail (robots parsant le web)'
            }
            rules={{ required: 'Email de contact requis' }}
          />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <DateTimePickerField
              label="Date de début"
              name="startedAt"
              rules={{ required: 'Date de début requise' }}
              shouldDisableTime={!showHours}
              shouldDisableDate={disabledFields?.includes('startedAt')}
            />
            <DateTimePickerField
              label="Date de fin"
              name="endedAt"
              rules={{
                required: 'Date de fin requise',
                validate: {
                  afterStartDate: (v, formValues) => {
                    return v >= formValues.startedAt || 'La date de fin doit être après celle de début';
                  },
                },
              }}
              minDateTime={startedAt ? new Date(startedAt) : undefined}
              defaultCalendarMonth={startedAt ? new Date(startedAt) : undefined}
              shouldDisableTime={!showHours}
              shouldDisableDate={disabledFields?.includes('endedAt')}
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center">
            <CheckboxField name="showHours" label="Avec horaire" />
            <CheckboxField
              name="isExtendedStage"
              label="Tour étendu"
              disabled={disabledFields?.includes('isExtendedStage')}
            />
          </Stack>

          <TextInputField
            name="shortDescription"
            label="Description courte"
            helperText={
              'Cette description courte s’affichera en vue liste et dans les blocs de survol/clic de la carte.'
            }
            rules={{
              required: 'Description courte requis',
              maxLength: { value: 90, message: 'Maximum 90 caractères' },
            }}
          />

          <RichTextEditorField
            name="description"
            label="Description longue"
            helperText={
              "Cette description longue s'affichera sur la page étape. Vous pouvez mettre autant de détail que vous le souhaitez et vous pouvez aussi appliquer de la mise en forme (gras, italique, liens)."
            }
            rules={{
              required: "Description de l'activité requise",
            }}
          />

          <UrlInputField name="website" label="Site web" />

          <RadioField
            name="volunteerAction"
            label="Bouton d'action pour aider à l'organisation de l'étape"
            rules={{ required: "Le choix du bouton d'action est requis" }}
            options={[
              { value: 'email', label: 'Email de contact' },
              { value: 'externForm', label: 'Formulaire externe' },
            ]}
          />

          {volunteerAction === 'externForm' && (
            <UrlInputField
              name="volunteerForm"
              label="Formulaire externe"
              rules={{ required: "L'url du formulaire externe est requise" }}
            />
          )}

          <ImageUploadField
            name="mainPicture"
            label="Photo principale"
            filesLimit={1}
            dropzoneText="Déposez ici votre photo principale au format jpg et de poids inférieur à 4Mo"
            sx={{ marginTop: 6 }}
          />

          <ImageUploadField
            name="pictures"
            label="Autres photos"
            dropzoneText="Déposez ici vos autres photos au format jpg et de poids inférieur à 4Mo"
          />

          <ImageUploadField
            name="partners"
            label="Partenaires"
            dropzoneText="Déposez ici vos les photos des partenaires au format jpg et de poids inférieur à 4Mo"
          />

          {showReferents && (
            <AutocompleteField
              name="referents"
              label="Référent·es associé·es à l’étape"
              multiple
              options={(data?.users || referentsList || []).map((u) => ({
                id: u.id,
                label: `${u.surname} ${u.lastname}`,
              }))}
              disabled={disabledFields?.includes('referents')}
            />
          )}

          <Tooltip title={errorMessages.length > 0 ? errorMessages.map((e) => <div>{e}</div>) : ''} arrow>
            <Box sx={{ margin: 'auto' }}>
              <LoadingButton disabled={errorMessages.length > 0} loading={loading} type="submit" variant="contained">
                {submitLabel}
              </LoadingButton>
            </Box>
          </Tooltip>

          {additionalButton}
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default StageForm;
