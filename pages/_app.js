import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import { red } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AdapterDateFns from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import gql from 'graphql-tag';
import { SessionProvider } from 'context/session/session';
import omitTypename from 'utils/omitTypename';
import { SnackbarProvider } from 'notistack';
import './styles.css';
import '../containers/layouts/agendaPage/DateFilter.css';
import 'leaflet/dist/leaflet.css';
import 'react-google-places-autocomplete/dist/index.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'moment/locale/fr';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C367E',
      light: '#a0a8df',
    },
    secondary: {
      main: '#2C367E',
    },
    warning: {
      main: '#BF083E',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      grey: '#F6F6F6',
    },
    text: {
      primary: '#3c3b37',
    },
    lightBox: {
      main: '#F7F7F7',
    },
    shadow: {
      main: 'rgba(10, 14, 18, .1)',
    },
  },
  typography: {
    body1: {
      lineHeight: 1.7,
    },
    h1: {
      fontSize: '4rem',
      color: '#2C367E',
    },
    h2: {
      fontSize: '1.5rem',
      color: '#2C367E',
    },
    h3: {
      fontSize: '1.5rem',
      color: '#2C367E',
    },
    h4: {
      fontSize: '1.5rem',
      color: '#2C367E',
    },
    h5: {
      color: '#2C367E',
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      standard: 300,
    },
  },
});

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
      <link rel="apple-touch-icon" href="/icone_512.png"></link>
      <meta name="theme-color" content="#2C367E" />
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
