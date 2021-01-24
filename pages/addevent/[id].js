import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import AddEventForm from 'containers/forms/AddEventForm';
import { useRouter } from 'next/router';

const AddEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout>
      <AddEventForm actorId={id} />
    </AppLayout>
  );
};

export default withApollo()(AddEvent);
