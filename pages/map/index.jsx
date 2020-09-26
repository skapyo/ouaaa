import React, {useCallback, useEffect, useRef, useState} from 'react';
import AppLayout from "../../containers/layouts/AppLayout";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import gql from 'graphql-tag'
import {withApollo} from "../../hoc/withApollo";
import {useQuery} from "@apollo/react-hooks";
import Link from "../../components/Link";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
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
        width: "max-content",
        padding: "0 5px 0 5px",
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
        query actors($categories:[String]) {
            actors(categories:$categories) 
        {   id,
            name,
            address,
            short_description,
            lat,
            lng,
            categories{
                label
                icon
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
                id,
                label
                icon
                subCategories {
                    id,
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
    const [checked, setChecked] = useState([0]);

    const newChecked = [...checked];
    const categoriesChecked = [];

    const {data:dataCategorie,loading:loadingCategorie,error:errorCategorie} = useQuery(GET_CATEGORIES,{fetchPolicy:"network-only"});

    const {data,loading,error,refetch } = useQuery(GET_ACTORS,{
        variables: {
            categories:categoriesChecked
        }});

    const markers = [[51.505, -0.09]]

    const [open, setOpen] = React.useState([false]);

    const handleToggle = (value,index) => () => {
        const currentIndex = checked.indexOf(value);

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        open[index]=!open[index];
    };

    const categoryChange = useCallback(
        (e) => {

        const currentIndex = categoriesChecked.indexOf(e.target.value);

        if (currentIndex === -1) {
            categoriesChecked.push(e.target.value);
        } else {
            categoriesChecked.splice(currentIndex, 1);
        }
            refetch({categories:categoriesChecked})

    });

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
                                        <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0,index)}>
                                            <ListItemIcon>

                                            </ListItemIcon>
                                            <ListItemText primary={category.label}/>
                                            {open[index] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        {typeof category.subCategories !== "undefined" && category.subCategories !=null && category.subCategories.map((subcategory, subIndex) => {
                                            return (
                                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <ListItem button >
                                                            <ListItemIcon>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                    name="categories"
                                                                    value={subcategory.id}
                                                                    onChange={categoryChange}
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
                                var icone
                                if(actor.lat!=null && actor.lng!=null) {
                                    if(false && actor.categories && actor.categories.length > 0) {
                                        icone = actor.categories[0].icon
                                    }else {
                                        icone = '/icons/' + 'place' + '.svg'
                                    }
                                    const suitcasePoint = new L.Icon({
                                        iconUrl: icone,
                                        iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
                                        iconSize: [25],
                                        popupAnchor: [1, -25]
                                    })
                                    return (
                                        <Marker key={`marker-${index}`} position={[actor.lat, actor.lng]}
                                                icon={suitcasePoint}>
                                            <Popup>

                                                <div className={styles.image}>
                                                    <div className={styles.categorie}>
                                                        <Typography className={styles.categorie} gutterBottom>
                                                            {actor.categories && actor.categories.length > 0 && actor.categories[0].label}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className={styles.content}>
                                                    <Grid container>
                                                        <Grid item xs={10}>
                                                            <div className={styles.titleDiv}>
                                                                <Typography variant="h6" component="h2"
                                                                            className={styles.title}>
                                                                    {actor && actor.name}
                                                                </Typography>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={2}>
                                                            <div className={styles.favorite}
                                                                 onClick={() => setFavorite(!favorite)}>
                                                                {!favorite && <FavoriteBorderRoundedIcon
                                                                    className={styles.favoriteIcon}/>}
                                                                {favorite && <FavoriteRoundedIcon
                                                                    className={styles.favoriteIcon}/>}
                                                            </div>
                                                        </Grid>
                                                    </Grid>


                                                    <Typography component="p">
                                                        {actor && actor.short_description}
                                                    </Typography>
                                                </div>
                                                <Link href={"/actor/" + actor.id}>
                                                    <button className={styles.buttonGrid}>EN SAVOIR PLUS</button>
                                                </Link>
                                            </Popup>
                                        </Marker>)
                                }
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