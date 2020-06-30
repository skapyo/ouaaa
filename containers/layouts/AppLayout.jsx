import NavBar from 'containers/layouts/NavBar'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : '#FFFFFF'
    }
}))

const AppLayout = ({children}) => {

    const styles = useStyles()

    return (
        <Box className={styles.root}>
            <NavBar />
            {children}
        </Box>
    )
}

export default AppLayout