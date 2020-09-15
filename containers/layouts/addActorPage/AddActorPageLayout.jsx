import AppLayout from "containers/layouts/AppLayout"
import AppContainer from "containers/layouts/AppContainer"
import { Grid,Box, makeStyles, Typography, Fab, Hidden, SwipeableDrawer} from "@material-ui/core"
import AccountLeftMenu from "containers/menus/AccountLeftMenu"
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import { useCallback, useState } from "react";

const useStyles = makeStyles((theme) => ({
    gridContainer : {
        marginTop : theme.spacing(5),
        textAlign:'center'
    },
    title: {
        fontWeight : '700'
    },
    fab: {
        position : 'fixed',
        bottom : '40px',
        right : '40px',
        zIndex : '1400'
    },
    drawer : {
        '& .MuiDrawer-paperAnchorBottom' : {
            height:'100%'
        }
    }
}))


const AddActorPageLayout = ({children}) => {

    const styles = useStyles()

    return (
        <AppLayout>
            <AppContainer maxWidth='lg'>
                <Box className={styles.gridContainer}>
                    <Grid container spacing={10}>
                        <Grid item lg={9}>
                            {children}
                        </Grid>
                    </Grid>
                </Box>
            </AppContainer>
        </AppLayout>
    )
}

export default AddActorPageLayout