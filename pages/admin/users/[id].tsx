import React, { useCallback, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';
import UserForm, { UserFields } from '../../../containers/forms/UserForm';

const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      surname
      lastname
      email
      role
      stages {
        id
      }
    }
  }
`;

const EDIT_USER = gql`
  mutation editUser(
    $userId: ID!
    $surname: String!
    $lastname: String!
    $email: String!
    $role: UserRole!
    $stageIds: [ID!]!
  ) {
    editUser(userId: $userId, surname: $surname, lastname: $lastname, email: $email, role: $role, stageIds: $stageIds) {
      id
    }
  }
`;

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { enqueueSnackbar } = useSnackbar();
  const [editUser, { data: updateData, error: updateError }] = useMutation(EDIT_USER);

  const { error: getError, data: userData } = useQuery(GET_USER, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  useGraphQLErrorDisplay(getError);
  useGraphQLErrorDisplay(updateError);

  useEffect(() => {
    if (updateData) {
      enqueueSnackbar('Utilisateur·ice modifié·e avec succès.', {
        preventDuplicate: true,
      });
      router.push('/admin/users');
    }
  }, [updateData]);

  const handleSubmit: SubmitHandler<UserFields> = useCallback(async (formValues) => {
    editUser({
      variables: {
        userId: id,
        surname: formValues.surname,
        lastname: formValues.lastname,
        email: formValues.email,
        role: formValues.type,
        stageIds: formValues.stages,
      },
    });
  }, []);

  return (
    <AdminPageLayout authorizedRoles={['admin']}>
      <Container maxWidth="md">
        <Typography color="secondary" variant="h2" textAlign="center">
          Editer un·e utilisateur·ice
        </Typography>

        {userData?.user && (
          <UserForm
            adminForm
            defaultValues={{
              surname: userData.user.surname,
              lastname: userData.user.lastname,
              email: userData.user.email,
              type: userData.user.role,
              stages: userData.user.stages.map((s) => s.id),
            }}
            submitLabel="Modifier l'utilisateur·ice"
            onSubmit={handleSubmit}
          />
        )}
      </Container>
    </AdminPageLayout>
  );
};

export default withApollo()(EditUser);
