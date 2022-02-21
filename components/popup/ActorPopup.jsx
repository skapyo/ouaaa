import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import {
  Grid, Typography,
} from '@material-ui/core';
import Favorite from '../Favorite';
import { getImageUrl } from '../../utils/utils';

const ActorPopup = ({ actor, onMouseOut }) => {
  const useStyles = makeStyles((theme) => ({
    favoriteIcon: {
      color: '#2C367E;',
    },
    image: {
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      textAlign: 'inherit',
      height: '10em',
    },
    categorie: {
      backgroundColor: 'white',
      borderRadius: '0.3em',
      width: 'max-content',
      padding: '0 5px 0 5px',
      display: 'block',
      marginLeft: 'auto',
      textAlign: 'center',
      marginRight: '68px',

    },



    content: {
      padding: '10px',
      width: '100%',
    },
    titleDiv: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      textAlign: 'left',
      color: '#2C367E',
      width: '100%',
    },
    icon: {
      color: '#bd0b3d',
      width: '20px',
    },
    buttonGrid: {
      margin: '2.5em 0 2.5em 0 ',
      color: 'white',
      'background-color': '#2C367E',
      border: 'none',

      borderRadius: '1.5em',
      padding: '0 3em 0 3em',
      height: '2.5em',
      '&:hover': {
        cursor: 'pointer',
        color: '#2C367E',
        'background-color': 'white',
        border: '2px solid #2C367E',
        backgroundImage: "url('./arrow-hover.svg')",
      },
      backgroundImage: "url('/arrow.svg')",
      backgroundRepeat: 'no-repeat',
      'background-position-x': '5px',
      'background-position-y': '1px',
      'background-size': '14%',
    },
  }));
  const styles = useStyles();

  return (
    <div onMouseLeave={onMouseOut}>
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
        <Grid container>
          <Grid item xs={2}>
            <Favorite actor={actor} />
          </Grid>
          <Grid item xs={9}>
            <div className={styles.categorie}>
              <Typography
                style={{ color: actor?.entries && actor?.entries[0]?.parentEntry?.color }}
                gutterBottom
              >
                {actor.entries
                  && actor.entries.length > 0
                  && actor.entries[0].label}
              </Typography>
            </div>
          </Grid>
        </Grid>
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
