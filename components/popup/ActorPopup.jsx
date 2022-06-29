import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Image from 'next/image';
import Favorite from '../Favorite';
import { getImageUrl } from '../../utils/utils';

const useHeaderStyles = makeStyles(() => ({
  header: (props) => ({
    position: 'relative',
    height: props.errorLoading ? 'auto' : 100,
    '& > *': {
      zIndex: 1
    }
  }),
  categorie: (props) => ({
    backgroundColor: 'white',
    borderRadius: '0.5em',
    padding: '0 5px 0 5px',
    textAlign: 'center',
    border: `1px solid ${props.color}`,
    '& p': {
      margin: 0
    }
  }),
}));

const Header = ({ actor }) => {
  const [errorLoading, setErrorLoading] = useState(!!!actor?.pictures?.[0]?.originalPicturePath);
  const styles = useHeaderStyles({
    errorLoading,
    color: actor?.entries?.[0]?.parentEntry?.color || 'rgba(128, 128, 128, 0.15)'
  });

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={styles.header}>
      {
        actor?.pictures?.[0]?.originalPicturePath && (
          <Image
            src={getImageUrl(actor.pictures[0].originalPicturePath)}
            layout="fill"
            objectFit="contain"
            onError={() => {
              setErrorLoading(true);
            }}
          />
        )
      }
      <Grid item>
        <Favorite actor={actor} />
      </Grid>
      {
        actor?.entries?.[0]?.label && (
          <Grid item className={styles.categorie}>
            <Typography
              style={{ color: actor?.entries?.[0]?.parentEntry?.color }}
              gutterBottom
            >
              {actor?.entries?.[0]?.label}
            </Typography>
          </Grid>
        )
      }
    </Grid>
  )
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '10px 0',
    width: '100%',
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    textAlign: 'left',
    color: '#2C367E',
    width: '100%',
  },
  icon: {
    color: '#bd0b3d',
    width: '20px',
    marginRight: 6
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonGrid: {
    [theme.breakpoints.up('sm')]: {
      margin: '0.5em 0 1.5em 0',
    },
    color: 'white',
    backgroundColor: '#2C367E',
    border: 'none',
    borderRadius: '1.5em',
    padding: '0 3em',
    height: '2.5em',
    width: 'fit-content',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      backgroundColor: 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('./arrow-hover.svg')",
    },
    backgroundImage: "url('/arrow.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: '5px',
    backgroundPositionY: '1px',
    backgroundSize: '14%',
  },
}));

const ActorPopup = ({ actor, onMouseOut, tooltip = false }) => {
  const styles = useStyles();

  return (
    <Grid container direction="column" onMouseLeave={onMouseOut}>
      <Header actor={actor} />
      <div className={styles.content}>
        <Grid container>
          <Grid item>
            <div className={styles.titleDiv}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.title}
              >
                {actor?.name}
              </Typography>
            </div>
            <Grid container direction="row" alignItems="flex-end">
              {/* @ts-ignore */}
              <img src="/icons/location.svg" alt="Localisation" className={styles.icon} />
              {!actor.address && actor.city && (
                <span>
                  {actor.city}
                </span>
              )}
              {actor.address && actor.city && (
                <span>
                  {`${actor.address} ${actor.city}`}
                </span>
              )}
            </Grid>
          </Grid>

        </Grid>

        <Typography component="p">
          {actor && actor.shortDescription}
        </Typography>
      </div>

      {
        !tooltip && (
          <a href={`/actor/${actor.id}`} target="_blank" rel="noreferrer" className={styles.buttonContainer}>
            <button className={styles.buttonGrid}>
              EN SAVOIR PLUS
            </button>
          </a>
        )
      }
    </Grid>
  );
};

export default ActorPopup;
