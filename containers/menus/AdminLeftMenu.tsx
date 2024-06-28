import React from 'react';
import { List, ListItemButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSessionState } from 'context/session/session';

const ListItem = ({ pathname, label }) => {
  const router = useRouter();

  return (
    <ListItemButton
      component={Link}
      href={pathname}
      selected={router.asPath.startsWith(pathname)}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'secondary.contrastText',
          color: 'secondary.main',
          fontWeight: 'bold',
        },
      }}
    >
      {label}
    </ListItemButton>
  );
};

const AdminLeftMenu = () => {
  const user = useSessionState();

  return (
    <List>
      <ListItem pathname="/admin/actors" label="Administrer mes pages acteurs" />
      <ListItem pathname="/admin/events" label="Administrer mes activités" />
      {(process.env.NEXT_PUBLIC_HIDE_ACTIVITY === undefined || process.env.NEXT_PUBLIC_HIDE_ACTIVITY !== 'true') && (
        <>
          {user?.role === 'admin' && <ListItem pathname="/admin/news" label="Administrer les actualités" />}
        </>
      )}
      {user?.role === 'admin' && <ListItem pathname="/admin/users" label="Administrer les utilisateur·ices" />}
    </List>
  );
};

export default AdminLeftMenu;
