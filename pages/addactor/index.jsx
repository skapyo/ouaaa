import AppLayout from "containers/layouts/AppLayout"
import AppContainer from "containers/layouts/AppContainer"
import { Grid,Box, makeStyles, Typography, Avatar } from "@material-ui/core"
import {withApollo} from 'hoc/withApollo'
import AccountLeftMenu from "containers/menus/AccountLeftMenu"

import ClassicButton from "components/buttons/ClassicButton"
import AddActorForm from "containers/forms/AddActorForm"
import AddActorPageLayout from "containers/layouts/addActorPage/AddActorPageLayout"


const useStyles = makeStyles((theme) => ({
    avatar : {
        width: '200px',
        height: '200px',
        marginBottom : theme.spacing(4)
    },
    userInfosTitle : {
        marginBottom : theme.spacing(5),
    },

}))

const AccountPage = () => {

    const styles = useStyles()

    return (
        <AddActorPageLayout>
            <Grid container spacing={2}>
                <Grid item lg={7}>

                    <Typography 
                        color='secondary' 
                        variant='h6'
                        className={styles.userInfosTitle}
                    >
                        Référencer un acteur de la transition
                    </Typography>

                    <AddActorForm />

                </Grid>
                <Grid item lg={5}>

                    <Grid container justify='center' alignItems='center' direction='column'>
                        <Typography 
                            color='secondary' 
                            variant='h6'
                            className={styles.userInfosTitle}
                        >
                            Photo
                        </Typography>
                        <Avatar className={styles.avatar}/>
                        <ClassicButton>Photo</ClassicButton>
                    </Grid>

                </Grid>
            </Grid>
        </AddActorPageLayout>
    )
}

export default AccountPage