import React, {useEffect, useState} from "react"
import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, Grid, makeStyles, RootRef, Typography,} from "@material-ui/core"
import {withApollo} from "hoc/withApollo.jsx"
import {useRouter} from "next/router";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Place from '@material-ui/icons/Place';
import Schedule from '@material-ui/icons/Schedule';
import Slider from "react-slick/lib";
import Newsletter from "../../containers/layouts/Newsletter";
import CardSliderActor from "components/cards/CardSliderActor"

import Moment from "react-moment";
import {useSessionState} from "../../context/session/session";
import {useCookies} from "react-cookie";
import {useSnackbar} from "notistack";
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        marginTop : theme.spacing(2),
        backgroundImage:`url('/image/alternatiba.jpg')`,
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
    } ,   infoValue:{
        "color":theme.typography.h5.color,
        fontWeight:700,
    },
    infoLabel:{
        "color":theme.typography.h5.color,
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
        fontSize:"1.2em",
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
        fontSize:"1.2em",
    },
    buttonParticipate:{
        paddingTop :"1em",
        paddingBottom :"1em",
        textAlign: "center",
    },



}))

const Event = () => {

    const router = useRouter()
    const { id } = router.query



    const GET_EVENT = gql`
        query event($id:String) {
            event(id:$id) {
                id,
                label,
                description,
                lat,
                lng,
                address,
                city,
                startedAt,
                endedAt,
                categories{
                    label,
                    parentCategory{
                        label
                    },
                    subCategories{
                        label
                    }
                },
                actors {   id,
                    name,
                    address,
                    lat,
                    lng,
                    categories{
                        label
                    }
                },
                participants {   id,
                    surname,
                    lastname,

                }
                
            }
        }
    `;
    const ADD_EVENT_PARTICIPATE = gql`
        mutation addEventParticipate ($eventId:Int!,$userId: Int!) {
            addEventParticipate(eventId:$eventId,userId:$userId)
        }
    `;
    const REMOVE_EVENT_PARTICIPATE = gql`
        mutation removeEventParticipate ($eventId:Int!,$userId: Int!) {
            removeEventParticipate(eventId:$eventId,userId:$userId)
        }
    `;
    const {data,loading,error,refetch} = useQuery(GET_EVENT,
        {
            variables : {
                id
            },
        }
    );

    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })


    const [addParticipate,{data:participateData,loading:participateLoading,error:participateError}] = useMutation(
        ADD_EVENT_PARTICIPATE
    );
    const [removeParticipate,{data:removeparticipateData,loading:removeparticipateLoading,error:removeparticipateError}] = useMutation(
        REMOVE_EVENT_PARTICIPATE
    );


    useEffect(() => {
        if(participateData!==undefined) {
            enqueueSnackbar("Participation prise en compte", {
                preventDuplicate: true,
            })
            refetch();
        }

    },[participateData]);

    useEffect(() => {
        if(removeparticipateData!==undefined) {
            enqueueSnackbar("Participation retiré", {
                preventDuplicate: true,
            })
            refetch();
        }

    },[removeparticipateData]);

    const user = useSessionState()
    const [cookies, setCookie, removeCookie] = useCookies();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

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

    const addParticipateHandler = () => {

        if(user == null) {
            setCookie('redirect_url', router.asPath, { path: '/event/'+ data.event.id})
            enqueueSnackbar("Veuillez vous connecter pour participer à l'événement", {
                preventDuplicate: true,
            })
        }else{
            addParticipate({variables:{eventId: parseInt(data && data.event.id),userId:parseInt(user.id)}})
        }


    };

    const removeParticipateHandler = () => {
            removeParticipate({variables:{eventId: parseInt(data && data.event.id),userId:parseInt(user.id)}})
    };

    const styles = useStyles(stylesProps)

    const settingsSliderevent = {

        infinite: true,
        slidesToShow: data &&  data.event.actors.length>5?5:data &&  data.event.actors.length,
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
            <Head>
                <title>  {data && data.event.label}- {data && data.event.city} - {data && data.event.categories.map((category) => {
                    return(category.parentCategory && category.parentCategory.label +" : "+category.label + "  ")
                })}</title>
            </Head>
            <RootRef >
                <Box>
                    <Container className={styles.titleContainer} >
                    </Container>

                    < Container  className={styles.cardInfo}>

                        <Grid container spacing={3} >
                            <Grid item xs={8} className={styles.threePointGrid}>
                                <div  >
                                    <Typography variant="h5"   className={styles.cardTitle}  >
                                        {data && data.event.label}
                                    </Typography>
                                        {data && data.event.categories.map((category) => {
                                            return(<div><Typography variant="h7"
                                                        className={styles.cardTitleCategories}> {category.parentCategory
                                                && category.parentCategory.label} : {category &&
                                                category.label} </Typography></div>
                                            )
                                        })}

                                </div>
                                <p>{data && data.event.description}</p>
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
                                            <div className={[styles.infoLabel]}>LOCALISATION</div>
                                            <span className={[styles.infoValue]}>{data && !data.event.city && <span> Adresse manquante</span>}
                                                {data && !data.event.address && data.event.city && <span> {data && data.event.city}</span>}
                                                {data && data.event.address && data.event.city && <span> {data && data.event.address}, {data.event.city}</span>}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={[styles.item]} >
                                        <Grid item xs={3} className={[styles.alignRight]}>
                                            <Schedule className={[styles.icon]}/>
                                        </Grid>
                                        <Grid item xs={8} className={[styles.alignLeft]}>
                                            <div className={[styles.infoLabel]} >Date</div>
                                            <span className={[styles.infoValue]}>
                                            De
                                            <Moment format=" HH" unix>{data && data.event.startedAt/1000}</Moment>
                                            h
                                            <Moment format="mm " unix>{data && data.event.startedAt/1000}</Moment>
                                            à
                                            <Moment format=" HH" unix>{data && data.event.endedAt/1000}</Moment>
                                            h
                                            <Moment format="mm " unix>{data && data.event.endedAt/1000}</Moment></span>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <div className={styles.buttonParticipate} >
                            {data && containUser(data.event.participants)&& (
                                <button className={styles.buttonInverse} onClick={removeParticipateHandler}  >Je ne participe plus</button>
                            )}
                            {!(data && containUser(data.event.participants))&& (
                                <button className={styles.button} onClick={addParticipateHandler}  >Je participe</button>
                            )}

                        </div>
                        <div>

                            <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                                LES ACTEURS PARTICIPANTS
                            </Typography>
                        </div>
                        <Slider {...settingsSliderevent} className={[styles.articleCarroussel]} >

                            {data && data.event.actors.map((actor) => {
                                return (

                                    <CardSliderActor
                                        key={actor.id}
                                        actor={actor}
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
export default withApollo()(Event)
// export async function getServerSideProps(context) {
//     console.log(context.req.headers.cookie)
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
