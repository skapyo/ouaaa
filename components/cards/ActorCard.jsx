import React, { useState, useMemo, useEffect } from 'react';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Link } from '@mui/material';
import { useSnackbar } from 'notistack';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import StyledBoxOnHover from '../animated/StyledBoxOnHover';
import { getImageUrl } from '../../utils/utils';
import { useSessionState } from '../../context/session/session';

const ADD_FAVORITE = gql`
  mutation addFavoriteActor($actorId: Int!,$userId: Int!, $favorite: Boolean!) {
    addFavoriteActor(actorId: $actorId,userId: $userId, favorite: $favorite) 
  }
`;

const useStyles = makeStyles((theme, props) => ({
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
  const user = useSessionState();
  function containUser(list) {
    let isContained = false;
    if (user !== null) {
      list.forEach((element) => {
        if (element.id == user.id) {
          isContained = true;
        }
      });
    }
    return isContained;
  }

  const [favorite, setFavorite] = useState(containUser(actor.favorites));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [
    addFavoriteActor,
    { data: addFavoriteActorData, loading: addFavoriteActorLoading, error: addFavoriteActorError },
  ] = useMutation(ADD_FAVORITE);

  function stringAvatar(name) {
    if (name !== undefined) {
      return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
      };
    }
    return '';
  }
  const changeFavorite = (isFavorite) => {
    if (user == null) {
      enqueueSnackbar('Veuillez vous connecter pour ajouter un ', {
        preventDuplicate: true,
      });
    } else {
      setFavorite(isFavorite);
      addFavoriteActor({
        variables: {
          actorId: parseInt(actor.id),
          userId: parseInt(user.id),
          favorite: isFavorite,
        },
      });
    }
  };
  useEffect(() => {
    if (!addFavoriteActorError && !addFavoriteActorLoading && addFavoriteActorData) {
      if (favorite) {
        enqueueSnackbar('Favori ajouté avec succès.', {
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar('Favori retiré avec succès.', {
          preventDuplicate: true,
        });
      }
    }
  }, [addFavoriteActorError, addFavoriteActorLoading, addFavoriteActorData]);

  const FavoriteIconComponent = useMemo(() => {
    return favorite ? FavoriteRoundedIcon : FavoriteBorderRoundedIcon;
  }, [favorite]);

  const getActorProfilePicture = () => {
    const profilePictures = actor.pictures?.filter((picture) => picture.logo) || [];
    const picture = profilePictures.length > 0 ? getImageUrl(profilePictures[0].originalPicturePath) : undefined;
    return picture;
  };

  return (

    <StyledBoxOnHover className={classes.card}>
      <Link href={`/actor/${actor.id}`} color="inherit" underline="none" width="100%">
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
      </Link>
      <div className={classes.favorite} onClick={() => changeFavorite(!favorite)}>
        <FavoriteIconComponent className={classes.favoriteIcon} />
      </div>
    </StyledBoxOnHover>

  );
};

export default ActorCard;
