import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Link from '../Link';
import { getImageUrl } from '../../utils/utils';

const useStyles = makeStyles({
  root: {
    minWidth: 120,
    width: '220px',
    padding: 'inherit',
    'box-shadow': '0px 5px 26px -10px rgba(0, 0, 0, 0.46)',
    margin: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  categorie: {
    backgroundColor: 'white',
    borderRadius: '0.3em',
    color: '#f0a300',
    width: 'max-content',
    padding: '0 5px 0 5px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    textAlign: 'inherit',
    height: '10em',
  },
  title: {
    textAlign: 'left',
    color: '#2C367E',
    width: '100%',
    fontSize: '1.5rem',
  },
  content: {
    padding: '10px',
  },
  date: {
    textAlign: 'right',
    color: '#2C367E',
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function SimpleCard({ actor }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Link href={`/actor/${actor.id}`}>
      <Card className={classes.root}>
        <CardContent>
          <div
            className={classes.image}
          >

            <div className={classes.categorie}>
              <Typography className={classes.categorie} gutterBottom>
                {actor.entries
                  && actor.entries.length > 0
                  && actor.entries[0].label}
              </Typography>
            </div>
            <Image
              loader={myLoader}
              width="100%"
              height="50px"
              layout="responsive"
              objectFit="contain"
              src={
                actor.pictures.sort((a, b) => (a.logo ? -1 : 1))[0].croppedPicturePath
              }
              alt={actor.name}
            />
          </div>
          <div className={classes.content}>
            <div className={classes.titleDiv}>
              <Typography className={classes.title}>
                {actor && actor.name}
              </Typography>
            </div>
            <Typography variant="body" component="p">
              {actor && actor.shortDescription}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
