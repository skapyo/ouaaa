import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Container, Avatar, Typography, Hidden } from '@material-ui/core'
import SocialNetworkButton from 'components/buttons/SocialNetworkButton'
import AppLayout from 'containers/layouts/AppLayout'
import Card from 'components/cards/Card'
import AppContainer from 'containers/layouts/AppContainer'
import gql from "../map";
import {useQuery} from "@apollo/react-hooks";


const useStyles = makeStyles((theme) => ({
  avatar : {
    width: '200px',
    height: '200px',
    marginTop : theme.spacing(2),
    marginBottom : theme.spacing(4)
  },
  name : {
    fontWeight : theme.typography.fontWeightBold,
    marginBottom : theme.spacing(1)
  },
  sloggan : {
    // marginBottom : theme.spacing(3)
    fontStyle : 'italic',
    fontWeight : theme.typography.fontWeightRegular
  },
  categoryTitle : {
    fontWeight : theme.typography.fontWeightBold,
    marginBottom : theme.spacing(2)
  }
}))

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const styles = useStyles()



  if (typeof window !== 'undefined')
    window.addEventListener('scroll', (event) => {
      console.log(window.scrollY);
    })
    // console.log(undefined);

  return (
    <>
      <AppLayout>
        <AppContainer>
          <Grid container>
            <Hidden only={['md','lg','sm','xl']}>
              <Grid item xs={12} align='center'>
                <Avatar className={styles.avatar}/>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={6}>
                <Grid item>
                  <Typography variant='h3' className={styles.name}>
                    Christophe Guerlus
                  </Typography>
                  <Typography variant='h6' className={styles.sloggan}>
                    Passionné de cuisine du monde
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5' className={styles.categoryTitle}>
                    Informations personnelles :
                  </Typography>
                  <Typography variant='body1'>
                  orem ipsum dolor sit amet, consectetur adipiscing elit. Ut risus urna, sollicitudin pharetra volutpat rutrum, pulvinar eu diam. Integer scelerisque, odio nec tincidunt varius, enim mauris scelerisque nunc, id consequat dolor libero quis eros. Curabitur eget dui id dolor suscipit aliquet id sed magna. Duis malesuada orci ac metus imperdiet sollicitudin. In hac habitasse platea dictumst. Phasellus tortor diam, viverra in eleifend nec, convallis eu urna. Aliquam sed mi eget lorem cursus accumsan vel ut nunc. Integer sollicitudin risus non sagittis feugiat. Phasellus a luctus turpis. Phasellus sed luctus elit, et efficitur diam. Curabitur id posuere orci, ornare sagittis erat.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5' className={styles.categoryTitle}>
                    Ma gallerie :
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5' className={styles.categoryTitle}>
                    Mes cours :
                  </Typography>
                  <Grid container spacing={3} align='center'>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>           
            </Grid>
            <Grid item xs={12} sm={4} align='center'>
              <Hidden xsDown>
                <Avatar className={styles.avatar}/>
              </Hidden>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                  <SocialNetworkButton socialNetwork='Website' />
                </Grid>
                <Grid item>
                  <SocialNetworkButton socialNetwork='Youtube' />
                </Grid>
                <Grid item>
                  <SocialNetworkButton socialNetwork='Linkedin' />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AppContainer>    
      </AppLayout>
    </>
  )
}

export default User