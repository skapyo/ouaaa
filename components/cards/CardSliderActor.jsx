import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Timestamp from 'react-timestamp';
import Moment from 'react-moment';
import Link from "../Link";

const useStyles = makeStyles({
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
marginRight: "auto"

    },
    image:{
        backgroundImage:`url('./cardPicture.jpg')`,
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

    }



});

export default function SimpleCard({actor}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <Link  href={"/actor/"+actor.id}>


        <Card className={classes.root}>
          <CardContent>
            <div  className={classes.image}>
              <div className={classes.categorie}>
                <Typography className={classes.categorie}  gutterBottom>
                    {actor.Categories && actor.Categories.length>0 && actor.Categories[0].label}
                </Typography>
              </div>
            </div>
            <div className={classes.content}>
              <div  className={classes.titleDiv}>
                <Typography variant="h6" component="h2"  className={classes.title}>
                    {actor && actor.name}
                </Typography>
              </div>
              <Typography variant="body" component="p">
                  {actor && actor.shortDescription}
              </Typography>
            </div>

          </CardContent>

        </Card>
      </Link>
  );
}