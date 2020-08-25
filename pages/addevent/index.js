import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import AddEventForm from 'containers/forms/AddEventForm';

const AddEvent = () => {
  return (
    <AppLayout>
      <AddEventForm />
    </AppLayout>
  );
}

export default withApollo()(AddEvent)
