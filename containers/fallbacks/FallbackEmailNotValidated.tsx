import AppLayout from "containers/layouts/AppLayout"
import AppContainer from "containers/layouts/AppContainer"
import { Typography, Grid, makeStyles } from "@material-ui/core"
import ClassicButton from "components/buttons/ClassicButton"
import Link from "components/Link"

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const FallbackEmailValidated = (props: any) => {
  const styles = useStyles()

  const sendNewEmail = () => {
    console.log("======================")
    console.log("Should send a new email")
    console.log("======================")
  }

  return (
    <AppLayout>
      <AppContainer>
        <Grid container justify='center'>
          <Typography variant='h6'>
            Votre email {props.email} n'est pas validé.
          </Typography>
          <Grid container justify='center'>
            <Grid item>
              <ClassicButton
                fullWidth
                variant="contained"
                className={styles.submit}
                onClick={sendNewEmail}
              >
                Recevoir un nouvel email
              </ClassicButton>
            </Grid>
          </Grid>
        </Grid>
      </AppContainer>
    </AppLayout>
  )
}

export default FallbackEmailValidated
