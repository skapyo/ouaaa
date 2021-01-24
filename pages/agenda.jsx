import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';

import AgendaPageLayout from 'containers/layouts/agendaPage/AgendaPageLayout';
import React from 'react';
import Head from 'next/head';

const Agenda = () => {
  return (
    <AppLayout>
      <Head>
        <title>Agenda des Acteurs de la transition en Aunis</title>
      </Head>
      <AgendaPageLayout />
    </AppLayout>
  );
};

export default withApollo()(Agenda);
