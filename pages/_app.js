import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AdapterDateFns from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import gql from 'graphql-tag';
import { SessionProvider } from 'context/session/session';
import omitTypename from 'utils/omitTypename';
import { SnackbarProvider } from 'notistack';
import theme from '../src/theme.ts';

import './styles.css';
import '../containers/layouts/agendaPage/DateFilter.css';
import 'leaflet/dist/leaflet.css';
import 'react-google-places-autocomplete/dist/index.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import 'react-leaflet-markercluster/dist/styles.min.css';
import 'moment/locale/fr';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const MyApp = (props) => {
  const { Component, pageProps, user } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    console.log(`Disable SEO: ${process.env.NEXT_PUBLIC_SEO_DISABLED}`);
  }, []);

  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle</title>
      {(process.env.NEXT_PUBLIC_SEO_DISABLED && process.env.NEXT_PUBLIC_SEO_DISABLED.localeCompare('true') === 0) && (
        <meta name="robots" content="noindex" />
      )}

      <script
        type="text/javascript"
        src="/analytics/piwik-pro.js"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32"></link>
      <link rel="icon" href="/favicon-192x192.png" sizes="192x192"></link>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Paytone+One&display=swap" />
      <meta name="theme-color" content="#0b8253" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="OUAAA!" />
      <meta property="og:description" content="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle" />
      <meta property="og:site_name" content="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle" />
      <meta property="og:url" content="https://ouaaa-transition.fr//" />
      <meta property="og:image" content="https://ouaaa-transition.fr//apple-touch-icon.png" />
      <meta name="twitter:url" content="https://ouaaa-transition.fr/" />
      <meta name="twitter:title" content="OUAAA!" />
      <meta name="twitter:description" content="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle" />
      <meta name="twitter:image" content="https://ouaaa-transition.fr//apple-touch-icon.png" />
      <meta name="application-name" content="OUAAA!" />
      <meta name="apple-mobile-web-app-title" content="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle" />

    </Head>
    <LocalizationProvider utils={MomentUtils} dateAdapter={AdapterDateFns}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <SessionProvider init={user}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Component {...pageProps} />
              </SnackbarProvider>
            </SessionProvider>
          </ThemeProvider>
        </MuiThemeProvider>
    </LocalizationProvider>
  </>;
};

const ISLOGGED = gql`
  query isLogged {
    isLogged {
      id
      surname
      lastname
      email
      role
      phone
      address
      postCode
      city
    }
  }
`;

MyApp.getInitialProps = async (ctx) => {
  let user = null;

  if (typeof window === 'undefined') {
    const { initOnContext } = await import('hoc/withApollo');
    const apolloClientCtx = initOnContext(ctx);
    const result = await apolloClientCtx.ctx.apolloClient.query({
      query: ISLOGGED,
    });
    if (result.data?.isLogged?.id) {
      // user = {
      //   id : result.data.isLogged.id
      // }
      user = omitTypename(result.data.isLogged);
    }
  }

  if (user) {
    return { user };
  }
  return {};
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
