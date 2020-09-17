import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, InputBase } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  newsletter:{
    paddingTop :"5em",
    paddingBottom :"5em",
    textAlign: "center",
    height: "32em",
  },
  align: {
    "text-align": "center"
  },
  search: {
    position: 'relative',
    borderRadius: '9em',
    width: '35%',
    margin: "0 auto",
  },
  searchIcon: {
    height: '51px',
    width: '51px',
    borderRadius: "50%",
    backgroundColor:'#bf083e',
    color: "white",
    position: "absolute",
    right: "0px",
    top: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {
      cursor: "pointer",
    }
  },
  inputRoot: {
    width:"100%",
  },
  inputInput: {
    width:"100%",
    height: "36px",
    borderRadius: "30px",
    border: "solid 1px #5A5758",
    color: "#A3A3A3",
    fontStyle: "italic",
    paddingLeft: "20px",
  },
  cardTitle: {
    align: "center",
    fontFamily: "rowdies",
    fontSize: "2.2em",
    color: "#2a9076",
    letterSpacing: "2px",
    marginBottom: "3em",
  },
})

const Newsletter = () => {
  const styles = useStyles()

  return (
    <Container className={[styles.newsletter]}>
      <Typography variant="h5" className={[styles.cardTitle,styles.align]}   >
        POUR NE RIEN RATER DE #OUAAA<br/>
        INSCRIVEZ-VOUS À NOTRE NEWSLETTER
      </Typography>
      <div className={styles.search}>
        <InputBase
            placeholder="J'inscris mon email pour recevoir la newletter"
            classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
        />
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
      </div>
    </Container>
  )
}

export default Newsletter