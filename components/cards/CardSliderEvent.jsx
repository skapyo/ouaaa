import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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

 
  const startDateFormat = '[De ]HH[h]mm' ;
  const endDateFormat = '[ à ]HH[h]mm';

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
            { event.pictures.filter((a, b) => (a.logo ? -1 : 1))[0] && event.pictures.filter((a, b) => (a.logo ? -1 : 1))[0].originalPicturePath!=null && (
            <div style =  {{  position: 'relative', height:"130px"}}>
            <Image
              loader={myLoader}
              fill
              objectFit="contain"
              src={
                event.pictures.filter((a, b) => (a.logo ? -1 : 1))[0].originalPicturePath
              }
              alt={event.name}
            />
            </div>
            )}
          </div>
          <div className={classes.content}>
            
  
                  <>
                   <Moment
                  locale="fr"
                  format="DD MMMM YYYY"
                  className={classes.date}
                  unix
                >
                  {event.startedAt / 1000} 
                </Moment>
                <br/>
                    <Moment format={startDateFormat} unix>
                      {event.startedAt / 1000}
                    </Moment>
                    <Moment format={endDateFormat} unix>
                      {event.endedAt / 1000}
                    </Moment>
                  </>
               <br/>
                {event.duration && (
                <>
                  {event.duration}
                  {' '}
                  .
                </>
              )}
            <div className={classes.titleDiv}>
              <Typography className={classes.title}>
                {event && event.label}
              </Typography>
              
             
               </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
