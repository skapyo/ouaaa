import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import gql from 'graphql-tag';
import { SessionProvider } from 'context/session/session';
import omitTypename from 'utils/omitTypename'
import { SnackbarProvider } from 'notistack';
import './styles.css'
import '../containers/layouts/agendaPage/DateFilter.css';
import 'leaflet/dist/leaflet.css';
import 'react-google-places-autocomplete/dist/index.min.css';
import '@brainhubeu/react-carousel/lib/style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#484848',
    },
    secondary: {
      main: '#25AAA4',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text : {
      primary : '#3c3b37'
    },
    lightBox : {
      main :'#F7F7F7'
    }
  },

  typography : {
    body1 : {
      lineHeight : 1.7
    },
      h5 : {
          color:"#2a9076",
          fontFamily: 'rowdies',
      },
  }
})

const MyApp = (props )  => {
  const { Component, pageProps, user } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>OUtils des Acteurs Alternatifs en Aunis</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvUKXlWS1470oj8C-vD6s62Bs9Y8XQf00&language=fr&region=FR&libraries=places"></script>

      </Head>
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}

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
`

MyApp.getInitialProps = async(ctx) => {

  let user = null

  if(typeof window === 'undefined') {
    const {initOnContext} = await import('hoc/withApollo')
    const apolloClientCtx = initOnContext(ctx)
    const result = await apolloClientCtx.ctx.apolloClient.query({query:ISLOGGED})
    if(result.data?.isLogged?.id) {
      // user = {
      //   id : result.data.isLogged.id
      // }
      user = omitTypename(result.data.isLogged)
    }


  }

  if (user)
    return ({user})
  return ({})
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object
};

export default MyApp