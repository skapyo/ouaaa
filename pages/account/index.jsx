import AppLayout from "containers/layouts/AppLayout"
import AppContainer from "containers/layouts/AppContainer"
import { Grid,Box, makeStyles, Typography, Avatar } from "@material-ui/core"
import {withApollo} from 'hoc/withApollo'
import AccountLeftMenu from "containers/menus/AccountLeftMenu"

import ClassicButton from "components/buttons/ClassicButton"
import UserInfosForm from "containers/forms/UserInfosForm"
import AccountPageLayout from "containers/layouts/accountPage/AccountPageLayout"


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
        <AccountPageLayout>
            <Grid container spacing={2}>
                <Grid item lg={7}>

                    <Typography 
                        color='secondary' 
                        variant='h6'
                        className={styles.userInfosTitle}
                    >
                        Mes informations personnelles
                    </Typography>

                    <UserInfosForm />

                </Grid>
                <Grid item lg={5}>

                    <Grid container justify='center' alignItems='center' direction='column'>
                        <Typography 
                            color='secondary' 
                            variant='h6'
                            className={styles.userInfosTitle}
                        >
                            Ma photo
                        </Typography>
                        <Avatar className={styles.avatar}/>
                        <ClassicButton>Modifier ma photo</ClassicButton>
                    </Grid>

                </Grid>
            </Grid>
        </AccountPageLayout>
    )
}

export default AccountPage