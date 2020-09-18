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
    }





}))

const Actor = () => {

  const router = useRouter()
  const { id } = router.query


    const GET_ACTOR = gql`
      query actor($id:String) {
        actor(id:$id) {
          id,
          name,
          address,
          lat,
          lng,
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

  const [stylesProps, setStylesProps] = useState({
    topImageSize: "250px",
    headerDisplay: "static",
  })
  const styles = useStyles(stylesProps)

  const headerRef = React.useRef()



  return (
      <AppLayout>
          <RootRef >
              <Box>
                  <Container className={styles.titleContainer} >
                    </Container>

                  <Container   className={styles.cardInfo}
                  >

                      <Grid container spacing={3} >
                          <Grid item xs={8} className={styles.threePointGrid}>
                              <div  className={[styles.align]}>
                                  <Typography variant="h5"   className={styles.cardTitle}  >
                                      {data && data.actor.name}
                                  </Typography>
                                  <Typography variant="h7"   className={styles.cardTitleCategories}  >
                                      {data && data.actor.Categories && data.actor.Categories.length>0 && data.actor.Categories[0].parentCategory.label} : {data && data.actor.Categories && data.actor.Categories.length>0 && data.actor.Categories[0].label}
                                  </Typography>
                              </div>
                              <p>{data && data.actor.description}</p>
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
                                          LOCALISATION La Jarne
                                      </Grid>
                                  </Grid>
                                  <Grid container className={[styles.item]} >
                                      <Grid item xs={3} className={[styles.alignRight]}>
                                          <Phone className={[styles.icon]}/>
                                      </Grid>
                                      <Grid item xs={8} className={[styles.alignLeft]}>
                                          TELEPHONE
                                      </Grid>
                                  </Grid>
                                  <Grid container className={[styles.item]} >
                                      <Grid item xs={3} className={[styles.alignRight]}>
                                          <AlternateEmail className={[styles.icon]}/>
                                      </Grid>
                                      <Grid item xs={8} className={[styles.alignLeft]}>
                                          Email
                                      </Grid>
                                  </Grid>
                                  <Grid container className={[styles.item]} >
                                      <Grid item xs={3} className={[styles.alignRight]}>
                                          <Language className={[styles.icon]}/>
                                      </Grid>
                                      <Grid item xs={8} className={[styles.alignLeft]}>
                                          SITE INTERNET
                                      </Grid>
                                  </Grid>
                                  <Grid container className={[styles.item]} >
                                      <Grid item xs={3} className={[styles.alignRight]}>
                                          <Schedule className={[styles.icon]}/>
                                      </Grid>
                                      <Grid item xs={8} className={[styles.alignLeft]}>
                                          HORAIRE
                                      </Grid>
                                  </Grid>
                              </Grid>


                          </Grid>
                      </Grid>

                  </Container>
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
