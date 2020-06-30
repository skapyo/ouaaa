import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Avatar, MenuItem, Fade , Menu } from '@material-ui/core';
import ClassicButton from '../../components/buttons/ClassicButton';
import Link from 'components/Link'
import { useSessionState, useSessionDispatch } from 'context/session/session';
import { useCallback ,useEffect, useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {useCookies} from 'react-cookie'
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import {withApollo} from 'hoc/withApollo'

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor : 'white',
    boxShadow:'none'
  },
  buttontest : {
    paddingTop : theme.spacing(1),
    paddingBottom:theme.spacing(1),
    // background:'red',
    marginBottom:'0px',
  },
  avatar:{
    marginLeft : theme.spacing(1),
    marginRight : theme.spacing(1)
  },
  popoverPaper :{
    marginTop : theme.spacing(2),
    width : '250px'
  },
  listItemTypo : {
    fontWeight : '450'
  }
}));

const SIGNOUT = gql`
    mutation logout{
      logout
    }
`

const NavBar = () => {
  
  const styles = useStyles();
  const user = useSessionState()
  const sessionDispatch = useSessionDispatch()
  const [cookies, setCookie, removeCookie] = useCookies();
  const [signout,{data}] = useMutation(SIGNOUT)
  const theme = useTheme();
  const router = useRouter()

  const signoutHandler = useCallback(() => {
    signout()
  },[signout])

  const signinClickHandler = useCallback(() => {
    setCookie('redirect_url', router.asPath, { path: '/' })
  },[setCookie,router.asPath])

  useEffect(() => {
    if(data?.logout)
      sessionDispatch({ 
        type: "logout" 
      })
  },[data,sessionDispatch])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  };
  const open = Boolean(anchorEl)

  return (
      <>
        <AppBar position="static" className={styles.navbar} color='inherit'>
          <Toolbar>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid item>
                <Typography>Title</Typography>
              </Grid>
              <Grid item>
                <Grid 
                  container
                  spacing={3}
                  alignItems='center'
                > 
                  {!user && (
                    <>
                      <Grid item>
                        <Link href="/signup" underline='none' color='textPrimary'>
                          S'inscrire
                        </Link>
                      </Grid>
                      <Grid item>
                        {/* <Link href={`${router.asPath}?modal=true}`} as='/signin' underline='none' color='textPrimary'> */}
                        <Link href='/signin' underline='none' color='textPrimary' onClick={signinClickHandler}>
                          Se connecter
                        </Link>
                      </Grid>
                    </>
                  )}
                  <Grid item>
                    <ClassicButton className={styles.buttontest}>
                      Donner une formation
                    </ClassicButton>
                  </Grid>
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
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        getContentAnchorEl={null}
                        classes ={{paper : styles.popoverPaper}}
                        TransitionComponent={Fade}
                      >
                        {/* <MenuItem onClick={() => router.push('/account')} component={Link} >Mon compte</MenuItem> */}
                        <MenuItem button component={Link} href='/account' >Mon compte</MenuItem>
                        <MenuItem onClick={signoutHandler}>Se déconnecter</MenuItem>
                      </Menu>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </>
  )
}

export default withApollo()(NavBar)