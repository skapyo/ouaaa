import {withApollo} from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';

import AgendaPageLayout from 'containers/layouts/agendaPage/AgendaPageLayout';

const Agenda = () => {


  return (
    <AppLayout>
      <AgendaPageLayout />
    </AppLayout>
  );
}

export default withApollo()(Agenda)
