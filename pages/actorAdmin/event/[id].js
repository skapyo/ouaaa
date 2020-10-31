import React from 'react';
import {withApollo} from 'hoc/withApollo';
import {useRouter} from 'next/router';
import AppLayout from 'containers/layouts/AppLayout';
import EditEventForm from 'containers/forms/EditEventForm';

const EditEvent = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <EditEventForm id={id} />
    </AppLayout>
  );
};

export default withApollo()(EditEvent);
