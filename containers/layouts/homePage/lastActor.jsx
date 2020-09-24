import {Container, makeStyles, Typography} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import Slider from "react-slick/lib";
import CardSliderActor from "../../../components/cards/CardSliderActor";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import {withApollo} from "../../../hoc/withApollo";

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
    },
}))




const LastActor = () => {

    const GET_ACTORS = gql`
        { actors
        {   id,
            name,
            address,
            lat,
            lng,
            categories{
                label
            }
        }
        }
    `;
    const [actorToRender, setActorToRender] = useState(null);

    const {data:actorData,loading:loadingActor,error:errorActor} = useQuery(GET_ACTORS, {
        variables: {
            limit: '3'
        }
    });

    useEffect(() => {

        setActorToRender({
            actorData
        });


    },[actorData]);

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
        slidesToShow: actorToRender?.actorData &&  actorToRender.actorData.actors.length>5?5:actorToRender?.actorData &&  actorToRender.actorData.actors.length,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        //  pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
  return (
      <Container className={[styles.actorContainer]}>
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

  )
}

export default  withApollo()(LastActor)