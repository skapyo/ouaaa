import React from 'react';
import {
  List, ListItem, makeStyles, Typography,
} from '@material-ui/core';
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

const AdministrationLeftMenuListItem = ({ pathname, label }) => {
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

const AdministrationLeftMenu = () => (
  <List>
    <AdministrationLeftMenuListItem
      pathname="/actorAdmin"
      label="Administrer les catégories"
    />
    <AdministrationLeftMenuListItem
      pathname="/actorAdmin/event"
      label="Administrer les autres filtre"
    />
  </List>
);

export default AdministrationLeftMenu;
