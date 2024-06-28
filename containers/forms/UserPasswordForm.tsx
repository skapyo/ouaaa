/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import PasswordField from 'components/fields/PasswordField';

export type UserPasswordFields = {
  password: string;
  passwordConfirm: string;
};

type Props = {
  submitLabel: string;
  onSubmit: SubmitHandler<UserPasswordFields>;
  defaultValues?: UserPasswordFields;
  forgotPassword?: boolean;
};

const UserPasswordForm = ({ defaultValues, submitLabel, onSubmit, forgotPassword = false }: Props) => {
  const form = useForm<UserPasswordFields>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <Stack direction="column" spacing={3} alignItems="center" component="form" onSubmit={handleSubmit(onSubmit)}>
        {forgotPassword && (
          <Typography>Vous pouvez maintenant définir un nouveau mot de passe pour votre compte</Typography>
        )}
        <PasswordField
          name="password"
          label="Mot de passe"
          helperText={'Le mot de passe doit contenir au moins 8 caractères'}
          rules={{
            required: 'Mot de passe requis',
            minLength: { value: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' },
          }}
        />

        <PasswordField
          name="passwordConfirm"
          label="Confirmation du mot de passe"
          rules={{
            validate: {
              identicalPasswords: (_, formValues) =>
                formValues.password === formValues.passwordConfirm || 'Les mots de passe doivent être identiques',
            },
          }}
        />

        <Button type="submit" variant="contained" sx={{ margin: 'auto' }}>
          {submitLabel}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default UserPasswordForm;
