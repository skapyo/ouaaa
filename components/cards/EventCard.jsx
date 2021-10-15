import React, { useState, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Moment from 'react-moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '../Link';
import { getImageUrl } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  card: (props) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '16px 0',
    height: '106px',
    borderLeft: `solid 12px ${props.color}`,
    display: 'flex',
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
    [theme.breakpoints.down('sm')]: {
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
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 60,
      minWidth: 60,
      marginLeft: 8,
    },
  },
  contentText: {
    overflow: 'hidden',
    marginLeft: 12,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 8,
    },
  },
  label: (props) => ({
    fontWeight: 'bold',
    color: props.color,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  eventDetails: {
    fontStyle: 'italic',
    color: '#A3A3A3',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

const EventCard = ({ event }) => {
  const color = event.entries.length > 0 && event.entries[0].parentEntry
    ? event.entries[0].parentEntry.color
    : '#AD2740';
  const icon = event.entries && event.entries[0] ? event.entries[0].icon : 'fruit';
  const actorName = event.actors[0]
    ? event.actors[0].name
    : 'Potager de la Jarne';

  const classes = useStyles({ color, icon });
  const [favorite, setFavorite] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const startDateFormat = matches ? '[De ]HH[h]mm' : 'HH[h]mm';
  const endDateFormat = matches ? '[ à ]HH[h]mm' : '[-]HH[h]mm';

  const logoPath = useMemo(() => {
    const logoPaths = (event?.pictures || []).filter((picture) => picture.logo);
    if (logoPaths.length > 0) {
      return getImageUrl(logoPaths[0].croppedPicturePath);
    }
    return null;
  }, [event, getImageUrl]);

  const FavoriteIconComponent = useMemo(() => {
    return favorite ? FavoriteRoundedIcon : FavoriteBorderRoundedIcon;
  }, [favorite]);

  const addressCity = useMemo(() => {
    if (!event.city) return 'Adresse manquante';
    const list = [event.address, event.city];
    return `${list.join(', ')}`;
  }, [event.address, event.city]);

  return (
    <div className={classes.card}>
      <div className={classes.content}>
        <Link href={`/event/${event.id}`}>
          <div className={classes.leftContent}>
            {logoPath && <div className={classes.logo} style={{ backgroundImage: `url(${logoPath})` }} />}
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
                  </Moment><span> - </span>
                </>
                )}
                <span>{addressCity}</span>
                <br/>
                <span>{event.shortDescription}</span>
              </div>
              {event.duration && (
                <div >{event.duration}</div>
              )}
              {event.parentEvent && (
              <span>fait partie de <Link href={`/event/${event.parentEvent.id}`}>{event.parentEvent.label}</Link></span>
              )}
            </div>
          </div>
        </Link>
        <div className={classes.category}>
          <span className={classes.opacity} />
          <span className={classes.categoryIcon} />
        </div>
      </div>
      {
        false && matches && (
          <div className={classes.favorite} onClick={() => setFavorite(!favorite)}>
            <FavoriteIconComponent className={classes.favoriteIcon} />
          </div>
        )
      }
    </div>
  );
};

export default EventCard;
