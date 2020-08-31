import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React, {useState} from "react";
import {makeStyles,fade} from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {white} from "color-name";

import Carousel from 'react-elastic-carousel'
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
        fontSize:"2em",
        fontFamily: 'rowdies',
    },
        threePointGrid:
            {

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
        fontFamily: 'rowdies',
    },

    buttonGrid:{
        margin:  "2.5em 0 2.5em 0 ",
        "color":"white",
        "background-color":"#bf083e",
        border: "none",
        fontWeight: 600,
        fontFamily: 'rowdies',
        borderRadius: "1.5em",
        padding: "0 3em 0 3em",
        height: "1.7em",
        "&:hover": {
            cursor: "pointer",
        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "8px",
        "background-position-y": "-1px",
    },

    button:{
        "color":"white",
        "background-color":"#bf083e",
        border: "none",
        fontWeight: 600,
        fontFamily: 'rowdies',
        borderRadius: "1.5em",
        padding: "0 3em 0 3em",
        height: "1.7em",
        "&:hover": {
            cursor: "pointer",
        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "8px",
        "background-position-y": "-1px",
        marginBottom:"30px"

    },
    footer: {
        "color": "white",
        "background-color": "#2a9076",
        border: "none",
        height: "30em",
        textAlign: "center",
        paddingTop:"3em"
    },
    footerTitle: {

        align: "center",
        fontWeight: 700,
    },
    footerSubTitle: {
        fontWeight: 50,
        fontSize: "9px",
    },
    gridItem:{
        "background-color": "#f9f9f9",
        margin:"12px",
        padding:"10px"
    },
    imageGrid:{
        paddingTop:"30px",
        paddingBottom:"20px"
    },
    titleGrid:{
        "color":"#2a9076",
        fontWeight: 700,
        fontSize:"12px",
        lineHeight:"inherit"
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

                        <Grid container spacing={3} >
                            <Grid item xs={6}c lassName={styles.threePointGrid}>
                                <div  className={[styles.align]}>
                                    <Typography variant="h5"   className={styles.cardTitle}  >
                                        #NAME
                                    </Typography>
                                    <Typography variant="h5"   className={styles.cardTitle}  >
                                        EN 3 POINTS
                                    </Typography>
                                </div>
                                blablabla
                            </Grid>

                            <Grid item xs={6} className={styles.align}>
                                <img width={"60%"} className={styles.image}
                                    src="./image_card.jpg"
                                />
                            </Grid>
                        </Grid>
                        <button className={styles.button}>VOIR LA CARTE</button>

                        <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                            #NAME
                        </Typography>
                        <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                           C'EST POUR QUI ?
                        </Typography>
                        <Typography  className={[styles.align]} >
                            qsdqsdqsdqsdsqdsqdqsd
                        </Typography>
                        <Grid container justify="center"  className={styles.align}>
                            <Grid item xs={5} className={[styles.gridItem,styles.align]}>
                                <img width={"20%"}
                                     src="./people.svg" className={styles.imageGrid}
                                />
                                <Typography className={styles.titleGrid}  >
                                    Vous êtes un citoyen et souhaitez mieux
                                </Typography>
                                <Typography className={styles.titleGrid}  >
                                    connaire, soutenir, vous engager ?
                                </Typography>

                                <button className={styles.buttonGrid} >JE DECOUVRE LES ACTEURS</button>
                            </Grid>
                            <Grid item xs={5} className={[styles.gridItem,styles.align]}>
                                <img width={"20%"} className={styles.imageGrid}
                                     src="./organisation.svg"
                                />
                                <Typography className={styles.titleGrid}  >
                                    Vous êtes une organisation et vous
                                </Typography>
                                <Typography className={styles.titleGrid}  >
                                    souhaitez vous faire connaitre ?
                                </Typography>

                                <button className={styles.buttonGrid} >JE DEVIENS UN ACTEUR</button>

                            </Grid>
                        </Grid>


                    </Container>
                    <Container>
                        <Carousel itemPadding={[5, 20]} itemsToShow={3}>
                            <img src="https://brainhubeu.github.io/react-carousel/static/scream-ee207a05c1e6fed03aafa156cc511abe.jpg" />
                            <img src="https://brainhubeu.github.io/react-carousel/static/scream-ee207a05c1e6fed03aafa156cc511abe.jpg" />
                            <img src="https://brainhubeu.github.io/react-carousel/static/scream-ee207a05c1e6fed03aafa156cc511abe.jpg" />

                        </Carousel>
                    </Container>
                    <Container    className={styles.footer}>
                        <Typography variant="h5"  className={styles.footerTitle}  >
                            RESTONS CONNECTES!
                        </Typography>
                        <Typography variant="h6"  className={styles.footerSubTitle}  >
                            Suivez nos aventures sur les réseaux sociaux :
                        </Typography>
                    </Container>
                </Box>

            </RootRef>
        </AppLayout>
    )
}

export default Index