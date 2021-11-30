import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';

import AgendaPageLayout from 'containers/layouts/agendaPage/AgendaPageLayout';
import React from 'react';
import Head from 'next/head';

const Agenda = () => {
  return (
    <AppLayout hideFooter={true}>
      <Head>
        <title>L&apos;agenda de la transition écologique et sociale en Aunis</title>
        <meta name="description" content="Les associations, entreprises, particuliers, services publics, collectifs et réseaux de la transition écologique et sociale en Aunis proposent toute l'année des évènements, rencontres, débats, manifestations, formations... Viens y participer !" />
      </Head>
      <AgendaPageLayout />
    </AppLayout>
  );
};

export default withApollo()(Agenda);
