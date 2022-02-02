import { Container, makeStyles, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick/lib';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withApollo } from '../../../hoc/withApollo';
import CardSliderArticle from '../../../components/cards/CardSliderArticle';
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
      backgroundImage: "url('/arrow-hover.svg')",
    },
    backgroundImage: "url('/arrow.svg')",
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
  article: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
    backgroundColor: 'white',
  },
}));

const LastArticle = (props) => {
  const GET_ARTICLES = gql`
    query articles($limit: Int, $sort: String, $way: String) {
      articles(limit: $limit, sort: $sort, way: $way) {
        id
        label
        shortDescription
        createdAt
        pictures {
          id
          label
          originalPicturePath
          originalPictureFilename
          position
          logo
          main
        }
      }
    }
  `;
  const [articleToRender, setArticleToRender] = useState(null);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const {
    data: articleData,
    loading: loadingArticle,
    error: errorArticle,
  } = useQuery(GET_ARTICLES, {
    variables: {
      limit: 4,
      sort: 'createdAt',
      way: 'DESC',
    },
  });

  useEffect(() => {
    setArticleToRender({
      articleData,
    });
  }, [articleData]);

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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = useStyles();
  const maxImageDisplay = !mobile?5:1
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow:
      articleToRender?.articleData && articleToRender.articleData.articles.length > maxImageDisplay
        ? maxImageDisplay
        : articleToRender?.articleData && articleToRender.articleData.articles.length,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Container className={[styles.article]} id={props.id}>
      <Typography variant="h5" className={[styles.cardTitle]}>
        LES DERNIERS ARTICLES
      </Typography>
      <div className={[styles.border]}/>
      <Slider {...settings} className={[styles.articleCarroussel]}>
        {articleToRender?.articleData &&
          articleToRender.articleData.articles.map((article) => {
            return <CardSliderArticle key={article.id} article={article} />;
          })}
      </Slider>
      <div className={styles.buttonArticle}>
        <Link href="/news">
          <button className={styles.buttonGrid}>
            VOIR TOUS LES ARTICLES
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default withApollo()(LastArticle);
