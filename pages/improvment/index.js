import React, {useState} from "react"
import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, makeStyles, RootRef, Typography,} from "@material-ui/core"
import Newsletter from "../../containers/layouts/Newsletter";
import Link from "../../components/Link";
const useStyles = makeStyles((theme) => ({

    align:{
        "text-align": "center",
    },
    button:{
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
            "color":"#bf083e",
            "background-color":"white",
        },
        backgroundImage:`url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "5px",
        "background-position-y": "1px",
        fontSize: "1.5em"
    },

    imageGrid:{
        padding:"2em"
    }

}))
const Improvment = () => {

    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const styles = useStyles(stylesProps)
    return (
        <AppLayout>
            <RootRef >
                <Box>

                    <Container className={styles.align} >

                        <Typography variant="h1" >
                            Les fonctionnalités
                        </Typography>
                        <img width={"70%"} className={styles.imageGrid}
                             src="./improvment.png"
                        />
                        <div>
                            <a rel="noopener noreferrer" href="https://privatecloud.acteursdelatransition.fr/s/66XSkfa963CA8Xg" target="_blank">
                                <button className={styles.button} >Faire un retour d'expérience ou apporter une idée d'amélioration</button>
                            </a>
                        </div>
                    </Container>
                    <Newsletter />
                </Box>
            </RootRef>
        </AppLayout>
    )
}

export default Improvment
