import AppLayout from 'containers/layouts/AppLayout';

import { Box } from '@mui/material';
import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { withApollo } from 'hoc/withApollo';
import { Link } from '@mui/material';
import Head from 'next/head';
import CookieConsent from 'react-cookie-consent';
import Newsletter from '../containers/layouts/Newsletter';
import Partner from '../containers/layouts/Partner';
import PresentationSection from '../containers/layouts/homePage/presentationSection';
import ThreePoint from '../containers/layouts/homePage/threepoint';
import LastActor from '../containers/layouts/homePage/lastActor';
import ScrollToBottom from '../components/scroll/ScrollToBottom';
import LastArticle from '../containers/layouts/homePage/lastArticle';
import LastEvent from '../containers/layouts/homePage/lastEvent';

const useStyles = makeStyles((theme) => ({
  leftTitle: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2),
  },
  align: {
    'text-align': 'center',
  },

  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
  },

  buttonGrid: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',

    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('./arrow-hover.svg')",
    },
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '11%',
  },

  article: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
  },
  articleCarroussel: {
    paddingTop: '2em',
  },
  buttonArticle: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },

  geoContainer: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
    backgroundColor: '#e8f4f2',
  },
}));

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 2000,
  //  pauseOnHover: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Index = () => {
  const [stylesProps, setStylesProps] = useState({
    topImageSize: '250px',
    headerDisplay: 'static',
  });
  const styles = useStyles(stylesProps);

  const sections = ['PresentationSection', 'ThreePoint', 'LastActor', 'LastEvent', 'LastArticle', 'Newsletter'];

  return (

    <AppLayout>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="OUAAA!" />
        <meta property="og:description" content="Plateforme d’information & d'initiative des acteurs de la transition vers une société plus humaine & écologique sur le territoire de l'Aunis  !" />
        <meta property="og:site_name" content="OUAAA!" />
        <meta property="og:url" content="https://ouaaa-transition.fr/" />
        <meta property="og:image" content="https://ouaaa-transition.fr/apple-touch-icon.png" />
        <meta name="twitter:url" content="https://ouaaa-transition.fr/" />
        <meta name="twitter:title" content="OUAAA!" />
        <meta name="twitter:description" content="Plateforme d’information & d'initiative des acteurs de la transition vers une société plus humaine & écologique sur le territoire de l'Aunis  !" />
        <meta name="twitter:image" content="https://ouaaa-transition.fr/apple-touch-icon.png" />
      </Head>
      <>
        <Box>

          <PresentationSection id={sections[0]} />

          <ThreePoint id={sections[1]} />

          <LastActor id={sections[2]} />

          <LastEvent id={sections[3]} />

          <LastArticle id={sections[4]} />

          <Newsletter id={sections[5]} />

          <Partner />

          <ScrollToBottom sections={sections} />
        </Box>
        <CookieConsent
          location="bottom"
          buttonText="J'ai compris"
          cookieName="acceptCookieOUAAA"
          style={{ background: '#2c357d' }}
          buttonStyle={{ color: '#2c357d', fontSize: '13px' }}
          expires={150}
        >
          Gestion de vos préférences sur
          les cookies :<br /> Ce site ne dépose que des cookies techniques nécessaires
          au fonctionnement sur votre appareil. Aucun suivi ou mesure d’audience ne sont effectués.
          <br />
          <br />
          Aucun cookie tiers n&#39;est utilisé pour analyser le comportement individuel ou les données
    personnelles des visiteurs du site. Plus d&#39;informations sur les cookies et les traceurs sur le site de la
    CNIL : <Link href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/lignes-directrices-modificatives-et-recommandation" target="_blank" color="inherit" >Cookies et autres traceurs : la CNIL publie des lignes directrices modificatives et sa
recommandation</Link>
        </CookieConsent>
      </>
    </AppLayout>
  );
};

export default withApollo()(Index);
