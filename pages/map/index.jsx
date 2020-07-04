import React, {Component, useState,useEffect} from 'react';
import AppLayout from "../../containers/layouts/AppLayout";
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core/styles";
import Course from "../course/[id]";

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
    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })


        //const headerRef = React.useRef();


        const styles = useStyles(stylesProps)
        const position = [30, 20]
        if (typeof window != 'undefined') {
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
                    <Map center={position} zoom={5}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
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
export default carto