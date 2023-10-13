import React, { useMemo } from 'react';
import { useTheme } from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '../Link';
import Moment from 'react-moment';
import { Avatar } from '@mui/material';
import { getImageUrl } from '../../utils/utils';
import Favorite from '../../components/Favorite';
import Image from 'next/image';
const ADD_FAVORITE = gql`
  mutation addFavoriteEvent($eventId: Int!,$userId: Int!, $favorite: Boolean!) {
    addFavoriteEvent(eventId: $eventId,userId: $userId, favorite: $favorite) 
  }
`;

const useStyles = makeStyles((theme) => ({
  '@media print': {
    card: {
      border: 'solid 1px grey',
    },
    favorite: {
      display: 'none !important',
    },
  },
  card: (props) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '16px 0',
    minHeight: '106px',
    borderLeft: `solid 12px ${props.color}`,
    display: 'flex',
    fontSize:'0.8em'
  }),
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      overflow: 'hidden',
    },
  },
  favorite: (props) => ({
    width: '10%',
    borderLeft: `dashed 2px ${props.color}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  favoriteIcon: (props) => ({
    color: props.color,
  }),
  category: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 16,
    [theme.breakpoints.down('md')]: {
      marginRight: 8,
    },
  },
  opacity: (props) => ({
    width: '40px',
    height: '40px',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity: '0.3',
  }),
  categoryIcon: (props) => ({
    width: '40px',
    height: '40px',
    mask: `url('/icons/${props.icon}.svg')`,
    maskPosition: 'center center',
    maskRepeat: 'no-repeat',
    maskSize: '22px',
    background: props.color,
  }),
  leftContent: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    minHeight: 72,
    minWidth: 72,
    marginLeft: 12,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '50%',
    [theme.breakpoints.down('md')]: {
      minHeight: 60,
      minWidth: 60,
      marginLeft: 8,
    },
  },

  image: {
    width:'72px!important',
    height:'72px!important',
    position: "relative!Important",
    borderRadius: '50%',
  },
  contentText: {
    overflow: 'hidden',
    marginLeft: 12,
    [theme.breakpoints.down('md')]: {
      marginLeft: 8,
    },
  },
  label: (props) => ({
    fontWeight: 'bold',
    color: props.color,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize:'0.9em'
  }),
  eventDetails: {
    fontStyle: 'italic',
    color: '#A3A3A3',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize:'0.9em'
  },
  avatar:{
    backgroundColor: 'white',
  },
}));

const EventCard = ({ event }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const color = event?.entries?.[0]?.parentEntry?.color || '#AD2740';
  const icon = event?.entries?.[0]?.icon || 'fruit';
  const classes = useStyles({ color, icon });

  const startDateFormat = matches ? '[De ]HH[h]mm' : 'HH[h]mm';
  const endDateFormat = matches ? '[ à ]HH[h]mm' : '[-]HH[h]mm';

  const logoPath = useMemo(() => {
    const logoPaths = (event?.pictures || []).filter((picture) => picture.logo);
    if (logoPaths.length > 0) {
      return getImageUrl(logoPaths[0].originalPicturePath);
    }
    return null;
  }, [event, getImageUrl]);

  const addressCity = useMemo(() => {
    if (!event.city && !event.address) return 'Adresse manquante';
    const list = [event.address, event.city];
    return `${list.join(', ')}`;
  }, [event.address, event.city]);

  const myLoader = ({ src, width, quality }) => {
    return src.startsWith('/static') ? `${process.env.NEXT_PUBLIC_URI}${src}?w=${width}&q=${quality || 75}` : src;
  };

  return (
    <div className={classes.card}>
      <div className={classes.content}>
        <Link href={`/event/${event.id}`} target="_blank" color="inherit" underline="none" width="100%">
          <div className={classes.leftContent}>
            {logoPath && (
              <Avatar
              className={classes.avatar}
              sx={{
                width: 72,
                height: 72,
              }}
            >
                <Image src={logoPath} alt={event.label} layout="fill" />
                </Avatar>

          )}
            <div className={classes.contentText}>
              <div className={classes.label}>{event.label}</div>
              <div className={classes.eventDetails}>
                {!event.duration && (
                  <>
                    <Moment format={startDateFormat} unix>
                      {event.startedAt / 1000}
                    </Moment>
                    <Moment format={endDateFormat} unix>
                      {event.endedAt / 1000}
                    </Moment>
                    <span> - </span>
                  </>
                )}
                <span>{addressCity}</span>
                <br />
                <span>{event.shortDescription}</span>
              </div>
              {event.duration && (
                <>
                  {event.duration}
                  {' '}
                  .
                </>
              )}

              {event.parentEvent && (
                <span>
                  Fait partie de
                  {' '}
                  <Link href={`/event/${event.parentEvent.id}`}>{event.parentEvent.label}</Link>
                </span>
              )}
            </div>
          </div>
        </Link>
        <div className={classes.category}>
          <span className={classes.opacity} />
          <span className={classes.categoryIcon} />
        </div>
      </div>
      <div className={classes.favorite}>
        <Favorite event={event} />
      </div>
    </div>
  );
};

export default EventCard;
