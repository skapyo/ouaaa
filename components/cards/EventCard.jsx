import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Moment from 'react-moment';
import Link from "../Link";
import {getImageUrl} from "../../utils/utils";

const useStyles = makeStyles((theme, props) => ({
  card: props => ({
    backgroundColor: "white",
    borderRadius: "10px",
    margin: "16px 0",
    height: "106px",
    borderLeft: "solid 12px " + props.color,
    display: "flex",
  }),
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 24px",
  },
  favorite: props => ({
    width: "100px",
    borderLeft: "dashed 2px " + props.color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      cursor: "pointer",
    },
  }),
  favoriteIcon: props => ({
    color: props.color,
  }),
  category: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  opacity: props => ({
    width: "40px",
    height: "40px",
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: props.color,
    opacity: "0.3",
  }),
  categoryIcon: props => ({
    width: "40px",
    height: "40px",
    mask:`url('/icons/${props.icon}.svg')`,
    maskPosition: 'center center',
    maskRepeat: 'no-repeat',
    maskSize: "22px",
    background: props.color
  }),
  leftContent: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: "72px",
    width: "72px",
    margin: "0 24px 0 0",
    '& img': {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  text: {},
  actor: props => ({
    textTransform: "uppercase",
    color: props.color,
    fontWeight: "bold",
  }),
  label: {
    color: "black",
    fontWeight: "bold",
  },
  eventDetails: {
    fontStyle: "italic",
    color: "#A3A3A3",
  },
}))

const EventCard = ({event}) => {
  const color = (event.categories[0]) ? event.categories[0].color : "#AD2740"
  const icon = (event.categories[0]) ? event.categories[0].icon : "fruit"
  const actorName = (event.actors[0]) ? event.actors[0].name : "Potager de la Jarne"
  
  const classes = useStyles({color, icon})
  const [favorite, setFavorite] = useState(false)


  return (
    <div className={classes.card}>
      <div className={classes.content}>
        <Link  href={"/event/" + event.id}>
          <div className={classes.leftContent}>
            <div className={classes.image}>
              {event.pictures.length>=1 && (
              <img src={event.pictures.length>=1?getImageUrl(event.pictures.sort((a, b) => a.position > b.position ? 1 : -1)[0].croppedPicturePath):''} />
              )}
            </div>
            <div className={classes.text}>
              <div className={classes.actor}>{actorName}</div>
              <div className={classes.label}>{event.label}</div>
              <div className={classes.eventDetails}>
                De
                <Moment format=" HH" unix>{event.startedAt/1000}</Moment>
                h
                <Moment format="mm " unix>{event.startedAt/1000}</Moment>
                à
                <Moment format=" HH" unix>{event.endedAt/1000}</Moment>
                h
                <Moment format="mm " unix>{event.endedAt/1000}</Moment>
                - 
                {!event.city && <span> Adresse manquante</span>}
                {!event.address && event.city && <span> {event.city}</span>}
                {event.address && event.city && <span> {event.address}, {event.city}</span>}
              </div>
            </div>
          </div>
        </Link>
        <div className={classes.category}>
          <span className={classes.opacity}></span>
          <span className={classes.categoryIcon}></span>
        </div>
      </div>
      <div className={classes.favorite} onClick={() => setFavorite(!favorite)}>
        {!favorite && <FavoriteBorderRoundedIcon className={classes.favoriteIcon} />}
        {favorite && <FavoriteRoundedIcon className={classes.favoriteIcon} />}
      </div>
    </div>
  )
}

export default EventCard