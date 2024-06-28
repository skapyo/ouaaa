/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import RichTextEditorField from '../../components/fields/RichTextEditorField';
import ImageUploadField, { FileType, isExistingFile } from '../../components/fields/ImageUploadField';
import TextInputField from 'components/fields/TextInputField';

export type ArticleFields = {
  label: string;
  shortDescription: string;
  mainPicture: FileType[];
  content: string;
  pictures: FileType[];
};

type Props = {
  submitLabel: string;
  onSubmit: SubmitHandler<ArticleFields>;
  defaultValues?: ArticleFields;
};

const ArticleForm = ({ defaultValues, submitLabel, onSubmit }: Props) => {
  const form = useForm<ArticleFields>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }}>
        <Stack direction="column" gap={2}>
          <TextInputField
            name="label"
            label="Nom de l'actualité"
            rules={{
              required: "Nom de l'actualité requis",
            }}
          />

          <TextInputField
            name="shortDescription"
            label="Résumé"
            rules={{
              required: 'Résumé requis',
              maxLength: { value: 90, message: 'Maximum 90 caractères' },
            }}
          />

          <ImageUploadField
            name="mainPicture"
            label="Bannière"
            filesLimit={1}
            rules={{
              validate: {
                required: (pictures) =>
                  pictures?.filter((picture) => !(isExistingFile(picture) && picture.deleted)).length > 0 ||
                  'Bannière requise',
              },
            }}
          />

          <RichTextEditorField
            name="content"
            label="Contenu de l'actualité"
            rules={{
              required: "Contenu de l'actualité requis",
            }}
          />

          <ImageUploadField name="pictures" label="Autres photos" />

          <Button type="submit" variant="contained" sx={{ margin: 'auto' }}>
            {submitLabel}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default ArticleForm;
