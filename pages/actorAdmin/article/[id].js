import React from 'react';
import { withApollo } from 'hoc/withApollo';
import { useRouter } from 'next/router';
import AppLayout from 'containers/layouts/AppLayout';
import EditArticleForm from 'containers/forms/EditArticleForm';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout hideFooter={true}>
      <EditArticleForm id={id} />
    </AppLayout>
  );
};

export default withApollo()(EditArticle);
