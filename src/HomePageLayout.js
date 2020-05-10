import React, { createContext, useEffect, useState, useReducer } from "react";
import { Segment } from "semantic-ui-react";
import ResponsiveContainer from "./Container/ResponsiveContainer";
import { BrowserRouter as Router } from "react-router-dom";
import {useRouterHistory, Route} from 'react-router';
import DesktopBodyLayout from "./Container/BodyLayout/DesktopBodyLayout";
import MobileBodyLayout from "./Container/BodyLayout/MobileBodyLayout";
import Footer from "./Components/Footer/Footer";
import useWindowSize from "./Hooks/useWindowSize";
import {SessionProvider} from "./Context/Session/session";
import {DeviceContextProvider} from "./Context/Device/device";
import {isMobileOnly} from 'react-device-detect';
import ReactGA from 'react-ga';
import Link from 'next/link'
import Head from './Components/head'
const isServer = typeof window === 'undefined';
const HomepageLayout = ({initSession = null}) => {
    const { height } = useWindowSize();
    const minHeight = height - 240;
    const minHeightString = `${minHeight}px`;
    const padding = isMobileOnly ? 10 : 90;

    const trackingId = "UA-164586242-1"; // Replace with your Google Analytics tracking ID
    ReactGA.initialize(trackingId);


    if (isServer) {
        const {StaticRouter} = require('react-router');
        return (
            <StaticRouter><Head />
                <ResponsiveContainer>
                    <Segment
                        style={{
                            padding: `${padding}px 0 20px 0`,
                            "min-height": minHeightString
                        }}
                        vertical
                    >
                        <DesktopBodyLayout />
                        <MobileBodyLayout />
                    </Segment>
                </ResponsiveContainer>

            </StaticRouter>
        );
    }
    return (
        <>
            <Head title="Acteurs de la transition"/>
            <link
                rel="stylesheet prefetch"
                href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
            />
            <Router>
                <SessionProvider init={initSession}>
                    <DeviceContextProvider>
                        <ResponsiveContainer>
                            <Segment
                                style={{
                                    padding: `${padding}px 0 20px 0`,
                                    "min-height": minHeightString
                                }}
                                vertical
                            >
                                <DesktopBodyLayout />
                                <MobileBodyLayout />
                            </Segment>
                        </ResponsiveContainer>
                    </DeviceContextProvider>
                </SessionProvider>
            </Router>
        </>
    );
};
export default  HomepageLayout;
