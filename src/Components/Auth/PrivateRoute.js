import React from 'react';
import { Redirect, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history'
import {useSessionState} from "./../../Session/session";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const auth = useSessionState();

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

    const history = createBrowserHistory();

// Initialize google analytics page view tracking
    history.listen(location => {
        ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

    const auth = useSessionState();

    return (
        <Route {...rest}  history={history} render={props => (
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

  const auth = useSessionState();

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