import React, {
  useState,
} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Avatar, Link } from '@mui/material';
import StyledBoxOnHover from '../animated/StyledBoxOnHover';
import { getImageUrl } from '../../utils/utils';
import Favorite from '../Favorite';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
}));

const useStyles = makeStyles((theme, props) => ({
  '@media print': {
    card: {
      border: 'solid 1px grey',
    },
    favorite: {
      display: 'none !important',
    },
  },
  card: (props) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    minHeight: '106px',
  }),
  content: {
    width: '93%',
    height: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      margin: '0 24px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 5px',
    },
  },
  favorite: (props) => ({
    [theme.breakpoints.up('sm')]: {
      width: '100px',
    },
    [theme.breakpoints.down('md')]: {
      width: '50px',
    },
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  category: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  opacity: (props) => ({
    width: '40px',
    height: '40px',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity: '0.3',
  }),
  categoryIcon: (props) => ({
    width: '40px',
    height: '40px',
    mask: `url('/icons/${props.icon}.svg')`,
    maskPosition: 'center center',
    maskRepeat: 'no-repeat',
    maskSize: '22px',
    background: props.color,
    borderRadius: '50%',
    opacity: props.icon ? 1 : 0,
  }),
  title: {
    textAlign: 'center',
  },
  image: {
    height: '72px',
    width: '72px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 24px 0 0',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 5px 0 0',
    },
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      borderRadius: '50%',
    },
  },
  avatar:{
    backgroundColor: 'white',
  },
  text: {},
  actor: (props) => ({
    textTransform: 'uppercase',
    color: props.color,
    fontWeight: 'bold',
    textAlign: 'center'
  }),
  label: {
    color: 'black',
    fontWeight: 'bold',
  },
  location: {
    color: 'black',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8em',
  },
  actorDetails: {
    fontStyle: 'italic',
    color: '#A3A3A3',
    fontSize: '0.8em',
  },
  icon: {
    color: '#bd0b3d',
    width: '20px',
  },
  video: {
    [theme.breakpoints.up('sm')]: {
      width: '500px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    maxWidth : '500px',
    borderRadius: '23px',
  },
}));

const ActorCard = ({ actor }) => {
  const color = actor?.entries?.[0]?.parentEntry?.color || '#AD2740';
  const icon = actor?.entries?.[0]? actor.entries[0].icon : 'fruit';
  const actorName = actor.name;
  const classes = useStyles({ color, icon });
  const [showVideo, setShowVideo] = useState(false);
  function stringAvatar(name) {
    if (name !== undefined) {
      return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
      };
    }
    return '';
  }

  const getActorProfilePicture = () => {
    const profilePictures = actor.pictures?.filter((picture) => picture.logo) || [];
    const picture = profilePictures.length > 0 ? getImageUrl(profilePictures[0].originalPicturePath) : undefined;
    return picture;
  };

  return (
    <StyledBoxOnHover className={classes.card}>
       <div>
        {actor.hasVideoVouaaar && (
              <div className={classes.cardTitle}>
                {!showVideo && (
                  <img  className={classes.video} 
                    src={"https://static.ouaaa-transition.fr/static/video/"+actor.id+".jpg"} 
                    alt=""
                    onMouseOver={() => setShowVideo(true)}
                    onClick={() => setShowVideo(true)}
                  />
                )}
                 {showVideo && (
                  <video controls autoplay className={classes.video} 
                  onMouseOver={event => event.target.play()}
                  onMouseOut={event => event.target.pause() }
                  >
                    <source src={"https://static.ouaaa-transition.fr/static/video/"+actor.id+".mp4"} />
                  </video>
                 )}
              </div>
              )}
        
          <Grid  container spacing={2}>
            <Grid item xs={10}>
              <Link href={`/actor/${actor.id}`} color="inherit" underline="none" width="100%">
                <div className={classes.actor}>{actorName}</div>
              </Link>
            </Grid> 
            <Grid item xs={2}>
              <Favorite actor={actor} />
            </Grid>
          </Grid>
       
        
      </div>
    </StyledBoxOnHover>
  );
};

export default ActorCard;
