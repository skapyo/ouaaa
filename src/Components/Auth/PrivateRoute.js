import React from 'react';
import { Redirect, Route } from "react-router-dom";

import {
    CountProvider,
    useCountState,
    useCountDispatch
  } from "./../../count-context";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const auth = useCountState();

    return (
        <Route {...rest} render={props => (
            auth ? 
            (<Component {...props}/>) 
            : 
            (
              <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
              />
            )
        )}
    />
    )
}

const PrivateAdminRoute = ({ component: Component, ...rest }) => {

    const auth = useCountState();

    return (
        <Route {...rest} render={props => (
            auth && auth.role === 'admin' ? 
            (<Component {...props}/>) 
            : 
            (
              <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }}
              />
            )
        )}
    />
    )
}

const SignedoutRoute = ({ component: Component, ...rest }) => {

  const auth = useCountState();

  return (
    <Route {...rest} render={props => (
        !auth ? 
        (<Component {...props}/>) 
        : 
        (
          <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}
          />
        )
    )}
/>
)

}

export {PrivateRoute,PrivateAdminRoute,SignedoutRoute};
export default PrivateRoute;