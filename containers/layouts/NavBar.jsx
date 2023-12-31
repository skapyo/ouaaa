import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  Avatar,
  Container,
  Fade,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Link from 'components/Link';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { withApollo } from 'hoc/withApollo';
import ButtonAppBarCollapse from './ButtonAppBarCollapse';
import Divider from '@mui/material/Divider';
const useStyles = makeStyles((theme) => ({
  '@media print': {
    navbar: {
      height: 50,
     
    },
    logo: {
      width: '12em',
    },
  },
  navbar: {
    height: '100px',
    backgroundColor: 'white',
    boxShadow: 'none',
    zIndex: 1,
  },
  buttontest: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: '0px',
  },
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: '5px'
  },
  account: {
    '&:hover': {
      cursor: 'pointer',
    },
    fontSize: '0.9em'
  },
  popoverPaper: {
    marginTop: theme.spacing(2),
    width: '250px',
  },
  listItemTypo: {
    fontWeight: '450',
  },
  menuItem: {
    color: '#2C367E',
  },
  title: {
    color: '#2C367E',
    marginLeft: '4em',
    fontSize: '3em',
  },
  buttonBar: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    margin: '10px',
    paddingLeft: '16px',
    right: 0,
    position: 'relative',
    width: '100%',
    background: 'transparent',
  },
  navLayout: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  logo: {
    marginBottom: '-20px',
    marginTop: '-11px',
    maxWidth: '200px',
    width: '100%',
  },
  toolbar:{
    padding: 0,
  },
  logoGrid:{
    [theme.breakpoints.down('lg')]: {
    width:'60%',
  },
}
}));

const SIGNOUT = gql`
  mutation logout {
    logout
  }
`;

