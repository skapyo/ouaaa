import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick/lib';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CardSliderActor from '../../../components/cards/CardSliderActor';
import { withApollo } from '../../../hoc/withApollo';
import Link from '../../../components/Link';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
  },
  align: {
    'text-align': 'center',
  },
  actorContainer: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
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
  articleCarroussel: {
    paddingTop: '2em',
  },
  buttonArticle: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
}));
const LastActor = () => {
  const GET_ACTORS = gql`
    query actors($limit: Int, $sort: String, $way: String) {
      actors(limit: $limit, sort: $sort, way: $way) {
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
          croppedPicturePath
          croppedPictureFilename
          croppedX
          croppedY
          croppedZoom
          croppedRotation
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

  const styles = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow:
      actorToRender?.actorData && actorToRender.actorData.actors.length > 5
        ? 5
        : actorToRender?.actorData && actorToRender.actorData.actors.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Container className={[styles.actorContainer]}>
      <Typography variant="h2" className={[styles.cardTitle, styles.align]}>
        LES ACTEURS RECEMMENTS AJOUTES
      </Typography>

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
