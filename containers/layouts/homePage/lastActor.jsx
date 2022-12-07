import { Container, makeStyles, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick/lib';
import { gql, useQuery } from '@apollo/client';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardSliderActor from '../../../components/cards/CardSliderActor';
import { withApollo } from '../../../hoc/withApollo';
import Link from '../../../components/Link';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: '3em',
  },
  align: {
    'text-align': 'center',
  },
  actorContainer: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
  },
  border: {
    width: '3em',
    borderColor: '#2C367E',
    borderBottom: 'solid',
    marginLeft: '48%',
    borderBottomColor: '#2C367E',
    color: '#2C367E',
    height: '1em',
    textAlign: 'center',
  },
  buttonGrid: {
    fontSize: '1.5em',
    margin: '2.5em 0 2.5em 0 ',
    
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      backgroundImage: "url('/arrow.svg')",
      border: 'none',
      color: 'white',
      'background-color': '#2C367E',
    },
    color: '#2C367E',
    'background-color': 'white',
    border: '2px solid #2C367E',
    backgroundImage: "url('/arrow-hover.svg')",

    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '12%',
  },
  articleCarroussel: {
    paddingTop: '2em',
  },
  buttonArticle: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
}));
const LastActor = (props) => {
  const GET_ACTORS = gql`
    query actors($limit: Int, $sort: String, $way: String,$isValidated: Boolean) {
      actors(limit: $limit, sort: $sort, way: $way, isValidated: $isValidated) {
        id
        name
        address
        lat
        lng
        entries {
          label
        }
        pictures {
          id
          label
          originalPicturePath
          originalPictureFilename
          position
        }
      }
    }
  `;

  
  const [actorToRender, setActorToRender] = useState(null);

  const {
    data: actorData,
    loading: loadingActor,
    error: errorActor,
  } = useQuery(GET_ACTORS, {
    variables: {
      isValidated: true,
      limit: 4,
      sort: 'createdAt',
      way: 'DESC',

    },
  });

  useEffect(() => {
    setActorToRender({
      actorData,
    });
  }, [actorData]);

  function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = useStyles();
  const maxImageDisplay = !mobile?5:1
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow:
      actorToRender?.actorData && actorToRender.actorData.actors.length > maxImageDisplay
        ? maxImageDisplay
        : actorToRender?.actorData && actorToRender.actorData.actors.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Container className={[styles.actorContainer]} id={props.id} >
      <Typography variant="h2" className={[styles.cardTitle]}>
        LES ACTEURS RÉCEMMENTS AJOUTÉS
      </Typography>
      <div className={[styles.border]}/>
      <Slider {...settings} className={[styles.articleCarroussel]}>
        {actorToRender?.actorData &&
          actorToRender.actorData.actors.map((actor) => {
            return <CardSliderActor key={actor.id} actor={actor} />;
          })}
      </Slider>
      <div className={styles.buttonArticle}>
        <Link href="/map">
          <button className={styles.buttonGrid}>VOIR TOUS LES ACTEURS</button>
        </Link>
      </div>
    </Container>
  );
};

export default withApollo()(LastActor);
