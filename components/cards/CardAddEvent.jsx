import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useCookies} from 'react-cookie';
import {useRouter} from 'next/router';
import Link from '../Link';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    minWidth: 120,
    width: '220px',
    padding: 'inherit',
    'box-shadow': '0px 5px 26px -10px rgba(0, 0, 0, 0.46)',
    margin: '15px',
    '&:hover': {
      cursor: 'pointer',
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
  categorie: {
    backgroundColor: 'white',
    borderRadius: '0.3em',
    color: '#f0a300',
    width: 'max-content',
    padding: '0 5px 0 5px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    backgroundImage: "url('/cardPicture.jpg')",
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'over',
    textAlign: 'inherit',
    height: '10em',
  },
  title: {
    textAlign: 'left',
    color: '#2C367E',
    width: '100%',
  },
  content: {
    padding: '10px',
  },
  date: {
    textAlign: 'right',
    color: '#2C367E',
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function SimpleCard({ actor }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies();
  const clickHandler = useCallback(() => {
    setCookie('redirect_url', router.asPath, { path: `/actor/${actor.id}` });
  }, [setCookie, router.asPath]);

  return (
    <Link href={`/addevent/${actor.id}`} onClick={clickHandler}>
      <Card className={classes.root}>
        <CardContent>
          <AddCircleIcon />
          <Typography variant="h6" component="h2" className={classes.title}>
            Ajouter un nouvel événement
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
