import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Moment from 'react-moment';

const useStyles = makeStyles({
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    margin: "16px 0",
    height: "106px",
    borderLeft: "solid 12px #AD2740",
    display: "flex",
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 24px",
  },
  favorite: {
    width: "100px",
    borderLeft: "dashed 2px #AD2740",
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
  category: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#F3E6EB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '& img': {
      width: "20px",
      color: "#AD2740",
      filter: "invert(23%) sepia(64%) saturate(2174%) hue-rotate(324deg) brightness(86%) contrast(96%)",
    },
  },
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
  actor: {
    textTransform: "uppercase",
    color: "#AD2740",
    fontWeight: "bold",
  },
  label: {
    color: "black",
    fontWeight: "bold",
  },
  eventDetails: {
    fontStyle: "italic",
    color: "#A3A3A3",
  },
})

const EventCard = ({event}) => {
  const classes = useStyles()
  const [favorite, setFavorite] = useState(false)

  return (
    <div className={classes.card}>
      <div className={classes.content}>
        <div className={classes.leftContent}>
          <div className={classes.image}>
            <img src="image_card.jpg" />
          </div>
          <div className={classes.text}>
            <div className={classes.actor}>Potager de la Jarne</div>
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
        <div className={classes.category}>
          <img src="icons/fruit.svg" />
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