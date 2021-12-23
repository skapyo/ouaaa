import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Link } from '@mui/material';
import StyledBoxOnHover from '../animated/StyledBoxOnHover';

const useStyles = makeStyles((theme, props) => ({
  card: (props) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    minHeight: '106px',
    borderLeft: `solid 12px ${props.color}`,
    display: 'flex',
  }),
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 24px',
  },
  favorite: (props) => ({
    width: '100px',
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
  }),
  leftContent: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '72px',
    width: '72px',
    margin: '0 24px 0 0',
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
  const color = actor.entries && actor.entries.length > 0 && actor.entries[0].parentEntry
    ? actor.entries[0].parentEntry.color
    : '#AD2740';
  const icon = actor.entries[0] ? actor.entries[0].icon : 'fruit';
  const actorName = actor.name;
  const classes = useStyles({ color, icon });
  const [favorite, setFavorite] = useState(false);

  const getActorProfilePicture = () => {
    const profilePictures = actor.pictures?.filter((picture) => picture.logo) || [];
    const picture = profilePictures.length > 0 ? profilePictures[0].originalPicturePath : undefined;
    return picture;
  };

  return (
    <Link href={`/actor/${actor.id}`} color="inherit" underline="none">
      <StyledBoxOnHover className={classes.card}>
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
              <Link href={`/actor/${actor.id}`} color="inherit" underline="none">
                <div className={classes.actor}>{actorName}</div>
              </Link>
              <div className={classes.label}>{actor.label}</div>
              <div className={classes.actorDetails}>
                <span>
                  {/* @ts-ignore */}
                  {actor.shortDescription}
                </span>
              </div>
              <div className={classes.label}>
                {!actor.address && actor.city && (
                  <span>
                    {/* @ts-ignore */}
                    <img
                      src="/icons/location.svg"
                      alt="Localisation"
                      className={[classes.icon]}
                    />
                    {' '}
                    {actor.city}
                  </span>
                )}
                {actor.address && actor.city && (
                  <span>
                    {/* @ts-ignore */}
                    <img
                      src="/icons/location.svg"
                      alt="Localisation"
                      className={[classes.icon]}
                    />
                    {' '}
                    {`${actor.address} ${actor.city}`}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={classes.category}>
            <span className={classes.opacity} />
            <span className={classes.categoryIcon} />
          </div>
        </div>
        {
          false && (
            <div className={classes.favorite} onClick={() => setFavorite(!favorite)}>
              <FavoriteIconComponent className={classes.favoriteIcon} />
            </div>
          )
        }
      </StyledBoxOnHover>
    </Link>
  );
};

export default ActorCard;