const NavBar = () => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorMenuResources, setAnchorMenuResources] = useState(null);
  const user = useSessionState();
  const sessionDispatch = useSessionDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [signout, { data }] = useMutation(SIGNOUT);
  const theme = useTheme();
  const router = useRouter();

  const signoutHandler = useCallback(() => {
    signout();
  }, [signout]);

  const signinClickHandler = useCallback(() => {
    setCookie('redirect_url', router.asPath, { path: '/' });
  }, [setCookie, router.asPath]);

  useEffect(() => {
    if (data?.logout) {
      sessionDispatch({
        type: 'logout',
      });
    }
  }, [data, sessionDispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenuResources = useCallback((event) => {
    setAnchorMenuResources(event.target);
  }, []);

  const handleCloseMenuResources = useCallback(() => {
    setAnchorMenuResources(null);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" className={styles.navbar} color="inherit">
      <Container>
        <Toolbar  className={styles.toolbar}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item  className={styles.logoGrid}>
              <Link href="/">
                <img
                  className={styles.logo}
                  src="/logo.png"
                  alt="OUAAA! : Agir pour la Transition Ecologique & Sociale en Aunis | La Rochelle"
                />
              </Link>
            </Grid>
            <div className={styles.navLayout}>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/map"
                    >
                      CARTE DES ACTEURS
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/agenda"
                    >
                      AGENDA DES ACTIONS
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      className={styles.menuItem}
                      onMouseOver={handleOpenMenuResources}
                    >
                      RESSOURCES
                    </MenuItem>
                    <Menu
                      id="menu-resources"
                      anchorEl={anchorMenuResources}
                      open={Boolean(anchorMenuResources)}
                      onClose={handleCloseMenuResources}
                      MenuListProps={{ onMouseLeave: handleCloseMenuResources }}
                    >
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
                       {/*    <MenuItem component={Link} href="/recettes">
                        Recettes
                      </MenuItem>*/}
                    </Menu>
                  </Grid>
             {/*     <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/granddefi"
                    >
                      LE GRAND DEFI
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/participate"
                    >
                      JE PARTICIPE
                    </MenuItem>
  
                  </Grid>
*/}

                  {
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/about"
                    >
                      A PROPOS
                    </MenuItem>
                  </Grid>
                  }

                  {!user && (
                    <Grid item>
                      {/* @ts-ignore */}
                      <Link
                        href="/signin"
                        underline="none"
                        color="textPrimary"
                        onClick={signinClickHandler}
                      >
                        <PersonOutlineIcon className={styles.menuItem} />
                      </Link>
                    </Grid>
                  )}

                  {user && (
                    <Grid item>
                      <Grid
                        container
                        onClick={handleClick}
                        className={styles.account}
                      >
                        <Grid item>
                          <Avatar
                            className={styles.avatar}
                            aria-controls="popover-menu"
                            aria-haspopup="true"
                          />
                        </Grid>
                        <Grid item>
                          <div>
                            {/* @ts-ignore */}
                            {user.surname}
                          </div>
                          <div>{user.lastname}</div>
                        </Grid>
                      </Grid>
                      <Menu
                        id="popover-menu"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        className={styles.menuItem}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        getContentAnchorEl={null}
                        classes={{ paper: styles.popoverPaper }}
                        TransitionComponent={Fade}
                      >
                        {/* <MenuItem onClick={() => router.push('/account')} component={Link} >Mon compte</MenuItem> */}
                        <MenuItem
                          button
                          component={Link}
                          className={styles.menuItem}
                          href="/account"
                        >
                          Mon compte
                        </MenuItem>
                        <MenuItem
                          button
                          component={Link}
                          className={styles.menuItem}
                          href="/granddefiProgression"
                        >
                          Espace grand défi
                        </MenuItem>
                        <MenuItem
                          button
                          component={Link}
                          className={styles.menuItem}
                          href="/actorAdmin"
                        >
                          Espace Acteur
                        </MenuItem>
                        {user && false && user.role == 'admin' && (
                          <MenuItem
                            button
                            component={Link}
                            className={styles.menuItem}
                            href="/administration"
                          >
                            Administration
                          </MenuItem>
                        )}
                        <MenuItem
                          onClick={signoutHandler}
                          className={styles.menuItem}
                        >
                          Se déconnecter
                        </MenuItem>
                      </Menu>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
            <ButtonAppBarCollapse>
              <Grid item>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/map"
                    >
                      CARTE DES ACTEURS
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/agenda"
                    >
                      AGENDA DES ACTIONS
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      className={styles.menuItem}
                      onMouseOver={handleOpenMenuResources}
                    >
                      RESSOURCES
                    </MenuItem>
                    <Menu
                      id="menu-resources"
                      anchorEl={anchorMenuResources}
                      open={Boolean(anchorMenuResources)}
                      onClose={handleCloseMenuResources}
                      MenuListProps={{ onMouseLeave: handleCloseMenuResources }}
                    >
                      <MenuItem component={Link} href="/news">
                        Articles
                      </MenuItem>
                      <MenuItem component={Link} href="/news?tag=ouaaa">
                        Articles OUAAA
                      </MenuItem>
                      <MenuItem component={Link} href="/video">
                        Vidéo Acteurs à VOUAAAR!
                      </MenuItem>
                      {/*   <MenuItem component={Link} href="/recettes">
                        Recettes
                      </MenuItem> */}
                    </Menu>
                  </Grid>
             {/*     <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/granddefi"
                    >
                      LE GRAND DEFI
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/participate"
                    >
                      JE PARTICIPE
                    </MenuItem>
  
                  </Grid>
*/}
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/about"
                    >
                      A PROPOS
                    </MenuItem>
                  </Grid>
                  {!user && (
                    <Grid item>
                      {/* @ts-ignore */}
                      <Link
                        href="/signin"
                        underline="none"
                        color="textPrimary"
                        onClick={signinClickHandler}
                      >
                        <PersonOutlineIcon className={styles.menuItem} />
                      </Link>
                    </Grid>
                  )}

                  {user && (
                    <Grid item>
                      <Grid
                        container
                        onClick={handleClick}
                        className={styles.account}
                      >
                        <Grid item>
                          <Avatar
                            className={styles.avatar}
                            aria-controls="popover-menu"
                            aria-haspopup="true"
                          />
                        </Grid>
                        <Grid item>
                          <div>
                            {/* @ts-ignore */}
                            {user.surname}
                          </div>
                          <div>{user.lastname}</div>
                        </Grid>
                      </Grid>
                      <Menu
                        id="popover-menu"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        className={styles.menuItem}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        getContentAnchorEl={null}
                        classes={{ paper: styles.popoverPaper }}
                        TransitionComponent={Fade}
                      >
                        {/* <MenuItem onClick={() => router.push('/account')} component={Link} >Mon compte</MenuItem> */}
                        <MenuItem
                          button
                          component={Link}
                          className={styles.menuItem}
                          href="/account"
                        >
                          Mon compte
                        </MenuItem>
                        <MenuItem
                          button
                          component={Link}
                          className={styles.menuItem}
                          href="/granddefiProgression"
                        >
                          Espace grand défi
                        </MenuItem>
                        <MenuItem
                          button
                          component={Link}
                          className={styles.menuItem}
                          href="/actorAdmin"
                        >
                          Espace Acteur
                        </MenuItem>
                        <MenuItem
                          onClick={signoutHandler}
                          className={styles.menuItem}
                        >
                          Se déconnecter
                        </MenuItem>
                      </Menu>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </ButtonAppBarCollapse>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withApollo()(NavBar);
