import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Avatar,
  Container,
  Fade,
  Grid,
  Menu,
  MenuItem,
} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Link from 'components/Link';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { withApollo } from 'hoc/withApollo';
import ButtonAppBarCollapse from './ButtonAppBarCollapse';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
  buttontest: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: '0px',
  },
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  account: {
    '&:hover': {
      cursor: 'pointer',
    },
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  logo: {
    width: '10em',

  },
}));

const SIGNOUT = gql`
  mutation logout {
    logout
  }
`;

const NavBar = () => {
  const styles = useStyles();
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" className={styles.navbar} color="inherit">
      <Container>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Link href="/">
                <img
                  className={styles.logo}
                  src="/logo.png"
                  alt="Ouaaa : Agir pour la transition en Aunis – La Rochelle et ses communes"
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
                  {/*<Grid item>
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
                      component={Link}
                      className={styles.menuItem}
                      href="/participate"
                    >
                      JE PARTICIPE
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/news"
                    >
                      INFO & ARTICLES
                    </MenuItem>
                  </Grid>
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
                */}

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
                          href="/actorAdmin"
                        >
                          Espace Acteur
                        </MenuItem>
                        {user && user.role == 'admin' && (
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
                      ACTEURS
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
                      component={Link}
                      className={styles.menuItem}
                      href="/participate"
                    >
                      JE PARTICIPE
                    </MenuItem>
                  </Grid>
                  <Grid item>
                    <MenuItem
                      button
                      component={Link}
                      className={styles.menuItem}
                      href="/news"
                    >
                      LE JOURNAL
                    </MenuItem>
                  </Grid>
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
