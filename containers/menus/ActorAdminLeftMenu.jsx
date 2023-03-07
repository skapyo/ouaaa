import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Link from 'components/Link';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.Mui-selected': {
      backgroundColor: 'white',
      color: theme.palette.secondary.main,
      '& p': {
        fontWeight: '600',
      },
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'white',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

const ActorAdminLeftMenuListItem = ({ pathname, label }) => {
  const router = useRouter();

  const styles = useStyles();

  return (
    <ListItem
      button
      component={Link}
      href={pathname}
      selected={router.asPath == pathname}
      className={styles.root}
    >
      <Typography variant="body1">{label}</Typography>
    </ListItem>
  );
};

const ActorAdminLeftMenu = () => (
  <List>
    <ActorAdminLeftMenuListItem
      pathname="/actorAdmin"
      label="Administrer mes pages acteurs"
    />
    <ActorAdminLeftMenuListItem
      pathname="/actorAdmin/event"
      label="Administrer mes événements"
    />
     <ActorAdminLeftMenuListItem
      pathname="/actorAdmin/article"
      label="Administrer mes articles"
    />
  </List>
);

export default ActorAdminLeftMenu;
