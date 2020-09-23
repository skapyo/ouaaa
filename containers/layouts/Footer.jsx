import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Link from "components/Link";
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles({
  footer: {
    color: "white",
    backgroundColor: "#2a9076",
    border: "none",
    height: "29em",
    textAlign: "center",
    paddingTop:"3em",
  },
  footerTitle: {
    color: "white",
    align: "center",
    fontWeight: 700,
    fontFamily: "rowdies",
    fontSize: "2.5em",
    marginTop: "1em",
  },
  footerSubTitle: {
    fontWeight: 100,
    fontSize: "1.2em",
  },
  socialNetworks: {
    '& img': {
      width: "38px",
      height: "38px",
    },
  },
  icons: {
    color: "white",
    margin: "0.6em 0.2em",
  },
  links: {
    fontWeight: "600",
    '& a': {
      color: "white",
    }
  },
  logo: {},
})

const Footer = () => {
  const classes = useStyles()

  return (
    <Container className={classes.footer}>
      <Typography variant="h5" className={classes.footerTitle}>
        RESTONS CONNECTÉS!
      </Typography>
      <Typography variant="h6" className={classes.footerSubTitle}>
        Suivez nos aventures sur les réseaux sociaux :
      </Typography>
      <div className={classes.socialNetworks}>
        <a href="https://www.facebook.com/OUAAA" target="_blank">
          <FacebookIcon className={classes.icons} fontSize="large" />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <InstagramIcon className={classes.icons} fontSize="large" />
        </a>
        <a href="https://www.youtube.com" target="_blank">
          <YouTubeIcon className={classes.icons} fontSize="large" />
        </a>
      </div>
      <div className={classes.links}>
        <Link href="/about">À propos</Link>
        <span> - </span>
        <Link href="/legalmention">Mentions Légales</Link>
        <span> - </span>
        <Link href="/faq">FAQ</Link>
        <span> - </span>
        <Link href="/contact">Contact</Link>
        <span> - </span>
        <Link href="/charter">Charte</Link>
      </div>
      <div className={classes.logo}></div>
    </Container>
  )
}

export default Footer