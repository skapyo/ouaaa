import React, { createContext, useEffect, useState, useReducer } from "react";
import { Segment } from "semantic-ui-react";
import ResponsiveContainer from "./Container/ResponsiveContainer";
import { BrowserRouter as Router } from "react-router-dom";

import DesktopBodyLayout from "./Container/BodyLayout/DesktopBodyLayout";
import MobileBodyLayout from "./Container/BodyLayout/MobileBodyLayout";
import Footer from "./Components/Footer/Footer";

import useWindowSize from "./Hooks/useWindowSize";

import useAuth, { AuthContextProvider } from "./Hooks/useAuth";

import {
  CountProvider,
  useCountState,
  useCountDispatch
} from "./count-context";

const HomepageLayout = () => {
  const { height } = useWindowSize();
  const minHeight = height - 240;
  // console.log(minHeight);
  const minHeightString = `${minHeight}px`;
  // console.log(minHeightString);

  //const [isLogged, userInfo, { login, logout }] = useAuth();

  // const [state, setState] = useState({ isLogged, userInfo, login, logout });

  // useEffect(() => {
  //   setState({ isLogged, userInfo, login, logout })
  // },[isLogged, userInfo, login, logout])

  // import React from 'react';

  // const [state, dispatch] = useReducer(action, initState);

  return (
    <>
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
      />
      <Router>
        {/* <AuthContextProvider value={{ isLogged, userInfo, login, logout }}> */}
        <CountProvider>
          <ResponsiveContainer>
            <Segment
              style={{
                padding: "90px 0 20px 0",
                "min-height": minHeightString
              }}
              vertical
            >
              <DesktopBodyLayout />
              <MobileBodyLayout />
            </Segment>
            <Footer />
          </ResponsiveContainer>
        </CountProvider>
      </Router>
    </>
  );
};
export default HomepageLayout;
