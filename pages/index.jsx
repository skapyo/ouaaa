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
import ScrollToBottom from '../components/scroll/ScrollToBottom';
import LastArticle from '../containers/layouts/homePage/lastArticle';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

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
  boxModal: {
   overflow: 'auto',
   width: 'auto',
   [theme.breakpoints.down('md')]: {
    width: '90%',
  }, maxHeight:'100%' 
  }

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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const sections = ['PresentationSection', 'ThreePoint', 'LastActor', 'LastEvent', 'LastArticle', 'Newsletter'];
  const myLoader = ({ src, width, quality }) => {
    return src.startsWith('/static') ? `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}` : src;
  };
  const [cookies, setCookie] = useCookies(['hasSeenHomeInfoOUAAA']);
  const [openModalHomeInfo, setOpenModalHomeInfo] = useState(cookies.hasSeenHomeInfoOUAAA!=="true");

  const DynamicLastActor = dynamic(() => import('../containers/layouts/homePage/lastActor'), {
    loading: () => <p>Loading.. actor</p>,
  });

  const DynamicLastEvent = dynamic(() => import('../containers/layouts/homePage/lastEvent'), {
    loading: () => <p>Loading.. event</p>,
  });

  const DynamicLastArticle = dynamic(() => import('../containers/layouts/homePage/lastArticle'), {
    loading: () => <p>Loading.. article</p>,
  });
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (

    <AppLayout>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PAT-OUAAA!" />
        <meta property="og:description" content="Plateforme d’information & d'initiative des acteurs de la transition vers une société plus humaine & écologique sur le territoire de l'Aunis  !" />
        <meta property="og:site_name" content="PAT-OUAAA!" />
        <meta property="og:url" content="https://ouaaa-transition.fr/" />
        <meta property="og:image" content="https://ouaaa-transition.fr/apple-touch-icon.png" />
        <meta name="twitter:url" content="https://ouaaa-transition.fr/" />
        <meta name="twitter:title" content="PAT-OUAAA!" />
        <meta name="twitter:description" content="Plateforme d’information & d'initiative des acteurs de la transition vers une société plus humaine & écologique sur le territoire de l'Aunis  !" />
        <meta name="twitter:image" content="https://ouaaa-transition.fr/apple-touch-icon.png" />
      </Head>
      <>
        <Box>

          <PresentationSection id={sections[0]} />

          <ThreePoint id={sections[1]} />

{/*}
          <DynamicLastActor id={sections[2]} />
    
          <DynamicLastEvent id={sections[3]} />

          <DynamicLastArticle id={sections[4]} />
  */}
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
          au fonctionnement sur votre appareil.
          <br />
          Aucun cookie tiers n&#39;est utilisé pour analyser le comportement individuel ou les données
    personnelles des visiteurs du site. Plus d&#39;informations sur les cookies et les traceurs sur le site de la
    CNIL : <Link href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/lignes-directrices-modificatives-et-recommandation" target="_blank" color="inherit" >Cookies et autres traceurs : la CNIL publie des lignes directrices modificatives et sa
recommandation</Link>
        </CookieConsent>

    {/**  <Modal
              open={openModalHomeInfo}
              onClose={() =>  {setCookie('hasSeenHomeInfoPAT-OUAAA',true); setOpenModalHomeInfo(false);}}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              style={{ overflow: 'auto',width: 'auto!important', maxHeight:'100%' }}
            >
         
              <Box sx={style}  className={styles.boxModal} >
                <IconButton
                  aria-label="Close"
                  className={styles.closeButton}
                  onClick={() => {setCookie('hasSeenHomeInfoPAT-OUAAA',true); setOpenModalHomeInfo(false);}}
                  size="large">
                  <CloseIcon />
                </IconButton>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Image
                  loader={myLoader}
                  width="300"
                  height="300"
                  layout="responsive"
                  src="POPUP-thumb1.png"
                  alt="ENVIRONNEMENT : AGIR EN 2023"
                  priority
                />
                </Grid>
                <Grid item  xs={12} sm={6}>
                    <div    style={{ textAlign: 'center' }}><b>Du 29 MAI au 1er JUIN</b></div> <br/>
                    <div    style={{ textAlign: 'center', fontSize: '14px' }}>
                  AUNIS EN TRANSITION élargit la Semaine Super Nulle en Carbone
                  de La Rochelle Territoire Zéro Carbone à tout l’Aunis ! Et met l’accent sur</div>  <br/>
                  <div    style={{ textAlign: 'center' }}><b>les LOW-TECH</b></div>  <br/>

                  <div    style={{ textAlign: 'left' }}>
                  • Charon le 29 mai <br/>
                  • Surgères le 30 mai <br/>
                  • Saint-Xandre le 31 mai <br/>
                  • La Rochelle et Saint-Martin-de-Ré le 1er juin  <br/></div> <br/>
                  <div    style={{ textAlign: 'center' }}><b>EXPOSITION – JEUX – ATELIERS – CONFÉRENCE-DÉBAT</b></div> <br/>

                  <div    style={{ textAlign: 'center' }}><Link href={`/event/344`} > Retrouvez le programme complet ici  </Link><br/></div>

                </Grid>
                <Grid item  xs={12} sm={6}>
                  <Image
                    loader={myLoader}
                    width="431"
                    height="155"
                    layout="responsive"
                    src="POPUP-thumb2.png"
                    alt="ENVIRONNEMENT : AGIR EN 2023"
                    priority
                  />
                </Grid>
                <Grid item  xs={12} sm={6}>
                  <Image
                    loader={myLoader}
                    width="592"
                    height="150"
                    layout="responsive"
                    src="POPUP-thumb3.png"
                    alt="ENVIRONNEMENT : AGIR EN 2023"
                    priority
                  />
                </Grid>
              </Grid>
            </Box>
          </Modal>
 */}  
      </>
    </AppLayout>
  );
};

export default withApollo()(Index);
