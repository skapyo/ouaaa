import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React, {useState} from "react";
import {makeStyles,fade} from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {white} from "color-name";
const useStyles = makeStyles((theme) => ({
    leftTitle: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2),
    },align: {
        "text-align": "center"
    },
    search: {

        position: 'relative',
        borderRadius: '9em',
        backgroundColor: 'white',
        //marginLeft: theme.spacing(40),
        width: '35%',
        margin: "0 auto",
        marginTop :theme.spacing(2),
        color:'black'
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        color:'#bf083e',
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
        padding: theme.spacing(1, 1, 1, 3),
        // vertical padding + font size from searchIcon

        transition: theme.transitions.create('width'),
        width: '350px'
    },
    titleContainer: {
        marginTop : theme.spacing(2),
        backgroundImage:`url('./fond.jpeg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'space',
        height: '24em',
        color: 'white',
        "text-align": "center",
        padding :'3em',

    },
    titleTypo: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize:"2em"
    },
     cardInfo: {
        "padding": "2em",
        backgroundColor:"white",
        //  backgroundImage:`url('./fond.png')`,
        backgroundPosition: 'center',
        borderRadius: "0.5em",
        width:"80%",
        justify:"center",
        alignItems: "center",
        "max-width": '755px',
        "margin-top": '-53px',
        "box-shadow": "0px 0px 38px -14px rgba(0, 0, 0, 0.46)",
    }
,   image: {
        "box-shadow": "11px 11px 13px -3px rgba(0, 0, 0, 0.46)",
    },
    cardTitle:{
        "color":"#2a9076",
        fontWeight: 700,
    },
    button:{
        "color":"#2a9076",
        fontWeight: 700,
    }



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
                    <Container className={styles.titleContainer} >
                        <Typography className={styles.titleTypo} >
                           VOTRE PLATEFORME
                        </Typography>
                        <Typography className={styles.titleTypo} >
                          COLLABORATIVE & SOLIDAIRE
                        </Typography>
                        <Typography className={styles.align} >
                            Notre mission c'est avant tout de rendre la transtion écologique plus simple et <br />accessible en permetant à chacun de trouveer des acteur  près de chez soi
                        </Typography>
                        <div className={styles.search}  >
                            <div className={styles.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Rechercher un acteur, un événement, un article"
                                classes={{
                                    root: styles.inputRoot,
                                    input: styles.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>


                    </Container>

                    <Container   className={styles.cardInfo}
                          >
                        <Typography variant="h5"   className={styles.cardTitle}  >
                            #NAME
                        </Typography>
                        <Typography variant="h5"   className={styles.cardTitle}  >
                             EN 3 POINTS
                        </Typography>
                        <Grid container spacing={3} className={styles.align}>
                            <Grid item xs={6}>
                                blablabla
                            </Grid>
                            <Grid item xs={6}>
                                <img width={"60%"} className={styles.image}
                                    src="./image_card.jpg"
                                />
                            </Grid>
                        </Grid>
                        <button className={styles.button}>Voir la carte</button>
                    </Container>
                </Box>
            </RootRef>
        </AppLayout>
    )
}

export default Index