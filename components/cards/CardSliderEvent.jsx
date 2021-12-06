import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Image from 'next/image';
import Link from '../Link';
import {getImageUrl} from '../../utils/utils';

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

export default function SimpleCard({ event }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Link href={`/event/${event.id}`}>
      <Card className={classes.root}>
        <CardContent>
          <div
            className={classes.image}
          >
            <div className={classes.categorie}>
              <Typography className={classes.categorie} gutterBottom>
                {event.categories &&
                  event.categories.length > 0 &&
                  event.categories[0].label}
              </Typography>
            </div>
            {  event.pictures.sort((a, b) => (a.logo ? -1 : 1))[0] && event.pictures.sort((a, b) => (a.logo ? -1 : 1))[0].originalPicturePath!=null && (
            <Image
              loader={myLoader}
              width="100%"
              height="70px"
              layout="responsive"
              objectFit="contain"
              src={
                event.pictures.sort((a, b) => (a.logo ? -1 : 1))[0].originalPicturePath
              }
              alt={event.name}
            />
            )}
          </div>
          <div className={classes.content}>
            <div className={classes.titleDiv}>
              <Typography className={classes.title}>
                {event && event.label}
              </Typography>
              <Typography className={classes.date} color="textSecondary">
                <Moment format="DD/MM HH:mm" unix>
                  {event && event.startedAt / 1000}
                </Moment>
              </Typography>
            </div>
            <Typography variant="body" component="p">
              {event && event.shortDescription}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
