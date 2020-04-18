import React from "react";
import {isMobileOnly} from 'react-device-detect';


const DeviceContext = React.createContext();

const DeviceContextProvider = ({children}) => {
    const value = {
        isMobileOnly,
        toastPosition : isMobileOnly ? 'bottom-center' : 'top-right'
    };
    return (
        <DeviceContext.Provider value={value}>
            {children}
        </DeviceContext.Provider>
    );
};

const useDeviceContext = () => {
    const context = React.useContext(DeviceContext);
    if (context === undefined) {
        throw new Error("useSessionState must be used within a DeviceContextProvider");
    }
    return context;
};

export {DeviceContextProvider,useDeviceContext};