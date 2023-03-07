import React from 'react';
import { Link, Box, Typography } from '@mui/material';
import moment from 'moment';
import { upperFirst } from 'lodash';
import Image from 'next/image';

const styles = {
  itemContainer: {
    display: 'flex',
    paddingBottom: '16px',
    '&:not(:last-child)': {
      borderBottom: '1px solid grey',
    }
  },
  date: {
    fontSize: '10px !important',
    marginBottom: '10px !important',
    display: 'flex',
    justifyContent: 'end'
  },
  content: {
    padding: '5px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    '&:hover': {
      opacity: 0.5
    }
  },
  imgContainer: {
    overflow: 'hidden',
    width: '250px',
    height: '250px',
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
  },
  imgWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    minHeight: '250px'
  }
}

export default function ArticleListItem(props) {
  const { article } = props;

  const image = article?.pictures?.filter((a, b) => (a.logo ? -1 : 1))?.[0]?.originalPicturePath || '/icons/planet.svg';
  moment.locale('fr');
  const date = moment(parseInt(article.createdAt)).format('dddd DD MMMM YYYY');

  const myLoader = ({ src, width, quality }) => {
    return src.startsWith('/static') ? `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}` : src;
  };

  const link = `/article/${article.id}`;

  return (
    <Box sx={styles.itemContainer} square={true} elevation={0}>
      <Link href={link}>
        <Box sx={styles.imgContainer}>
          {
            image && (
              <div style={styles.imgWrapper}>
                <Image
                  loader={myLoader}
                  fill
                  objectFit="contain"
                  src={image}
                  alt={article.label}
                  unoptimized={!image.startsWith('/static')}
                  priority
                />
              </div>
            )
          }
        </Box>
      </Link>
      <Box sx={styles.content}>
        <Box sx={styles.body}>
          <Link href={link} underline='none'>
            <Typography variant="h5" component="div" sx={styles.title}>
              {article.label}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {article.shortDescription}
          </Typography>
        </Box>
        <Typography sx={styles.date}>
          {upperFirst(date)}
        </Typography>
      </Box>
    </Box>
  )
};
