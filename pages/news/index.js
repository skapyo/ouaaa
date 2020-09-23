import React from "react"
import AppLayout from "containers/layouts/AppLayout"
import {
    Typography,
    makeStyles,
    Box,
    Container,
    RootRef,
} from "@material-ui/core"
import { useState, useEffect } from "react"
import Newsletter from "../../containers/layouts/Newsletter";

const useStyles = makeStyles((theme) => ({

    align:{
        "text-align": "center",
    },




}))
const News = () => {

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
                        <Typography variant="h1" >Le Journal</Typography>
                        <Typography variant="h4" >En cours de construction</Typography>
                    </Container>
                    <Newsletter />
                </Box>
            </RootRef>
        </AppLayout>
    )
}

export default News
