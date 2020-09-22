import React from "react"
import AppLayout from "containers/layouts/AppLayout"
import AppContainer from "containers/layouts/AppContainer"
import {
    Grid,
    Typography,
    makeStyles,
    Box,
    Chip,
    Container,
    Button,
    Divider,
    Avatar,
    RootRef,
} from "@material-ui/core"
import RoomIcon from "@material-ui/icons/Room"
import { DatePicker } from "@material-ui/pickers"
import { useState, useEffect } from "react"
import ClassicButton from "components/buttons/ClassicButton"
import DividerCustom from "components/Divider"
import { withApollo } from "hoc/withApollo.jsx"
import {useRouter} from "next/router";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Place from '@material-ui/icons/Place';
import Phone from '@material-ui/icons/Phone';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Language from '@material-ui/icons/Language';
import Schedule from '@material-ui/icons/Schedule';
import Paper from "@material-ui/core/Paper";
import CardSlider from "../../components/cards/CardSlider";
import Slider from "react-slick/lib";
import Newsletter from "../../containers/layouts/Newsletter";
import Link from "../../components/Link";

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
    }





}))
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
const Actor = () => {

    const router = useRouter()
    const { id } = router.query
    const [eventToRender, setEventToRender] = useState(null);
    const {data:eventData,loading:loadingEvent,error:errorEvent} = useQuery(
        GET_EVENTS,
        {
            variables : {
                limit :  '3'
            },
            // fetchPolicy : "no-cache"
        }
    );
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
                
                Categories{
                    label,
                    parentCategory{
                        label
                    },
                    subCategories{
                        label
                    }
                }
            }
        }
    `;

    const {data,loading,error} = useQuery(GET_ACTOR,
        {
            variables : {
                id
            },
            // fetchPolicy : "no-cache"
        }
    );
    useEffect(() => {

        setEventToRender({
            eventData
        });


    },[eventData]);

    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const styles = useStyles(stylesProps)

    const headerRef = React.useRef()
    const settingsSliderImage = {

        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        //  pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const settingsSliderevent = {

        infinite: true,
        slidesToShow: 5,
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
                                        {data && data.actor.Categories && data.actor.Categories.length>0 && data.actor.Categories[0].parentCategory.label} : {data && data.actor.Categories && data.actor.Categories.length>0 && data.actor.Categories[0].label}
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

                        <div>

                            <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                                LES EVENEMENTS
                            </Typography>
                            <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                                de {data && data.actor.name}
                            </Typography>
                        </div>
                        <Slider {...settingsSliderevent} className={[styles.articleCarroussel]} >
                            {eventToRender?.eventData &&  eventToRender.eventData.events.map((event) => {
                                return (
                                        <CardSlider
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
