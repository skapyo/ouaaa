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
} from '@mui/material';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import Divider from '@mui/material/Divider';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signoutHandler = useCallback(() => {
    signout();
    handleClose();
  }, [signout]);

  const open = Boolean(anchorEl);

  const items: { label: string; link: string; hideCondition?: boolean }[] = [
    { label: "CARTE DES ACTEURS", link: '/carte' },
    { label: "AGENDA DES ACTIONS", link: '/agenda' },
    { label: 'RESSOURCES', link: '/en-savoir-plus' },
    {
      label: 'Actualités',
      link: '/actualites',
 },
];
 /*
 <MenuItem component={Link} href="/news">
 Articles
</MenuItem>
<Divider />
<MenuItem component={Link} href="/news?tag=ouaaa">
 Articles OUAAA
</MenuItem>
<MenuItem component={Link} href="/video">
 Vidéo Acteurs à VOUAAAR!
</MenuItem>
{    <MenuItem component={Link} href="/recettes">
 Recettes
</MenuItem>}

  ];*/
  
  const breakpoint: Breakpoint = 'lg';

  
  return (
    <AppBar position="sticky" sx={{ position: { [breakpoint]: 'static' } }} elevation={0}>
    <CustomToolbar>
    <Link href="/">
      <Box component="img" src="/logo_header.png" alt="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle" sx={{ height: { xs: '50px', sm: '90px' } }} />
    </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', [breakpoint]: 'flex' } }}>
            {items.map(
              (item) =>
                !item.hideCondition && (
                  <MenuButton key={item.label} variant="text" component={Link} href={item.link}>
                    {item.label}
                  </MenuButton>
                ),
            )}
            {user ? (
              <Stack direction="row" onClick={handleClick} sx={{ cursor: 'pointer' }}>
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
            onClick={handleClick}
            sx={{ display: { [breakpoint]: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="userMenu"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
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
                  <MenuItem
                    key={item.label}
                    sx={{ display: { [breakpoint]: 'none' } }}
                    component={Link}
                    href={item.link}
                  >
                    {item.label}
                  </MenuItem>
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
                <MenuItem component={Link} href="/admin/stages">
                  Espace référent
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
