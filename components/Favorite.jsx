import React, { useState, useMemo, useEffect } from 'react';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useSessionState } from '../context/session/session';

const ADD_FAVORITE = gql`
  mutation addFavorite($actorId: Int,$eventId: Int,$userId: Int!, $favorite: Boolean!) {
    addFavorite(actorId: $actorId,eventId: $eventId,userId: $userId, favorite: $favorite) 
  }
`;

const useStyles = makeStyles((theme, props) => ({
  favoriteIcon: (props) => ({
    color: props.color,
    cursor: 'pointer',
  }),
}));
const Favorite = ({ actor, event, handleFavoriteChange }) => {
  let color;
  if (actor) {
    color = actor.entries && actor.entries.length > 0 && actor.entries[0].parentEntry
      ? actor.entries[0].parentEntry.color
      : '#2C367E';
  } else {
    color = event.entries.length > 0 && event.entries[0].parentEntry
      ? event.entries[0].parentEntry.color
      : '#2C367E';
  }
  color = color || '#2C367E';
  const classes = useStyles({ color });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = useSessionState();
  function containUser(list) {
    let isContained = false;
    if (user !== null && user !== undefined) {
      list.forEach((element) => {
        if (element.id == user.id) {
          isContained = true;
        }
      });
    }
    return isContained;
  }
  const [favorite, setFavorite] = useState(containUser(actor ? actor.favorites : event.favorites));
  const [
    addFavorite,
    { data: addFavoriteData, loading: addFavoriteLoading, error: addFavoriteError },
  ] = useMutation(ADD_FAVORITE);

  const changeFavorite = (isFavorite) => {
    if (user == null) {
      enqueueSnackbar('Veuillez vous connecter pour ajouter un favoris ', {
        preventDuplicate: true,
      });
    } else {
      setFavorite(isFavorite);
      if (typeof handleFavoriteChange === 'function') {
        handleFavoriteChange(isFavorite);
      }

      addFavorite({
        variables: {
          actorId: actor ? parseInt(actor.id) : null,
          eventId: event ? parseInt(event.id) : null,
          userId: parseInt(user.id),
          favorite: isFavorite,
        },
      });
    }
  };
  useEffect(() => {
    if (!addFavoriteError && !addFavoriteLoading && addFavoriteData) {
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
  }, [addFavoriteError, addFavoriteLoading, addFavoriteData]);

  const FavoriteIconComponent = useMemo(() => {
    return favorite ? FavoriteRoundedIcon : FavoriteBorderRoundedIcon;
  }, [favorite]);
  return (
    <div onClick={() => changeFavorite(!favorite)}>
      <FavoriteIconComponent className={classes.favoriteIcon} />
    </div>
  );
};

export default Favorite;
