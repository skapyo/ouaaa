import React, {Component, useState,useEffect,useRef,useCallback} from 'react';
import AppLayout from "../../containers/layouts/AppLayout";
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core/styles";

import Actor from "../actor/[id]";
import gql from 'graphql-tag'
import {withApollo} from "../../hoc/withApollo";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useSessionDispatch, useSessionState} from "../../context/session/session";
import {useRouter} from "next/router";
import Button from "@material-ui/core/Button";
import Link from "../../components/Link";

if (typeof window != 'undefined') {
    var L = require("leaflet");
    var Map = require('react-leaflet').Map;
    var TileLayer = require('react-leaflet').TileLayer;
    var Marker = require('react-leaflet').Marker;
    var Popup = require('react-leaflet').Popup;
}


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



const carto = () => {
    const mapRef=useRef();

    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const GET_ACTORS = gql`
        { actors
        {   id,
            name,
            address,
            lat,
            lng
        }
        }
    `;


    const {data,loading,error} = useQuery(GET_ACTORS,{fetchPolicy:"network-only"});

    const markers = [[51.505, -0.09]]


  /*  useEffect(() => {
        if(data){
            const {markers} = this.state
            data.actors.forEach((actor) => {
                markers.push([actor.lat,actor.lng])
            });
            this.setState({markers})
        }

    },[data])
    */

    useEffect(() => {
        const {current ={}} = mapRef;
        const  {leafletElement:map}=current;

    },[mapRef])


    const styles = useStyles(stylesProps)
        const position = [46.1667, -1.15]
        if (typeof window != 'undefined') {

            L.Icon.Default.mergeOptions({
                iconUrl:null
            })
            const suitcasePoint = new L.Icon({
                iconUrl: '/marker.png',
                iconRetinaUrl: '/suitcaseIcon.svg',
                iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
                iconSize: [25],
                popupAnchor: [1, -25]
            })

            if (loading)
                return 'loading';

            return (
                <AppLayout>
                    <RootRef >
                        <Box className={styles.topBox}>
                            <Container className={styles.topContainer}>
                                <Grid
                                    container
                                    spacing={3}
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >

                                    <Grid item xs={12} sm={8}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Typography variant="h4">
                                                    Cartographie des acteurs de la transition
                                                </Typography>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    direction="row"
                                                    justify="flex-start"
                                                    alignItems="center"
                                                >
                                                    <Grid item>
                                                        <RoomIcon/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    </RootRef>
                    <Map ref={mapRef} center={position} zoom={5}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {typeof data !== "undefined"&& data.actors.map((actor, index) => {
                            if(actor.lat!=null && actor.lng!=null)
                            return (
                                <Marker key={`marker-${index}`} position={[actor.lat,actor.lng]} icon={suitcasePoint}>
                                    <Popup>
                                        <span>{actor.name}</span>
                                        <Link href={"/actor/"+index} >Voir la page et événements</Link>
                                    </Popup>
                                </Marker>)
                        })
                        }
                    </Map>

                </AppLayout>
            )
        } else {
            return (
                <div>

                </div>
            )

    }
}
export default withApollo()(carto)