import AppLayout from 'containers/layouts/AppLayout';
import { RootRef } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withApollo } from 'hoc/withApollo';
import Head from 'next/head';
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

  return (

    <AppLayout>
      <RootRef>
        <Box>

          <PresentationSection />

          <ThreePoint />

          <LastActor />

          <LastEvent />

          <Newsletter />

        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default withApollo()(Index);
