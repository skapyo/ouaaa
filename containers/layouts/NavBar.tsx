import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Menu,
  MenuItem,
  Button,
  Box,
  Stack,
  ButtonProps,
  Typography,
  IconButton,
  Breakpoint,
  Divider,
} from '@mui/material';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import Person2Icon from '@mui/icons-material/Person2';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: '68px',
    padding: '2px 13px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '98px',
    padding: '15px 60px',
  },
}));

const MenuButton = styled(Button)<ButtonProps>(({ theme, variant }) => ({
  textTransform: 'uppercase',
  fontSize: '1.1em',
  color: theme.palette.primary.contrastText, // Use the 'main' property of the primary color
  '&:hover': {
    background: theme.palette.primary.main,
    color: theme.palette.tertiary.contrastText,
  },
  ...(variant === 'contained' && {
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.tertiary.contrastText,
    },
  }),
}));

const SIGNOUT = gql`
  mutation logout {
    logout
  }
`;

const NavBar = () => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [resourcesMenuAnchorEl, setResourcesMenuAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSessionState();
  const sessionDispatch = useSessionDispatch();
  const [signout, { data }] = useMutation(SIGNOUT);

  useEffect(() => {
    if (data?.logout) {
      sessionDispatch({
        type: 'logout',
      });
    }
  }, [data, sessionDispatch]);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleResourcesMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setResourcesMenuAnchorEl(event.currentTarget);
  };

  const handleResourcesMenuClose = () => {
    setResourcesMenuAnchorEl(null);
  };

  const signoutHandler = useCallback(() => {
    signout();
    handleUserMenuClose();
  }, [signout]);

  const userMenuOpen = Boolean(userMenuAnchorEl);
  const resourcesMenuOpen = Boolean(resourcesMenuAnchorEl);

  const items: { label: string; link?: string; hideCondition?: boolean; submenu?: { label: string; link: string }[] }[] = [
    { label: "CARTE DES ACTEURS", link: '/carte' },
    { label: "AGENDA DES ACTIONS", link: '/agenda' },
    {
      label: 'RESSOURCES',
      submenu: [
        { label: "Articles", link: '/news' },
        { label: "Articles OUAAA", link: '/news?tag=ouaaa' },
        { label: "Vidéo Acteurs à VOUAAAR!", link: '/video' },
        { label: "Recettes", link: '/recettes' },
      ],
    },
  ];

  const breakpoint: Breakpoint = 'lg';

  return (
    <AppBar position="sticky" sx={{ position: { [breakpoint]: 'static' } }} elevation={0}>
      <CustomToolbar>
        <Link href="/">
          <Box component="img" src="/logo_header.png" alt="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle" sx={{ height: { xs: '50px', sm: '90px' } }} />
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', [breakpoint]: 'flex' } }}>
          {items.map((item) =>
            !item.hideCondition && (
              <React.Fragment key={item.label}>
                {/* Main menu button or text */}
                {item.link ? (
                  <MenuButton variant="text" component={Link} href={item.link}>
                    {item.label}
                  </MenuButton>
                ) : (
                  <MenuButton variant="text" onClick={handleResourcesMenuClick}>
                    {item.label}
                  </MenuButton>
                )}

                {/* Submenu handling for RESSOURCES */}
                {item.submenu && (
                  <Menu
                    id="resourcesMenu"
                    open={resourcesMenuOpen}
                    anchorEl={resourcesMenuAnchorEl}
                    onClose={handleResourcesMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {item.submenu.map((subItem) => (
                      <MenuItem key={subItem.label} component={Link} href={subItem.link} onClick={handleResourcesMenuClose}>
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </React.Fragment>
            ),
          )}
          {user ? (
            <Stack direction="row" onClick={handleUserMenuClick} sx={{ cursor: 'pointer' }}>
              <Avatar sx={{ mx: 1, mt: '5px' }} aria-controls="userMenu" aria-haspopup="true" />
              <Typography sx={{ fontSize: '0.9em' }}>
                {user.surname}
                <br />
                {user.lastname}
              </Typography>
            </Stack>
          ) : (
            <MenuButton variant="contained" disableElevation component={Link} href="/signin">
              <Person2Icon />
            </MenuButton>
          )}
        </Stack>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleUserMenuClick}
          sx={{ display: { [breakpoint]: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="userMenu"
          open={userMenuOpen}
          anchorEl={userMenuAnchorEl}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ '& .MuiMenu-paper': { marginTop: 2 } }}
        >
          {items.map(
            (item) =>
              !item.hideCondition && (
                <React.Fragment key={item.label}>
                  {/* Main menu item */}
                  {item.link ? (
                    <MenuItem
                      sx={{ display: { [breakpoint]: 'none' } }}
                      component={Link}
                      href={item.link}
                    >
                      {item.label}
                    </MenuItem>
                  ) : (
                    <Typography
                      sx={{
                        display: { [breakpoint]: 'none' },
                        padding: '10px 16px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                  {/* Submenu items */}
                  {item.submenu && (
                    <>
                      <Divider sx={{ display: { [breakpoint]: 'none' } }} />
                      {item.submenu.map((subItem) => (
                        <MenuItem
                          key={subItem.label}
                          sx={{ display: { [breakpoint]: 'none' } }}
                          component={Link}
                          href={subItem.link}
                        >
                          {subItem.label}
                        </MenuItem>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ),
          )}
          <Divider sx={{ display: { [breakpoint]: 'none' } }} />
          {!user && (
            <MenuItem component={Link} href="/signin">
              Se connecter
            </MenuItem>
          )}
          {user && (
            <>
              <MenuItem component={Link} href="/account">
                Mon compte
              </MenuItem>
              <MenuItem component={Link} href="/admin/actors">
                Espace acteur
              </MenuItem>
              <MenuItem onClick={signoutHandler}>Se déconnecter</MenuItem>
            </>
          )}
        </Menu>
      </CustomToolbar>
    </AppBar>
  );
};

export default withApollo()(NavBar);
