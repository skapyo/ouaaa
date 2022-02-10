import React, { useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Stack, IconButton, Tooltip, useMediaQuery, useTheme,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
// eslint-disable-next-line import/no-unresolved
import ActorCard from 'components/cards/ActorCard';

const useStyles = makeStyles((theme) => ({
  '@media print': {
    header: {
      display: 'none !important',
    },
    stack: {
      display: 'block !important',
      '& > *': {
        breakInside: 'avoid',
      },
    },
  },
  actors: {
    width: '100%',
    margin: '0',
    paddingBottom: 66,
    padding: '10px 2em',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 1em',
    },
  },
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#2C367E',
    fontSize: '2.3em',
    display: 'flex',
    flex: 1,
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#AEAEAE',
  },
}));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Actors = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  // eslint-disable-next-line react/prop-types
  const { data } = props;

  const handleClickPrint = useCallback(() => {
    window.print();
  }, []);

  const compare = useCallback((a, b) => {
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'accent' });
  }, []);

  const actors = useMemo(() => {
    // eslint-disable-next-line react/prop-types
    return data && data.actors.slice().sort(compare);
  }, [data]);

  return (
    <div className={classes.actors}>
      <div className={classes.header}>
        <h1 className={classes.title}>
          Liste des acteurs
        </h1>
        {
          matches && (
            <div>
              <Tooltip title="Imprimer">
                <IconButton onClick={handleClickPrint} size="large">
                  <PrintIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      </div>
      <Stack spacing={2} className={classes.stack}>
        {
          actors.map((actor) => (
            <div key={actor.id}>
              <ActorCard key={actor.id} actor={actor} />
            </div>
          ))
        }
      </Stack>
    </div>
  );
};

export default Actors;
