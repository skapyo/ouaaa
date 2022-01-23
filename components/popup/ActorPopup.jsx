import React, { useState, useMemo, useEffect } from 'react';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import {
  Grid, Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';
import { useSessionState } from '../../context/session/session';
import { getImageUrl } from '../../utils/utils';

const ActorPopup = ({ actor }) => {
  const ADD_FAVORITE = gql`
  mutation addFavoriteActor($actorId: Int!,$userId: Int!, $favorite: Boolean!) {
    addFavoriteActor(actorId: $actorId,userId: $userId, favorite: $favorite) 
  }
`;
  const useStyles = makeStyles((theme) => ({
    favoriteIcon: {
      color: '#2C367E;',
    },
  }));
  const styles = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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

  const [
    addFavoriteActor,
    { data: addFavoriteActorData, loading: addFavoriteActorLoading, error: addFavoriteActorError },
  ] = useMutation(ADD_FAVORITE);

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

  return (
    <div>
      <div
        className={styles.image}
        style={{
          backgroundImage:
            actor.pictures.length >= 1
              ? `url(${getImageUrl(
                actor.pictures[0].originalPicturePath,
              )})`
              : '',
        }}
      >
        <Grid item xs={2}>
          <div className={styles.favorite} onClick={() => changeFavorite(!favorite)}>
            <FavoriteIconComponent className={title.favoriteIcon} />
          </div>
        </Grid>
        <div className={styles.categorie}>
          <Typography
            className={styles.categorie}
            style={{ color: actor?.entries && actor?.entries[0]?.parentEntry?.color }}
            gutterBottom
          >
            {actor.entries
              && actor.entries.length > 0
              && actor.entries[0].label}
          </Typography>
        </div>
      </div>
      <div className={styles.content}>
        <Grid container>
          <Grid item>
            <div className={styles.titleDiv}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.title}
              >
                {actor && actor.name}
              </Typography>
            </div>
            <p>
              {!actor.address && actor.city && (
              <span>
                {/* @ts-ignore */}
                <img src="/icons/location.svg" alt="Localisation" className={[styles.icon]} />
                {' '}
                {actor.city}
              </span>
              )}
              {actor.address && actor.city && (
              <span>
                {/* @ts-ignore */}
                <img src="/icons/location.svg" alt="Localisation" className={[styles.icon]} />
                {' '}
                {`${actor.address} ${actor.city
                }`}
              </span>
              )}
            </p>
          </Grid>

        </Grid>

        <Typography component="p">
          {actor && actor.shortDescription}
        </Typography>
      </div>
      <a href={`/actor/${actor.id}`} target="_blank" rel="noreferrer">
        <button className={styles.buttonGrid}>
          EN SAVOIR PLUS
        </button>
      </a>
    </div>
  );
};
export default ActorPopup;
