import React, { createContext, useEffect, useState, useReducer } from "react";
import { Segment } from "semantic-ui-react";
import ResponsiveContainer from "./Container/ResponsiveContainer";
import { BrowserRouter as Router } from "react-router-dom";
import DesktopBodyLayout from "./Container/BodyLayout/DesktopBodyLayout";
import MobileBodyLayout from "./Container/BodyLayout/MobileBodyLayout";
import Footer from "./Components/Footer/Footer";
import useWindowSize from "./Hooks/useWindowSize";
import {SessionProvider} from "./Session/session";
import {isMobileOnly} from 'react-device-detect';

const HomepageLayout = ({initSession = null}) => {
    const { height } = useWindowSize();
    const minHeight = height - 240;
    const minHeightString = `${minHeight}px`;
    const padding = isMobileOnly ? 30 : 90;

    return (
        <>
            <link
                rel="stylesheet prefetch"
                href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
            />
            <Router>
                <SessionProvider init={initSession}>
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
                </SessionProvider>
            </Router>
        </>
    );
};
export default HomepageLayout;
