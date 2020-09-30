import {Container, makeStyles, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase/InputBase";
import React from "react";

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        marginTop : theme.spacing(2),
        backgroundImage:`url('./fond.jpeg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '24em',
        color: 'white',
        "text-align": "center",
        padding :'3em',

    },
    title: {
        padding:"1em",
    },
    titleTypo: {
        fontSize:"2em",
        fontFamily: 'rowdies',
        color:"white"
    },
    search: {

        position: 'relative',
        borderRadius: '9em',
        backgroundColor: 'white',
        //marginLeft: theme.spacing(40),
        width: '35%',
        margin: "0 auto",
        marginTop :theme.spacing(2),
        color:'black',
        display:"none"
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        color:'#bf083e',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    align: {
        "text-align": "center"
    },
    inputRoot: {
        color: 'inherit',
        width:"100%",
    }, inputInput: {
        padding: theme.spacing(1, 1, 1, 4),
        // vertical padding + font size from searchIcon

        transition: theme.transitions.create('width')
    },



}))

const PresentationSection = () => {

  const styles = useStyles()

  return (
      <Container className={styles.titleContainer} >
          <div className={styles.title}>
              <Typography className={styles.titleTypo} variant="h1" >
                  OUtils des Acteurs Alternatifs en Aunis
              </Typography>
          </div>
          <Typography className={styles.align} >
              Notre mission : faire connaître celles et ceux qui œuvrent  <br />pour la transition écologique, sociale et démocratique en Aunis
          </Typography>
          <div className={styles.search}  >
              <div className={styles.searchIcon}>
                  <SearchIcon />
              </div>
              <InputBase
                  placeholder="Rechercher un acteur, un événement, un article"
                  classes={{
                      root: styles.inputRoot,
                      input: styles.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
              />
          </div>


      </Container>
  )
}

export default PresentationSection