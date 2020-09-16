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
  leftTitle: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(1),
    backgroundColor: "#F7F7F7",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  leftGridItem: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    borderRadius: "6px",
    width: "100%",
  },
  rightGridItem: {
    backgroundColor: "#FFFFFF",
    "&:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(3),
    borderRadius: "6px",
    width: "100%",
  },
  topContainer: {
    padding: theme.spacing(4),
    maxWidth: "1120px",
  },
  topBox: {
    backgroundColor: "rgba(255, 255, 255)",
    position: (props) => props.headerDisplay,
    top: "0px",
    width: "100%",
    boxShadow: "rgba(0,0,0,0.1) 0px 2px 20px 1px",
  },
  placeholder: {
    display: (props) => {
      return props.headerDisplay == "fixed" ? "block" : "none"
    },

    height: (props) => props.placeHolderHeight,
  },
  leftTitles: {
    marginBottom: theme.spacing(10),
  },
  buyButton: {
    backgroundColor: "#009C95",
    width: "170px",
    borderRadius: "30px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: "#FFFFFF",
  },
  price: {},
  sticky: {
    position: "sticky",
    top: "100px",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    boxShadow: "0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1)",
    padding: theme.spacing(3),
  },
  contentSubTitles: {
    marginBottom: theme.spacing(1),
    fontWeight: "600",
  },
  contentDivider: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  hightlightsBox: {
    padding: theme.spacing(2),
    backgroundColor: "#F9F9F9",
  },
  topImage: {
    display: "inline",
    width: (props) => props.topImageSize,
    height: (props) => props.topImageSize,
    borderRadius: "100px",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  stickyFirstLine: {
    marginBottom: theme.spacing(2),
  },
  datePicker: {
    border: "0.5px solid",
    borderRadius: "10px",
    padding: theme.spacing(2),
    width: "100%",
    color: "#B0B0B0",
    marginBottom: theme.spacing(2),
    "& label": {
      position: "relative",
      fontWeight: "800",
    },
    "&.MuiInput-formControl": {
      margin: "0px",
    },
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
          lng
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

  if (typeof window !== "undefined")
    window.onscroll = () => {
      let topImageSize = stylesProps.topImageSize
      let headerDisplay = "fixed"
      let placeHolderHeight = stylesProps.placeHolderHeight

      if (window.scrollY < 320) {
        topImageSize = `${250 - window.scrollY / 2}px`
      }

      if (window.scrollY > 64 && stylesProps.headerDisplay !== "fixed") {
        headerDisplay = "fixed"
        placeHolderHeight = headerRef.current.clientHeight
      } else if (window.scrollY <= 64) {
        headerDisplay = "static"
      }

      setStylesProps({
        topImageSize,
        headerDisplay,
        placeHolderHeight,
      })
    }

  return (
    <AppLayout>
      <Box className={styles.placeholder} />
      <RootRef rootRef={headerRef}>
        <Box className={styles.topBox}>
          <Container className={styles.topContainer}>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <img
                  src="https://media.istockphoto.com/photos/burger-isolated-on-white-picture-id840902892?k=6&m=840902892&s=612x612&w=0&h=lA4ww5bmLwCzlRXYqHU_EkVC_xfgoOIsX9IvDu0rE1c="
                  className={styles.topImage}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h4">
                      {data && data.actor.name}
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <RoomIcon />
                      </Grid>
                      <Grid item>Paris (10 km à la ronde)</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </RootRef>
      <AppContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Avatar className={styles.avatar} />
              </Grid>
              <Grid item>
                <Box>Proposé par Christophe</Box>
                Inscrit depuis Mars 2019
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Grid item className={styles.rightGridItem}>
                <Typography variant="h5" className={styles.leftTitle}>
                  Description
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  efficitur metus eget neque convallis sodales. Praesent aliquet
                  lacus et velit dictum varius. In fermentum tincidunt tellus in
                  tempus. In placerat vulputate justo ac ultricies. Quisque sit
                  amet porta leo. Donec blandit tempus lectus, et tristique sem
                  ullamcorper vel. Suspendisse facilisis aliquet arcu, eget
                  fermentum purus pellentesque et. Donec at dui nec urna posuere
                  sagittis. Suspendisse massa tortor, ultricies sit amet dui eu,
                  sodales tempus purus. Interdum et malesuada fames ac ante
                  ipsum primis in faucibus. In lobortis mattis dapibus. Praesent
                  vestibulum, odio et hendrerit congue, risus nibh elementum
                  velit, vitae ultrices dolor arcu non justo. Quisque ultricies
                  odio enim. Pellentesque gravida pulvinar nisl, quis placerat
                  massa rhoncus a.
                </Typography>
              </Grid>
              <Grid item className={styles.rightGridItem}>
                <Typography variant="h5" className={styles.leftTitle}>
                  Le contenu
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>6 catégories</Grid>
                  <Grid item>
                    Durée totale : <b>3h</b>
                  </Grid>
                </Grid>
                <Divider className={styles.contentDivider} />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={styles.contentSubTitles}
                    >
                      Introduction
                    </Typography>
                  </Grid>
                  <Grid item>
                    <b>15 min</b>
                  </Grid>
                </Grid>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  efficitur metus eget neque
                </Typography>
                <Divider className={styles.contentDivider} />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={styles.contentSubTitles}
                    >
                      Introduction
                    </Typography>
                  </Grid>
                  <Grid item>
                    <b>15 min</b>
                  </Grid>
                </Grid>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  efficitur metus eget neque
                </Typography>
                <Divider className={styles.contentDivider} />
              </Grid>
              <Grid item className={styles.rightGridItem}>
                <Typography variant="h5" className={styles.leftTitle}>
                  Les prérequis
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StickyBox />
          </Grid>
        </Grid>
      </AppContainer>
    </AppLayout>
  )
}

const StickyBox = () => {
  const styles = useStyles()

  const [selectedDate, handleDateChange] = useState(new Date())

  return (
    <Box className={styles.sticky}>
      <Grid
        className={styles.stickyFirstLine}
        container
        justify="space-between"
        align="center"
      >
        <Box>
          <typography display="inline">à partir de</typography>
          <Typography variant="h5" className={styles.price} display="inline">
            150 €
          </Typography>
        </Box>
        <Box></Box>
      </Grid>
      <Grid container>
        <DatePicker
          variant="inline"
          label="Date de la formation"
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.datePicker}
          InputProps={{ disableUnderline: true }}
          format="d MMM yyyy"
          margin="dense"
        />
        <ClassicButton>Contacter le formateur</ClassicButton>
        <Grid container justify="space-between" align="center">
          <Typography>Prix de la formation</Typography>
          <Typography>150€</Typography>
        </Grid>
        <Grid container justify="space-between" align="center">
          <Typography>Frais de service</Typography>
          <Typography>10€</Typography>
        </Grid>
        <DividerCustom />
        <Grid container justify="space-between" align="center">
          <Typography>
            <b>Total</b>
          </Typography>
          <Typography>
            <b>160€</b>
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container className={styles.leftTitle} >
                <Box className={styles.leftGridItem}>
                    <Grid item >
                        <Typography variant='subtitle2'>
                            Cours proposés par Christophe
                        </Typography>
                        <Chip label='Individuel' className={styles.chip} />
                        <Chip label='En groupe' className={styles.chip} />
                    </Grid>
                </Box>

                <Grid item className={styles.leftGridItem}>
                    <Typography variant='subtitle2'>
                        Les cours peuvent se dérouler
                    </Typography>
                    <Chip label='Chez lui' className={styles.chip} />
                    <Chip label='Chez vous' className={styles.chip} />
                </Grid>
                <Grid item className={styles.leftGridItem}>
                    <Typography variant='subtitle2'>
                        Niveau
                    </Typography>
                    <Chip label='Débutant' className={styles.chip} />
                </Grid>
            </Grid> */}
    </Box>
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
