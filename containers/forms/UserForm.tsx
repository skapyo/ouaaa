/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import AutocompleteField from 'components/fields/AutocompleteField';
import TextInputField from 'components/fields/TextInputField';
import RadioField from 'components/fields/RadioField';

const GET_STAGES = gql`
  query Stages {
    stages(sort: "startedAt", canAdmin: true) {
      id
      name
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

export type UserFields = {
  surname: string;
  lastname: string;
  email: string;
  type: 'user' | 'admin';
  stages: string[];
};

type Props = {
  adminForm?: boolean;
  submitLabel: string;
  onSubmit: SubmitHandler<UserFields>;
  defaultValues?: UserFields;
  additionalButton?: JSX.Element;
};

const UserForm = ({ adminForm = false, defaultValues, submitLabel, onSubmit, additionalButton }: Props) => {
  const form = useForm<UserFields>({
    mode: 'onTouched',
    defaultValues: defaultValues || { type: 'user' },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const { data } = useQuery<GET_STAGES_TYPE>(GET_STAGES);

  const isAdmin = watch('type') === 'admin';

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }}>
        <Stack direction="column" gap={2}>
          <TextInputField
            name="surname"
            label="Prénom"
            rules={{
              required: 'Prénom requis',
            }}
          />

          <TextInputField
            name="lastname"
            label="Nom"
            rules={{
              required: 'Nom requis',
            }}
          />

          <TextInputField
            name="email"
            label="Email"
            type="email"
            rules={{
              required: 'Email requis',
            }}
          />

          {adminForm && (
            <RadioField
              name="type"
              label="Type"
              options={[
                { value: 'user', label: "Référent d'étape" },
                { value: 'admin', label: 'Admin' },
              ]}
            />
          )}

          {adminForm && !isAdmin && (
            <AutocompleteField
              name="stages"
              label="Etape(s) associée(s)"
              multiple
              options={(data?.stages || []).map((s) => ({ id: s.id, label: s.name }))}
            />
          )}
          {adminForm && isAdmin && <Typography>Les admins sont associés par défaut à toutes les étapes</Typography>}

          <Button type="submit" variant="contained" sx={{ margin: 'auto' }}>
            {submitLabel}
          </Button>

          {additionalButton}
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default UserForm;
