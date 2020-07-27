import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React, {useState} from "react";
import {makeStyles,fade} from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
    leftTitle: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2),
    },align: {
        "text-align": "center"
    },
    search: {

        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))


const Index = () => {
    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const styles = useStyles(stylesProps)
    return (
        <AppLayout>
            <RootRef >
                <Box>
                    <Container >
                        <Typography variant="h5" className={styles.align} >
                           VOTRE PLATEFORME COLLABORATIVE & SOLIDAIRE
                        </Typography>
                        <Typography className={styles.align} >
                            Notre mission c'est avant tout de rendre la transtion écologique plus simple et <br />accessible en permetant à chacun de trouveer des acteur  près de chez soi
                        </Typography>
                        <div className={styles.search}>
                            <div className={styles.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: styles.inputRoot,
                                    input: styles.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>


                    </Container>
                </Box>
            </RootRef>
        </AppLayout>
    )
}

export default Index