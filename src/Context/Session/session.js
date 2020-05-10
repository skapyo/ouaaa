import React from "react";

const SessionStateContext = React.createContext();
const SessionDispatchContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "login": {
      return {...action.payload};
    }
    case "logout": {
      return null;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SessionProvider({ children, init=null }) {

  const [state, dispatch] = React.useReducer(authReducer, init);
  
  return (
    <SessionStateContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionStateContext.Provider>
  );
}

function useSessionState() {
  const context = React.useContext(SessionStateContext);
  if (context === undefined) {
 //   throw new Error("useSessionState must be used within a SessionProvider");
  }
  return context;
}

function useSessionDispatch() {
  const context = React.useContext(SessionDispatchContext);
  if (context === undefined) {
    throw new Error("useSessionDispatch must be used within a SessionProvider");
  }
  return context;
}


export { SessionProvider, useSessionState, useSessionDispatch };
