import React, {Component, useState,useEffect,useRef,useCallback} from 'react';
import AppLayout from "../../containers/layouts/AppLayout";
import {Box, Container, Grid, RootRef, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import gql from 'graphql-tag'
import {withApollo} from "../../hoc/withApollo";
import {useMutation, useQuery} from "@apollo/react-hooks";





const agenda = () => {

    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    const GET_EVEVNT = gql`
        { events
        {   id,
            name
        }
        }
    `;


    const {data,loading,error} = useQuery(GET_EVEVNT,{fetchPolicy:"network-only"});

    return (
        <AppLayout>
            <RootRef >
                <Box>
                    <Container >

                    </Container>
                </Box>
            </RootRef>

        </AppLayout>
    );


}
export default withApollo(agenda)