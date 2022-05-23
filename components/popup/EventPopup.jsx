import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import {
  Grid, Typography, useTheme,
} from '@material-ui/core';
import Moment from 'react-moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from '@mui/material';
import Favorite from '../Favorite';
import { getImageUrl } from '../../utils/utils';

function addressCity(event) {
  if (!(event && event !== undefined && typeof event !== 'undefined')) return '';
  if (!event.city) return 'Adresse manquante';
  const list = [event.address, event.city];
  return `${list.join(', ')}`;
}

const EventPopup = ({ event, onMouseOut }) => {
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
      [theme.breakpoints.up('sm')]: {
        margin: '2.5em 0 2.5em 0 ',
      },
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
  const position = [46.1085193, -0.9864794];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const startDateFormat = !matches ? '[ de ]HH[h]mm' : 'HH[h]mm';
  const endDateFormat = !matches ? '[ à ]HH[h]mm' : '[-]HH[h]mm';

  return (
    <div onMouseLeave={onMouseOut}>
      <div
      >
        <Grid container>
          <Grid item xs={2}>
            <Favorite event={event} />
          </Grid>
          <Grid item xs={9}>
            <div className={styles.categorie}>
              <Typography
                className={styles.categorie}
                gutterBottom
              >
                {event?.categories?.[0]?.label}
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
                {event?.label}
              </Typography>
            </div>
            <br />
            <br />
            <Typography
              variant="h6"
              component="h2"
              className={styles.title}
            >
              {!event.duration && (
                <>
                  Le
                  {' '}
                  <Moment
                    locale="fr"
                    format="DD MMMM YYYY"
                    unix
                  >
                    {event.startedAt / 1000}
                  </Moment>
                  <Moment format={startDateFormat} unix>
                    {event.startedAt / 1000}
                  </Moment>
                  <Moment format={endDateFormat} unix>
                    {event.endedAt / 1000}
                  </Moment>
                </>
              )}
              {event.duration && (
                <>
                  <span>Du </span>
                  <Moment
                    locale="fr"
                    format="DD MMMM YYYY"
                    unix
                  >
                    {event.startedAt / 1000}
                  </Moment>
                  <span> au </span>
                  <Moment
                    locale="fr"
                    format="DD MMMM YYYY"
                    unix
                  >
                    {event.endedAt / 1000}
                  </Moment>
                </>
              )}
            </Typography>
            {event.parentEvent && (
              <>
                <span>
                  fait partie de
                  <Link href={`/event/${event.parentEvent.id}`}>{event.parentEvent.label}</Link>
                </span>
                <br />
              </>
            )}
            <span>{addressCity(event)}</span>

            <p />
          </Grid>

        </Grid>

        <Typography component="p">
          {event?.shortDescription}
        </Typography>
      </div>
      <a href={`/event/${event.id}`} target="_blank" rel="noreferrer">
        <button className={styles.buttonGrid}>
          EN SAVOIR PLUS
        </button>
      </a>
    </div>
  );
};
export default EventPopup;
