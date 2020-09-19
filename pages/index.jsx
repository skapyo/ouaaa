import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React, {useState,useEffect} from "react";
import {makeStyles,fade} from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {white} from "color-name";
import Slider from "react-slick";
import Carousel from 'react-elastic-carousel'
import CardSlider from "components/cards/CardSlider"
import CardSliderActor from "components/cards/CardSliderActor"
import gql from "graphql-tag"
import { withApollo } from "hoc/withApollo"
import {useMutation, useQuery} from "@apollo/react-hooks";
import Link from "../components/Link";
import Newsletter from "../containers/layouts/Newsletter";


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
        width:"100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 4),
        // vertical padding + font size from searchIcon

        transition: theme.transitions.create('width')
    },
    titleContainer: {
        marginTop : theme.spacing(2),
        backgroundImage:`url('./fond.jpeg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
         backgroundImage:`url('/icons/planet.svg')`,
         backgroundSize:"30%",
         backgroundPosition: 'right',
         backgroundRepeat: 'no-repeat',
         backgroundOpacity: ' 0.5',
         backgroundPositionY: '226px',
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
        "color":theme.typography.h5.color,
        fontFamily: theme.typography.h5.fontFamily,
    },

    buttonGrid:{
        margin:  "2.5em 0 2.5em 0 ",
        "color":"white",
        "background-color":"#bf083e",
        border: "none",
        fontFamily: 'rowdies',
        borderRadius: "1.5em",
        padding: "0 3em 0 3em",
        height: "2.5em",
        "&:hover": {
            cursor: "pointer",
        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "5px",
        "background-position-y": "1px",
        "background-size": "11%",
    },

    button:{
        margin:  "2.5em 0 2.5em 0 ",
        "color":"white",
        "background-color":"#bf083e",
        border: "none",
        fontFamily: 'rowdies',
        borderRadius: "1.5em",
        padding: "0 3em 0 3em",
        height: "2.5em",
        "&:hover": {
            cursor: "pointer",
        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "5px",
        "background-position-y": "1px",
        "background-size": "15%",
        marginBottom:"30px"

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
        fontSize:"12px",
        lineHeight:"inherit"
    },
    article:{
       paddingTop :"5em",
        paddingBottom :"5em",
        textAlign: "center"
    },
    articleCarroussel:{
        paddingTop :"2em",
    },
    buttonArticle:{
        paddingTop :"1em",
        paddingBottom :"1em"
    },
    event:{
        paddingTop :"5em",
        paddingBottom :"5em",
        textAlign: "center",
        backgroundColor:"#e8f4f2",
        backgroundImage:`url('/icons/calendar-home.svg')`,
        backgroundSize:"30%",
        backgroundPosition: 'right',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundOpacity: ' 0.5',

    },
    geoContainer:{
        paddingTop :"5em",
        paddingBottom :"5em",
        textAlign: "center",
        backgroundColor:"#e8f4f2"
    },
}))
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
        />
    );
}
const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
   // autoplay: true,
   // autoplaySpeed: 2000,
  //  pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};
const GET_EVENTS = gql`
    query events($limit:String) {
        events(limit:$limit) {
            id,
            label,
            shortDescription,
            description,
            startedAt,
            endedAt,
            published
        }
    }
`;

const GET_ACTORS = gql`
    { actors
    {   id,
        name,
        address,
        lat,
        lng,
        Categories{
            label
        }
    }
    }
`;




const Index = () => {
    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const styles = useStyles(stylesProps)
    const [articleToRender, setArticleToRender] = useState(null);
    const [eventToRender, setEventToRender] = useState(null);
    const [actorToRender, setActorToRender] = useState(null);

    const {data:eventData,loading:loadingEvent,error:errorEvent} = useQuery(
        GET_EVENTS,
        {
            variables : {
                limit :  '3'
            },
            // fetchPolicy : "no-cache"
        }
    );
    const {data:actorData,loading:loadingActor,error:errorActor} = useQuery(GET_ACTORS, {
        variables: {
            limit: '3'
        }
    });

    useEffect(() => {

        setEventToRender({
            eventData
        });


    },[eventData]);
    useEffect(() => {

        setActorToRender({
            actorData
            });


    },[actorData]);


    return (
        <AppLayout>
            <RootRef >
                <Box>
                    <Container className={styles.titleContainer} >
                        <Typography className={styles.titleTypo} >
                           OUtils des Acteurs
                        </Typography>
                        <Typography className={styles.titleTypo} >
                          Alternatifs en AUNIS
                        </Typography>
                        <Typography className={styles.align} >
                            Notre mission c'est de faire connaître celles et ceux qui œuvrent  <br />pour la transition écologique, sociale et démocratique en Aunis
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
                                        Ouaaa
                                    </Typography>
                                    <Typography variant="h5"   className={styles.cardTitle}  >
                                        EN 3 POINTS
                                    </Typography>
                                </div>
                                <p>1 Issu du milieu associatif : Le site est né de la volonté de 3 collectifs (Collectif Transition Citoyenne, Collectif Action Solidaire et Tiers Lieux la Proue) de disposer d’une vitrine pour se faire connaître, et disposer d’un agenda réactif pour publier leurs évènements.</p>
                                <p>2 Créé pour et par les acteurs de la transition : Le site a été créé sur mesure par une équipe de bénévoles motivés, il permet aux acteurs de la transition eux-mêmes de renseigner leurs informations. Il sera adossé à une rencontre physique régulière, afin que virtuel et réel se complètent.*</p>
                                    <p> 3 Catalyseur de transition : nous pensons qu’en faisant connaître les acteurs de la transition du grand public et en renforçant les liens entre eux, nous allons accélérer la nécessaire transition de notre territoire vers un fonctionnement plus sobre, plus humain et véritablement « durable »</p>
                            </Grid>

                            <Grid item xs={6} className={styles.align}>
                                <img width={"60%"} className={styles.image}
                                    src="./image_card.jpg"
                                />
                            </Grid>
                        </Grid>
                        <Link  href="/map">
                        <button className={styles.button}>VOIR LA CARTE</button>
                        </Link>
                        <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                            Ouaaa
                        </Typography>
                        <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                           C'EST POUR QUI ?
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
                                <Link  href="/map">
                                  <button className={styles.buttonGrid} >JE DECOUVRE LES ACTEURS
                                </button>
                                </Link>
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
                                <Link  href="/addactor">
                                    <button className={styles.buttonGrid} >JE DEVIENS UN ACTEUR</button>
                                </Link>
                            </Grid>
                        </Grid>


                    </Container>
                    <Container className={[styles.geoContainer]}>
                        <Typography  className={[styles.align]}  >
                            Le site a vocation à répertorier les acteurs de la transition sur les 3 communautés de communes constituant l'Aunis : la CDA de la Rochelle, la CDC Aunis Atlantique et la CDC Aunis Sud.
                            Ainsi, l’information sera disponible aussi bien pour les habitants des zones les plus urbaines (La Rochelle et sa première couronne (Aytré, Lagord, Périgny, Angoulins), Chatelaillon, Surgères, Marans, Courçon, Aigrefeuille que pour ceux des zones les plus rurales : Clavette, St Médard, Puyravault, Ballons, le Thou, Chambon, Ballon, , St Saturnin du Bois, St Jean de Liversay, Benon.
                        </Typography>
                    </Container>
                    <Container className={[styles.article]}>
                        <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                            LES ACTEURS RECEMMENTS AJOUTES
                        </Typography>

                        <Slider {...settings} className={[styles.articleCarroussel]} >
                            {actorToRender?.actorData &&  actorToRender.actorData.actors.map((actor) => {
                                return (

                                    <CardSliderActor

                                        key={actor.id}
                                        actor={actor}
                                    />
                                );
                            })}

                        </Slider>
                        <div className={styles.buttonArticle} >
                            <button className={styles.buttonGrid}  >VOIR TOUT LES ARTICLES</button>
                        </div>
                    </Container>

                    <Container className={[styles.event]}>
                        <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                            LES EVENEMENTS RECENTS
                        </Typography>
                        <Slider {...settings} className={[styles.articleCarroussel]} >
                            {eventToRender?.eventData &&  eventToRender.eventData.events.map((event) => {
                                return (
                                        <CardSlider
                                            key={event.id}
                                            event={event}
                                        />
                                );
                            })}
                        </Slider>
                        <div className={styles.buttonArticle} >
                            <button className={styles.buttonGrid}  >VOIR TOUT LES ARTICLES</button>
                        </div>
                    </Container>
                    <Newsletter />
                </Box>

            </RootRef>
        </AppLayout>
    )
}

export default  withApollo()(Index)