import AppLayout from 'containers/layouts/AppLayout';
import {
  Box, Container, RootRef, Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withApollo } from 'hoc/withApollo';
import Newsletter from '../containers/layouts/Newsletter';
import PresentationSection from '../containers/layouts/homePage/presentationSection';
import ThreePoint from '../containers/layouts/homePage/threepoint';
import LastActor from '../containers/layouts/homePage/lastActor';
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
    'background-color': '#bf083e',
    border: 'none',
    fontFamily: 'rowdies',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#bf083e',
      'background-color': 'white',
      border: '2px solid #bf083e',
      backgroundImage: 'url(\'./arrow-hover.svg\')',
    },
    backgroundImage: 'url(\'./arrow.svg\')',
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

  return (
    <AppLayout>
      <RootRef>
        <Box>
          <PresentationSection />

          <ThreePoint />

          <Container className={[styles.geoContainer]}>
            <Typography className={[styles.align]}>
              Le site a vocation à répertorier les acteurs de la transition sur les 3 communautés de communes constituant l'Aunis : la CDA de la Rochelle, la CDC Aunis Atlantique et la CDC Aunis Sud.
              Ainsi, l’information sera disponible aussi bien pour les habitants des zones les plus urbaines : La Rochelle et sa première couronne (Aytré, Lagord, Périgny, Angoulins), Chatelaillon, Surgères, Marans, Courçon, Aigrefeuille que pour ceux des zones les plus rurales : Clavette, St Médard, Puyravault, Ballons, le Thou, Chambon, Ballon, St Saturnin du Bois, St Jean de Liversay, Benon.
            </Typography>
          </Container>

          <LastActor />

          <LastEvent />

          <Newsletter />
        </Box>

      </RootRef>
    </AppLayout>
  );
};

export default withApollo()(Index);
