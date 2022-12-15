import React from 'react';
import { Link, Box, Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import { upperFirst } from 'lodash';
import Image from 'next/image';

const styles = {
  card: {
    width: 300,
    margin: 'auto',
    textAlign: 'left'
  },
  date: {
    fontSize: '10px !important',
    marginBottom: '10px !important'
  },
  contentContainer: {
    padding: '0 !important'
  },
  content: {
    padding: '5px 5px 5px 0'
  },
  title: {
    '&:hover': {
      opacity: 0.5
    }
  },
  imgContainer: {
    img: {
      transform: 'scale(1)',
      transition: 'transform 300ms ease',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    'img:hover': {
      transform: 'scale(1.2)',
      transition: 'transform 300ms ease'
    }
  }
}

export default function ArticleCard(props) {
  const { article } = props;

  const image = article?.pictures?.sort((a, b) => (a.logo ? -1 : 1))?.[0]?.originalPicturePath || '/icons/planet.svg';

  const date = moment(parseInt(article.createdAt)).format('dddd DD MMMM YYYY');

  const myLoader = ({ src, width, quality }) => {
    return src.startsWith('/static') ? `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}` : src;
  };

  const link = `/article/${article.id}`;

  return (
    <Card sx={styles.card} square={true} elevation={0}>
      <CardContent sx={styles.contentContainer} underline='none'>
        <Link href={link}>
          <Box sx={styles.imgContainer}>
            {
              image && (
                <Image
                  loader={myLoader}
                  width="100%"
                  height="70px"
                  layout="responsive"
                  objectFit="cover"
                  src={image}
                  alt={article.label}
                  unoptimized={!image.startsWith('/static')}
                  priority
                />
              )
            }
          </Box>
        </Link>
        <Box sx={styles.content}>
          <Typography sx={styles.date}>
            {upperFirst(date)}
          </Typography>
          <Link href={link} underline='none'>
            <Typography variant="h5" component="div" sx={styles.title}>
              {article.label}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {article.shortDescription}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
};
