import React, { useCallback, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import UserForm, { UserFields } from '../../../containers/forms/UserForm.tsx';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';

const ADD_USER = gql`
  mutation AddUser($surname: String!, $lastname: String!, $email: String!, $role: UserRole!, $stageIds: [ID!]!) {
    addUser(surname: $surname, lastname: $lastname, email: $email, role: $role, stageIds: $stageIds) {
      id
    }
  }
`;

const AddUser = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addUser, { data, error }] = useMutation(ADD_USER);

  useGraphQLErrorDisplay(error);
  useEffect(() => {
    if (data) {
      enqueueSnackbar('Utilisateur·ice créé·e avec succès.', {
        preventDuplicate: true,
      });
      router.push('/admin/users');
    }
  }, [data]);

  const handleSubmit: SubmitHandler<UserFields> = useCallback(async (formValues) => {
    addUser({
      variables: {
        surname: formValues.surname,
        lastname: formValues.lastname,
        email: formValues.email,
        role: formValues.type,
        stageIds: formValues.stages || [],
      },
    });
  }, []);

  return (
    <AdminPageLayout authorizedRoles={['admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Ajouter un utilisateur·ice
        </Typography>

        <UserForm adminForm submitLabel="Ajouter" onSubmit={handleSubmit} />
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(AddUser);
