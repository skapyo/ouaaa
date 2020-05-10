import React from 'react';

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";



const withDndProvider = Component => (props) => {
 
    return (
      <DndProvider backend={Backend}>
        <Component {...props}/>
      </DndProvider>
    );
  };

export default withDndProvider;