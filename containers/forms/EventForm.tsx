/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import RichTextEditorField from '../../components/fields/RichTextEditorField';
import ImageUploadField, { FileType } from 'components/fields/ImageUploadField';
import GooglePlacesField, { LocationType } from '../../components/fields/GooglePlacesField';
import DateTimePickerField from '../../components/fields/DateTimePickerField';
import LoadingButton from '@mui/lab/LoadingButton';
import SelectField from 'components/fields/SelectField';
import eventCategories from 'src/eventCategories';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import AutocompleteField from 'components/fields/AutocompleteField';
import TextInputField from 'components/fields/TextInputField';
import UrlInputField from 'components/fields/UrlInputField';
import CheckboxField from 'components/fields/CheckboxField';

const GET_STAGES = gql`
  query Stages {
    stages(sort: "startedAt", canAdmin: true) {
      id
      name
      startedAt
    }
  }
`;

type GET_STAGES_TYPE = {
  stages: {
    id: string;
    name: string;
    startedAt: string;
  }[];
};

export type EventFields = {
  stage: string;
  label: string;
  category: string;
  address: LocationType;
  startedAt: string | null;
  endedAt: string | null;
  shortDescription: string;
  description: string;
  facebookUrl: string;
  practicalInfo: string;
  mainPicture: FileType[];
  pictures: FileType[];
  participateButton: boolean;
};

type Props = {
  submitLabel: string;
  onSubmit: SubmitHandler<EventFields>;
  loading?: boolean;
  defaultValues?: Partial<EventFields>;
  additionalButton?: JSX.Element;
  disabledFields?: (keyof EventFields)[];
};

const EventForm = ({ defaultValues, submitLabel, onSubmit, loading, additionalButton, disabledFields }: Props) => {
  const form = useForm<EventFields>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { data } = useQuery<GET_STAGES_TYPE>(GET_STAGES);

  const stageId = watch('stage');
  const startedAt = watch('startedAt');

  const errorMessages = Object.values(errors).map((e) => e.message);

  const [stageStartedAt, setStageStartedAt] = useState<Date>(new Date());

  // Watch the category field
  const category = watch('category');

  // Check the checkbox if the category is 'dcnv'
  React.useEffect(() => {
    if (category === 'dcnv') {
      setValue('participateButton', true);
      
    }
  }, [category, setValue]);

  useEffect(() => {
    if (data?.stages) {
      if (data?.stages.length === 1) {
        setValue('stage', data?.stages[0].id);
      }

      const currentStage = data?.stages.find((s) => s.id === stageId);

      if (currentStage) {
        // Update reference date when stage changes
        const newStageStartedAt = new Date(parseInt(currentStage.startedAt, 10));
        newStageStartedAt.setHours(0, 0, 0, 0);
        setStageStartedAt(newStageStartedAt);

        // Change event dates when stage changes
        const newStartedAt = new Date(parseInt(currentStage.startedAt, 10));
        const startedAtPlusOneHour = new Date(newStartedAt.getTime() + 60 * 60 * 1000);

        setValue('startedAt', newStartedAt.toISOString());
        setValue('endedAt', startedAtPlusOneHour.toISOString());
      }
    }
  }, [stageId, data]);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }}>
        <Stack direction="column" gap={3}>
          <AutocompleteField
            name="stage"
            label="Etape"
            options={(data?.stages || []).map((s) => ({ id: s.id, label: s.name }))}
            rules={{
              required: 'Etape requise',
            }}
            disabled={disabledFields?.includes('stage')}
          />

          <TextInputField
            name="label"
            label="Nom de l'activité"
            rules={{
              required: "Nom de l'activité requis",
            }}
          />

          <SelectField
            name="category"
            label="Catégorie"
            options={Object.entries(eventCategories).map(([value, label]) => ({ value, label }))}
            rules={{
              required: 'Catégorie requise',
            }}
          />

          <GooglePlacesField
            name="address"
            label="Adresse de l'activité"
            noOptionsText="Aucune adresse trouvée"
            rules={{ required: 'Adresse requise' }}
          />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <DateTimePickerField
              label="Date de début"
              name="startedAt"
              rules={{ required: 'Date de début requise' }}
              minDateTime={stageStartedAt}
              defaultCalendarMonth={stageStartedAt}
            />
            <DateTimePickerField
              label="Date de fin"
              name="endedAt"
              rules={{
                required: 'Date de fin requise',
                validate: {
                  afterStartDate: (v, formValues) => {
                    return v > formValues.startedAt || 'La date de fin doit être après celle de début';
                  },
                },
              }}
              minDateTime={startedAt ? new Date(startedAt) : undefined}
              defaultCalendarMonth={startedAt ? new Date(startedAt) : stageStartedAt}
            />
          </Stack>

          <TextInputField
            name="shortDescription"
            label="Résumé de l'activité"
            rules={{
              required: "Résumé de l'activité requis",
              maxLength: { value: 90, message: 'Maximum 90 caractères' },
            }}
          />

          <RichTextEditorField
            name="description"
            label="Description"
            rules={{
              required: "Description de l'activité requise",
            }}
          />

          <UrlInputField
            name="facebookUrl"
            label="Site web"
            placeholder="https://monsite.fr"
            sx={{ marginTop: 6 }}
          />

          <CheckboxField
            name="participateButton"
            label="Activer l'inscription à l'activité"
            disabled={disabledFields?.includes('participateButton')||   category === 'dcnv'}
          />

          <RichTextEditorField
            name="practicalInfo"
            label="Informations pratiques"
          />

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

export default EventForm;
