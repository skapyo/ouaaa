import {Container, Grid, makeStyles, Typography} from '@material-ui/core';
import React from "react";
import Link from "../../../components/Link";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
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
    ,

    inprogress:{
        color:"#bf083e",
        textAlign: "center",
        padding: "2em",
        fontSize: "2em",

    },
    align: {
        "text-align": "center"
    },
    cardTitle:{
        "color":theme.typography.h5.color,
        fontFamily: theme.typography.h5.fontFamily,
    },
    image: {
        "box-shadow": "11px 11px 13px -3px rgba(0, 0, 0, 0.46)",
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
    },   button:{
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

    },titleGrid:{
        "color":"#2a9076",
        fontSize:"12px",
        lineHeight:"inherit"
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}))

const PresentationSection = () => {

  const styles = useStyles()

  return (
      <Container   className={styles.cardInfo}
          >
          <Typography className={styles.inprogress} >
              Site en cours de développement.
              <p>Abonnez vous à la newsletter pour suivre les avancées.</p>
          </Typography>
          <Grid container spacing={3} >
              <Grid item xs={6}>
                  <div  className={[styles.align]}>
                      <Typography variant="h5"   className={styles.cardTitle}  >
                          Ouaaa
                      </Typography>
                      <Typography variant="h5"   className={styles.cardTitle}  >
                          EN 3 POINTS
                      </Typography>
                  </div>
                  <List className={styles.root}>
                      <ListItem>
                          <ListItemText primary="Issu du milieu associatif : Le site est né de la volonté de 3 collectifs (Collectif Transition Citoyenne, Collectif Action Solidaire et Tiers Lieux la Proue) de disposer d’une vitrine pour se faire connaître, et disposer d’un agenda réactif pour publier leurs évènements."  />
                      </ListItem>
                      <ListItem>
                          <ListItemText primary="Créé pour et par les acteurs de la transition : Le site a été créé sur mesure par une équipe de bénévoles motivés, il permet aux acteurs de la transition de renseigner eux-mêmes leurs informations. Il sera adossé à une rencontre physique régulière, afin que virtuel et réel se complètent."/>
                      </ListItem>
                      <ListItem>
                          <ListItemText primary="Catalyseur de transition : nous pensons qu’en faisant connaître les acteurs de la transition du grand public et en renforçant les liens entre eux, nous allons accélérer la nécessaire transition de notre territoire vers un fonctionnement plus sobre, plus humain et véritablement « durable »"/>
                      </ListItem>
                  </List>

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

  )
}

export default PresentationSection