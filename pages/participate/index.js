import React, {useState} from "react"
import AppLayout from "containers/layouts/AppLayout"
import {Box, Container, makeStyles, RootRef, Typography,} from "@material-ui/core"
import Newsletter from "../../containers/layouts/Newsletter";
import Link from "../../components/Link";

const useStyles = makeStyles((theme) => ({

    align:{
        "text-align": "center",
    },

    buttonGrid: {
        padddingTop:"6em",
        margin: "5em 0 5em 0 ",
        "color": "white",
        "background-color": "#bf083e",
        border: "none",
        fontFamily: 'rowdies',
        borderRadius: "1.5em",
        padding: "0.2em 3em 0.2em 3em",
        minHeight: "2.5em",
        "&:hover": {
            cursor: "pointer",
            "color": "#bf083e",
            "background-color": "white",
        },
        backgroundImage: `url('./arrow.svg')`,
        backgroundRepeat: "no-repeat",
        "background-position-x": "5px",
        "background-position-y": "1px",
        fontSize: "1.2em",
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8em',
        }
    }


}))
const Participate = () => {
    const styles = useStyles(stylesProps)
    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    return (
        <AppLayout>
            <RootRef >
                <Box>
                    <Container className={styles.align} >
                        <Typography variant="h1" >Je Participe</Typography>

                        <Link  href="/addactor">
                            <button className={styles.buttonGrid} >JE DEVIENS UN ACTEUR</button>
                        </Link>

                        <Typography variant="h4" ><a href="mailto:contact@acteursdelatransition.fr">Rejoins l'équipe du Ouaaa</a> </Typography>

                    </Container>
                    <Newsletter />
                </Box>
            </RootRef>
        </AppLayout>
    )
}

export default Participate
