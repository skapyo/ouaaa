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
        "padding": "2em",
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
                          <Grid item xs={6}c lassName={styles.threePointGrid}>
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

                          <Grid item xs={6} className={styles.align}>
                              <img width={"60%"} className={styles.image}
                                   src="./image_card.jpg"
                              />
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
