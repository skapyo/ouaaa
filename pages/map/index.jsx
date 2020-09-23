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
import CardContent from "@material-ui/core/CardContent";
import Moment from "react-moment";
import Card from "@material-ui/core/Card/Card";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import graphqlTag from "../../containers/forms/AddActorForm";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
    hightlightsBox: {
        padding: theme.spacing(2),
        backgroundColor: "#F9F9F9",
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
    root: {
        minWidth: 120,
        width : "220px",
        padding:"inherit",
        "box-shadow": "0px 5px 26px -10px rgba(0, 0, 0, 0.46)",
        margin:"15px",
        "&:hover": {
            cursor: "pointer",
        },


    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
    categorie:{
        backgroundColor:"white",
        borderRadius: "0.3em",
        color : "#f0a300",
        width:"5em",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign:"center"

    },
    image:{
        backgroundImage:`url('/cardPicture.jpg')`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize:"over",
        textAlign:"inherit",
        height:"10em"
    },
    title:{
        textAlign:"left",
        "color": "#2a9076",
        width:"100%"
    },
    content:{
        padding:"10px"
    },
    date:{
        textAlign:"right",
        "color": "#2a9076",
    },
    titleDiv:{
        display:"flex",
        alignItems: "center"

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
    favorite: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            cursor: "pointer",
        },
    },
    favoriteIcon: {
        color: "#AD2740",
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
            short_description,
            lat,
            lng,
            Categories{
                label
            }
        }
        }
    `;
    const GET_CATEGORIES = gql`
    { categories
    {   id,
        label
        icon
        subCategories {
            label
            icon
                subCategories {
                label
                icon
                  subCategories {
                     label
                     icon
              }
          }
  }
    }
    }
`;
    const {data:dataCategorie,loading:loadingCategorie,error:errorCategorie} = useQuery(GET_CATEGORIES,{fetchPolicy:"network-only"});

    const {data,loading,error} = useQuery(GET_ACTORS,{fetchPolicy:"network-only"});

    const markers = [[51.505, -0.09]]

    const [open, setOpen] = React.useState(true);
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setOpen(!open);
    };

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

    },[mapRef])

    const [favorite, setFavorite] = useState(false)

    const styles = useStyles()
        const position = [45.9876806, -0.9344537]
        if (typeof window != 'undefined') {

            L.Icon.Default.mergeOptions({
                iconUrl:null
            })
            const suitcasePoint = new L.Icon({
                iconUrl: '/icons/place.svg',
                iconRetinaUrl: '/suitcaseIcon.svg',
                iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
                iconSize: [25],
                popupAnchor: [1, -25]
            })

            if (loading)
                return 'loading';

            return (
                <AppLayout>
                    <Grid container >
                        <Grid item xs={2}>
                            <List >
                                {typeof dataCategorie !== "undefined" && dataCategorie.categories.map((category, index) => {
                                    return (
                                        <div>
                                            <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0)}>
                                                <ListItemIcon>

                                                </ListItemIcon>
                                                <ListItemText primary={category.label}/>
                                                {open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>
                                            {typeof category.subCategories !== "undefined" && category.subCategories !=null && category.subCategories.map((subcategory, index) => {
                                                return (
                                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItem button >
                                                                <ListItemIcon>
                                                                    <Checkbox
                                                                        edge="start"
                                                                        tabIndex={-1}
                                                                        disableRipple
                                                                        name="categories"
                                                                        value={subcategory.id}
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText  primary={subcategory.label} />
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>

                                                );
                                            })
                                            }
                                        </div>
                                    );
                                })
                                }

                            </List>
                        </Grid>

                        <Grid item xs={10} >
                            <Map ref={mapRef} center={position} zoom={9}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {typeof data !== "undefined"&& data.actors.map((actor, index) => {
                                    if(actor.lat!=null && actor.lng!=null)
                                        return (
                                            <Marker key={`marker-${index}`} position={[actor.lat,actor.lng]} icon={suitcasePoint}>
                                                <Popup>

                                                    <div  className={styles.image}>
                                                        <div className={styles.categorie}>
                                                            <Typography className={styles.categorie}  gutterBottom>
                                                                {actor.Categories && actor.Categories.length>0 && actor.Categories[0].label}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className={styles.content}>
                                                        <Grid container >
                                                            <Grid item xs={10}>
                                                                <div  className={styles.titleDiv}>
                                                                    <Typography variant="h6" component="h2"  className={styles.title}>
                                                                        {actor && actor.name}
                                                                    </Typography>
                                                                </div>
                                                            </Grid>

                                                            <Grid item xs={2} >
                                                                <div className={styles.favorite} onClick={() => setFavorite(!favorite)}>
                                                                    {!favorite && <FavoriteBorderRoundedIcon className={styles.favoriteIcon} />}
                                                                    {favorite && <FavoriteRoundedIcon className={styles.favoriteIcon} />}
                                                                </div>
                                                            </Grid>
                                                        </Grid>


                                                        <Typography component="p">
                                                            {actor && actor.short_description}
                                                        </Typography>
                                                    </div>
                                                    <Link  href={"/actor/"+actor.id} >
                                                        <button className={styles.buttonGrid}  >EN SAVOIR PLUS</button>
                                                    </Link>
                                                </Popup>
                                            </Marker>)
                                })
                                }
                            </Map>
                        </Grid>
                    </Grid>



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