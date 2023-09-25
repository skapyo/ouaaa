import makeStyles from '@mui/styles/makeStyles';
import { Container, Typography } from '@mui/material';
import Link from 'components/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const useStyles = makeStyles({
  footer: {
    color: 'white',
    backgroundColor: '#2C367E',
    border: 'none',
    height: '8em',
    textAlign: 'center',
    paddingTop: '3em',
    marginTop: 'auto',
  },
  footerTitle: {
    color: 'white',
    align: 'center',
    fontWeight: 700,

    fontSize: '2.5em',
    marginTop: '1em',
  },
  footerSubTitle: {
    fontWeight: 100,
    fontSize: '1.2em',
  },
  socialNetworks: {
    '& img': {
      width: '38px',
      height: '38px',
    },
  },
  icons: {
    color: 'white',
    margin: '0.6em 0.2em',
  },
  links: {
    fontWeight: '600',
    '& a': {
      color: 'white',
    },
  },
  logo: {},
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Container
      className={classes.footer}
    >
  
      <div className={classes.links}>
        <Link href="/legalmention">Mentions Légales</Link>
        <span> - </span>
        <Link href="/faq">FAQ</Link>
        <span> - </span>
        <Link href="/contact">Contact</Link>
        <span> - </span>
        <Link href="/annuaire">Annuaire</Link>
      </div>
      <div className={classes.logo} />
    </Container>
  );
};

export default Footer;
