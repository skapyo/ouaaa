import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Avatar, Container, Fade, Grid, Menu, MenuItem,} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Link from 'components/Link';
import {useSessionDispatch, useSessionState} from 'context/session/session';
import React, {useCallback, useEffect} from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useCookies} from 'react-cookie';
import {useRouter} from 'next/router';
import {withApollo} from 'hoc/withApollo';
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
  popoverPaper: {
    marginTop: theme.spacing(2),
    width: '250px',
  },
  listItemTypo: {
    fontWeight: '450',
  },
  menuItem: {
    color: '#2a9076',
  },
  title: {
    color: '#bf083e',
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
    width: '8em',
    marginTop: '1em',
  },
}));

const SIGNOUT = gql`
  mutation logout{
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
                      alt="logo"
                  />
                </Link>
              </Grid>
              <div className={styles.navLayout}>
                <Grid item>
                  <Grid
                      container
                      spacing={3}
                      alignItems="center"
                  >
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/map">LA CARTE</MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/agenda">L'AGENDA</MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/participate">
                        JE
                        PARTICIPE
                      </MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/news">LE JOURNAL</MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/about">A PROPOS</MenuItem>
                    </Grid>

                    {!user && (
                        <Grid item>
                          {' '}
                          <Link href="/signin" underline="none" color="textPrimary" onClick={signinClickHandler}>
                            <PersonOutlineIcon className={styles.menuItem} />
                          </Link>

                        </Grid>
                    )}

                    {user && (
                        <>
                          <Avatar
                              className={styles.avatar}
                              onClick={handleClick}
                              aria-controls="popover-menu"
                              aria-haspopup="true"
                          />
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
                            <MenuItem button component={Link} className={styles.menuItem} href="/account">
                              Mon
                              compte
                            </MenuItem>
                            <MenuItem button component={Link} className={styles.menuItem} href="/actorAdmin">
                              Espace
                              Acteur
                            </MenuItem>
                            <MenuItem onClick={signoutHandler} className={styles.menuItem}>Se déconnecter</MenuItem>
                          </Menu>

                        </>
                    )}
                  </Grid>
                </Grid>
              </div>
              <ButtonAppBarCollapse>
                <Grid item>
                  <Grid
                      container
                      spacing={3}
                      alignItems="center"
                  >
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/map">LA CARTE</MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/agenda">L'AGENDA</MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/participate">
                        JE
                        PARTICIPE
                      </MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/news">LE JOURNAL</MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem button component={Link} className={styles.menuItem} href="/about">A PROPOS</MenuItem>
                    </Grid>

                    {!user && (
                        <Grid item>
                          {' '}
                          <Link href="/signin" underline="none" color="textPrimary" onClick={signinClickHandler}>
                            <PersonOutlineIcon className={styles.menuItem} />
                          </Link>

                        </Grid>
                    )}

                    {user && (
                        <>
                          <Avatar
                              className={styles.avatar}
                              onClick={handleClick}
                              aria-controls="popover-menu"
                              aria-haspopup="true"
                          />
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
                            <MenuItem button component={Link} className={styles.menuItem} href="/account">
                              Mon
                              compte
                            </MenuItem>
                            <MenuItem button component={Link} className={styles.menuItem} href="/actorAdmin">
                              Espace
                              Acteur
                            </MenuItem>
                            <MenuItem onClick={signoutHandler} className={styles.menuItem}>Se déconnecter</MenuItem>
                          </Menu>

                        </>
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
