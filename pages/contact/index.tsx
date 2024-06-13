import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { withApollo } from 'hoc/withApollo';
import ImageUploadField, { FileType, formatPicture, uploadPictures } from 'components/fields/ImageUploadField';
import { useSnackbar } from 'notistack';
import RadioField from 'components/fields/RadioField';
import TextInputField from 'components/fields/TextInputField';

const SEND_CONTACT_FORM_EMAIL = gql`
  mutation sendContactFormEmail($contactForm: ContactFormInfos!) {
    sendContactFormEmail(contactForm: $contactForm)
  }
`;

type ContactFields = {
  category: 'message' | 'improvementbug';
  name: string;
  email: string;
  object: string;
  message: string;
  pictures: FileType[];
};

const Contact = () => {
  const form = useForm<ContactFields>({
    mode: 'onTouched',
    defaultValues: {
      category: 'message'
    }
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const isBug = watch('category') === 'improvementbug';

  const [sendContactForm, { data, error, loading }] = useMutation(SEND_CONTACT_FORM_EMAIL);
  const [messageSent, setMessageSent] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!loading && data) {
      setMessageSent(true);
    } else if (error) {
      enqueueSnackbar("Une erreur s'est produite, merci de bien vouloir réessayer.", {
        preventDuplicate: true,
      });
    }
  }, [data, error, loading]);

  const onSubmit: SubmitHandler<ContactFields> = useCallback(
    async ({ name, email, object, message, category, pictures }) => {
      if (pictures) {
        await uploadPictures(pictures);
      }

      sendContactForm({
        variables: {
          contactForm: {
            name,
            email,
            object,
            message,
            category,
            pictures: pictures?.map(formatPicture),
          },
        },
      });
    },
    [],
  );

  if (messageSent) {
    return (
      <AppLayout>
        <Container maxWidth="md" sx={{ marginTop: { xs: 3, md: 6 }, marginBottom: 6 }}>
          <Typography variant="h1" textAlign="center">
            Contact
          </Typography>
          <Typography variant="h6" textAlign="center" sx={{ marginTop: 3 }}>
            Votre message a bien été envoyé. Merci.
          </Typography>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ marginTop: { xs: 3, md: 6 }, marginBottom: 6 }}>
        <Typography variant="h1" textAlign="center">
          Contact
        </Typography>

        <FormProvider {...form}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Stack direction="column" gap={2}>
              <RadioField
                name="category"
                label=""
                row
                options={[
                  { value: 'message', label: 'Message' },
                  { value: 'improvementbug', label: 'Amélioration ou Bug' },
                ]}
                rules={{ required: 'Le type de message est requis' }}
                sx={{ margin: 'auto' }}
              />

              <TextInputField
                name="name"
                label="Prénom Nom"
                rules={{
                  required: 'Nom requis',
                }}
              />

              <TextInputField
                name="email"
                label="Adresse de messagerie"
                type="email"
                rules={{
                  required: 'Adresse de messagerie requise',
                }}
              />

              <TextInputField
                name="object"
                label="Objet"
                rules={{
                  required: 'Objet requis',
                }}
              />

              <TextInputField
                name="message"
                label="Message"
                required
                multiline
                minRows={6}
                maxRows={10}
                rules={{
                  required: 'Message requis',
                }}
              />

              {isBug && (
                <ImageUploadField
                  name="pictures"
                  label="Ajoutez une photo de votre ecran"
                  dropzoneText="Déposez ici vos photos pour nous aider à comprendre le bug rencontré ou l'amélioration souhaitée (au format jpg et inférieur à 4Mo)"
                  filesLimit={3}
                />
              )}

              <Button type="submit" variant="contained" sx={{ margin: 'auto' }}>
                Envoyer
              </Button>
            </Stack>
          </Box>
        </FormProvider>
      </Container>
    </AppLayout>
  );
};

export default withApollo()(Contact);
