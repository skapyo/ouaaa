import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Link } from '@mui/material';
import StyledBoxOnHover from '../animated/StyledBoxOnHover';
import { getImageUrl } from '../../utils/utils';
import Favorite from '../Favorite';

const useStyles = makeStyles((theme, props) => ({
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
    minHeight: '106px',
    borderLeft: `solid 12px ${props.color}`,
    display: 'flex',
  }),
  content: {
    width: '93%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      margin: '0 24px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px',
    },
  },
  favorite: (props) => ({
    [theme.breakpoints.up('sm')]: {
      width: '100px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50px',
    },
    borderLeft: `dashed 2px ${props.color}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  category: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    borderRadius: '50%',
    opacity: props.icon ? 1 : 0,
  }),
  leftContent: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '72px',
    width: '72px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 24px 0 0',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px 0 0',
    },
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      borderRadius: '50%',
    },
  },
  text: {},
  actor: (props) => ({
    textTransform: 'uppercase',
    color: props.color,
    fontWeight: 'bold',
  }),
  label: {
    color: 'black',
    fontWeight: 'bold',
  },
  location: {
    color: 'black',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  actorDetails: {
    fontStyle: 'italic',
    color: '#A3A3A3',
  },
  icon: {
    color: '#bd0b3d',
    width: '20px',
  },
}));

const ActorCard = ({ actor }) => {
  const color = actor?.entries?.[0]?.parentEntry?.color || '#AD2740';
  const icon = actor.entries[0] ? actor.entries[0].icon : 'fruit';
  const actorName = actor.name;
  const classes = useStyles({ color, icon });

  function stringAvatar(name) {
    if (name !== undefined) {
      return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
      };
    }
    return '';
  }

  const getActorProfilePicture = () => {
    const profilePictures = actor.pictures?.filter((picture) => picture.logo) || [];
    const picture = profilePictures.length > 0 ? getImageUrl(profilePictures[0].originalPicturePath) : undefined;
    return picture;
  };

  return (
    <StyledBoxOnHover className={classes.card}>
      <Link href={`/actor/${actor.id}`} target="_blank" color="inherit" underline="none" width="100%">
        <div className={classes.content}>
          <div className={classes.leftContent}>
            <div className={classes.image}>
              <Avatar
                alt={actor.name}
                src={getActorProfilePicture()}
                sx={{
                  width: 72,
                  height: 72,
                }}
              />
            </div>
            <div className={classes.text}>
              <div className={classes.actor}>{actorName}</div>
              <div className={classes.label}>{actor.label}</div>
              <div className={classes.actorDetails}>
                <span>
                  {/* @ts-ignore */}
                  {actor.shortDescription}
                </span>
              </div>
              {
                (actor.address || actor.city) && (
                  <div className={classes.location}>
                    {/* @ts-ignore */}
                    <img
                      src="/icons/location.svg"
                      alt="Localisation"
                      className={[classes.icon]}
                    />
                    {(actor.address || '').concat(' ').concat(actor.city)}
                  </div>
                )
              }
            </div>
          </div>
          <div className={classes.category}>
            <span className={classes.opacity} />
            <span className={classes.categoryIcon} />
          </div>
        </div>
      </Link>
      <div className={classes.favorite}>
        <Favorite actor={actor} />
      </div>
    </StyledBoxOnHover>
  );
};

export default ActorCard;
