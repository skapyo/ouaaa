import React, {useEffect, useState} from "react"
import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, Grid, makeStyles, RootRef, Typography,} from "@material-ui/core"
import {withApollo} from "hoc/withApollo.jsx"
import {useRouter} from "next/router";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Place from '@material-ui/icons/Place';
import Phone from '@material-ui/icons/Phone';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Language from '@material-ui/icons/Language';
import Schedule from '@material-ui/icons/Schedule';
import CardSliderEvent from "../../components/cards/CardSliderEvent";
import Slider from "react-slick/lib";
import Newsletter from "../../containers/layouts/Newsletter";
import {useSnackbar} from "notistack";
import {useSessionState} from "../../context/session/session";
import {useCookies} from "react-cookie";

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        marginTop : theme.spacing(2),
        backgroundImage:`url('/860_potager_de_la_jarne.jpg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '24em',
        color: 'white',
        "text-align": "center",
        padding :'3em',

    },
    align:{
        "text-align": "center",
    },
    cardInfo: {
        "padding": "5em",
        backgroundColor:"white",
        backgroundImage:`url('/icons/planet.svg')`,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundOpacity: ' 0.5',
        //  backgroundImage:`url('./fond.png')`,
        borderRadius: "0.5em",
        width:"80%",
        justify:"center",
        alignItems: "center",
        "max-width": '755px',
        "margin-top": '-53px',
        "box-shadow": "0px 0px 38px -14px rgba(0, 0, 0, 0.46)",
    },
    cardTitle:{
        "color":theme.typography.h5.color,
        fontFamily: theme.typography.h5.fontFamily,
        textTransform: "uppercase",
    },
    cardTitleCategories:{
        "color":theme.typography.h5.color,
    },
    infoValue:{
        "color":theme.typography.h5.color,
        fontWeight:700,
        wordBreak: "break-all",
    },
    infoLabel:{
        "color":theme.typography.h5.color,
    },
    infoPratiqueGrid:{
        textAlign:"center",

    },
    infoPratiqueTitle:{
        backgroundColor: "#2a9076",
        color:"white",
        width:"100%",
        padding:"1em"
    },
    infoPratiqueItem:{

    },
    alignLeft:{
        textAlign: "left",
        padding:"1em"
    },
    alignRight:{
        textAlign: "right",
        padding:"1em"
    },
    item:{

        border: "1px solid #2a9076",
        borderStyle: "dashed"
    },
    icon:{
        color:"#bd0b3d"
    },
    img:{
        padding:"1em"
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
            "color":"#bf083e",
            "background-color":"white",
        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "5px",
        "background-position-y": "1px",
        "background-size": "11%",
    },
    buttonInverse:{
        margin:  "2.5em 0 2.5em 0 ",
        "color":"#bf083e",
        "background-color":"white",
        border: "none",
        fontFamily: 'rowdies',
        borderRadius: "1.5em",
        padding: "0 3em 0 3em",
        height: "2.5em",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "line-through",
            "color":"white",
            "background-color":"#bf083e",

        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "5px",
        "background-position-y": "1px",
        "background-size": "11%",
    },
    buttonVolunteer:{
        paddingTop :"1em",
        paddingBottom :"1em",
        textAlign: "center",
    },





}))

const Actor = () => {

    const router = useRouter()
    const { id } = router.query
    const [eventToRender, setEventToRender] = useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [cookies, setCookie, removeCookie] = useCookies();
    const GET_ACTOR = gql`
        query actor($id:String) {
            actor(id:$id) {
                id,
                name,
                address,
                lat,
                lng,
                address,
                city,
                email,
                phone,
                website,
                description,
                
                categories{
                    label,
                    parentCategory{
                        label
                    },
                    subCategories{
                        label
                    }
                },
                events {
                    id,
                    label,
                    shortDescription,
                    description,
                    startedAt,
                    endedAt,
                    published
                },
                volunteers {  
                    id,
                    surname,
                    lastname,

                }
            }
        }
    `;

    const ADD_ACTOR_VOLUNTEER = gql`
        mutation addActorVolunteer ($actorId:Int!,$userId: Int!) {
            addActorVolunteer(actorId:$actorId,userId:$userId)
        }
    `;
    const REMOVE_ACTOR_VOLUNTEER  = gql`
        mutation removeActorVolunteer ($actorId:Int!,$userId: Int!) {
            removeActorVolunteer(actorId:$actorId,userId:$userId)
        }
    `;
    const {data,loading,error,refetch} = useQuery(GET_ACTOR,
        {
            variables : {
                id
            },
            // fetchPolicy : "no-cache"
        }
    );

    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const styles = useStyles(stylesProps)


    const [addVolunteer,{data:volunteerData,loading:volunteerLoading,error:volunteerError}] = useMutation(
        ADD_ACTOR_VOLUNTEER
    );
    const [removeVolunteer,{data:removevolunteerData,loading:removevolunteerLoading,error:removevolunteerError}] = useMutation(
        REMOVE_ACTOR_VOLUNTEER
    );


    useEffect(() => {
        if(volunteerData!==undefined) {
            enqueueSnackbar("Demande de bénévole prise en compte", {
                preventDuplicate: true,
            })
            refetch();
        }

    },[volunteerData]);

    useEffect(() => {
        if(removevolunteerData!==undefined) {
            enqueueSnackbar("Suppression de la demande de bénévole", {
                preventDuplicate: true,
            })
            refetch();
        }

    },[removevolunteerData]);

    const user = useSessionState()
    function containUser(list) {
        let isContained = false
        if(user!==null) {
            list.forEach(element => {
                if (element.id ==user.id){
                    isContained= true
                }
            });
        }
        return isContained
    }

    const addVolunteerHandler = () => {

        if(user == null) {
            setCookie('redirect_url', router.asPath, { path: '/actor/'+ data && data.actor.id})
            enqueueSnackbar("Veuillez vous connecter pour devenir bénévole", {
                preventDuplicate: true,
            })
        }else{
            addVolunteer({variables:{actorId: parseInt(data && data.actor.id),userId:parseInt(user.id)}})
        }


    };

    const removeVolunteerHandler = () => {
        removeVolunteer({variables:{actorId: parseInt(data && data.actor.id),userId:parseInt(user.id)}})
    };
    const headerRef = React.useRef()
    const settingsSliderImage = {

        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        //  pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const settingsSliderevent = {

        infinite: true,
        slidesToShow: data &&  data.actor.events && data.actor.events.length>5?5:data && data.actor.events&&  data.actor.events.length,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        //  pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
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

    return (
        <AppLayout>
            <RootRef >
                <Box>
                    <Container className={styles.titleContainer} >
                    </Container>

                    < Container  className={styles.cardInfo} >

                        <Grid container spacing={3} >
                            <Grid item xs={8} className={styles.threePointGrid}>
                                <div  >
                                    <Typography variant="h5"   className={styles.cardTitle}  >
                                        {data && data.actor.name}
                                    </Typography>
                                    <Typography variant="h7"   className={styles.cardTitleCategories}  >
                                        {data && data.actor.categories && data.actor.categories.length>0 && data.actor.categories[0].parentCategory && data.actor.categories[0].parentCategory.label} : {data && data.actor.categories && data.actor.categories.length>0 && data.actor.categories[0]&& data.actor.categories[0].label}
                                    </Typography>
                                </div>
                                <p>{data && data.actor.description}</p>
                                <div  >

                                </div>
                            </Grid>

                            <Grid xs={3} className={[styles.align]}>
                                <Grid container  className={[styles.infoPratiqueGrid]}>
                                    <Typography variant="h7"   className={[styles.infoPratiqueTitle,styles.infoPratiqueItem]}  >
                                        INFOS PRATIQUES
                                    </Typography>
                                    <Grid container   className={[styles.item]} >
                                        <Grid item xs={3} className={[styles.alignRight]}>
                                            <Place className={[styles.icon]}/>
                                        </Grid>
                                        <Grid item xs={8} className={[styles.alignLeft]}>
                                            <div className={[styles.infoLabel]}>LOCALISATION </div>
                                            <span className={[styles.infoValue]}>{data && !data.actor.city && <span> Adresse manquante</span>}
                                            {data && !data.actor.address && data.actor.city && <span> {data &&data.actor.city}</span>}
                                            {data && data.actor.address && data.actor.city && <span> {data &&data.actor.address}, {data && data.actor.city}</span>}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={[styles.item]} >
                                        <Grid item xs={3} className={[styles.alignRight]}>
                                            <Phone className={[styles.icon]}/>
                                        </Grid>
                                        <Grid item xs={8} className={[styles.alignLeft]}>
                                            <div className={[styles.infoLabel]}>TELEPHONE</div>
                                            <span className={[styles.infoValue]}>{data && data.actor.phone}</span>
                                            </Grid>
                                    </Grid>
                                    <Grid container className={[styles.item]} >
                                        <Grid item xs={3} className={[styles.alignRight]}>
                                            <AlternateEmail className={[styles.icon]}/>
                                        </Grid>
                                        <Grid item xs={8} className={[styles.alignLeft]}>
                                            <div className={[styles.infoLabel]}>Email</div>
                                            <span className={[styles.infoValue]}>{data && data.actor.email}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={[styles.item]} >
                                        <Grid item xs={3} className={[styles.alignRight]}>
                                            <Language className={[styles.icon]}/>
                                        </Grid>
                                        <Grid item xs={8} className={[styles.alignLeft]}>
                                            <div className={[styles.infoLabel]}>SITE INTERNET</div>
                                            <span className={[styles.infoValue]}>{data && data.actor.website}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={[styles.item]} >
                                        <Grid item xs={3} className={[styles.alignRight]}>
                                            <Schedule className={[styles.icon]}/>
                                        </Grid>
                                        <Grid item xs={8} className={[styles.alignLeft]}>
                                            <div className={[styles.infoLabel]}>HORAIRE</div>
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>

                        <div  >
                            <Typography variant="h5"   className={styles.cardTitle}  >
                                PHOTO ET VIDEOS
                            </Typography>

                        </div>
                        <Slider {...settingsSliderImage} >
                            <img src="/image/potager_jarne_slider1.jpg" className={[styles.img]}/>
                            <img src="/image/potager_jarne_slider2.jpg"  className={[styles.img]}/>
                            <img src="/image/potager_jarne_slider3.jpg"  className={[styles.img]}/>
                        </Slider>
                        <div className={styles.buttonVolunteer} >
                        {data && containUser(data.actor.volunteers)&& (
                            <button className={styles.buttonInverse} onClick={removeVolunteerHandler}  >Je ne souhaite plus être bénévole</button>
                        )}
                        {!(data && containUser(data.actor.volunteers))&& (
                            <button className={styles.button} onClick={addVolunteerHandler}  >Devenir bénévole</button>
                        )}

                    </div>
                        <div>

                            <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                                LES EVENEMENTS
                            </Typography>
                            <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                                de {data && data.actor.name}
                            </Typography>
                        </div>
                        <Slider {...settingsSliderevent} className={[styles.articleCarroussel]} >
                            {data && data.actor.events && data.actor.events.map((event) => {
                                return (
                                        <CardSliderEvent
                                            key={event.id}
                                            event={event}
                                        />
                                );
                            })}
                        </Slider>


                    </Container>
                    <Newsletter />

                </Box>
            </RootRef>
        </AppLayout>
    )
}

// export default withListener(Actor)
export default withApollo()(Actor)
// export async function getServerSideProps(context) {
//     console.log(context.req.headers.cookie)
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
