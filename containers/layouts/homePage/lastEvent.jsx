import {Container, makeStyles, Typography} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import Slider from "react-slick/lib";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import {withApollo} from "../../../hoc/withApollo";
import CardSliderEvent from "../../../components/cards/CardSliderEvent";

const useStyles = makeStyles((theme) => ({
    cardTitle:{
        "color":theme.typography.h5.color,
        fontFamily: theme.typography.h5.fontFamily,
    },align: {
        "text-align": "center"
    },
    actorContainer:{
        paddingTop :"5em",
        paddingBottom :"5em",
        textAlign: "center"
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
    articleCarroussel:{
        paddingTop :"2em",
    },
    buttonArticle:{
        paddingTop :"1em",
        paddingBottom :"1em"
    },event:{
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
}))




const LastActor = () => {

    const GET_EVENTS = gql`
        query events {
            events {
                id,
                label,
                shortDescription,
                description,
                startedAt,
                endedAt,
                published,
                categories{
                    id
                    label
                    icon
                    color
                }
            }
        }
    `;
    const [eventToRender, setEventToRender] = useState(null);

    const {data:eventData,loading:loadingEvent,error:errorEvent} = useQuery(
        GET_EVENTS,
        {

            // fetchPolicy : "no-cache"
        }
    );


    useEffect(() => {

        setEventToRender({
            eventData
        });


    },[eventData]);


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


  const styles = useStyles()
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: eventToRender?.eventData &&  eventToRender.eventData.events.length>5?5:eventToRender?.eventData &&  eventToRender.eventData.events.length,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        //  pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
  return (
          <Container className={[styles.event]}>
              <Typography variant="h5"   className={[styles.cardTitle,styles.align]}  >
                  LES EVENEMENTS RECENTS
              </Typography>
              <Slider {...settings} className={[styles.articleCarroussel]} >
                  {eventToRender?.eventData &&  eventToRender.eventData.events.map((event) => {
                      return (
                          <CardSliderEvent
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

  )
}

export default  withApollo()(LastActor)