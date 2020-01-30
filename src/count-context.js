// src/count-context.js
import React from "react";


const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();


function authReducer(state, action) {
  switch (action.type) {
    case "login": {
      console.log(action.payload);
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

function CountProvider({ children }) {

  const [state, dispatch] = React.useReducer(authReducer, null);
  
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCountState() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}


export { CountProvider, useCountState, useCountDispatch };
