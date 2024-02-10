import React from 'react';
import { withApollo } from 'hoc/withApollo';
import { useRouter } from 'next/router';
import AppLayout from 'containers/layouts/AppLayout';
import EditRecipeForm from 'containers/forms/EditRecipeForm';

const EditRecipe = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout hideFooter={true}>
      <EditRecipeForm id={id} />
    </AppLayout>
  );
};

export default withApollo()(EditRecipe);
