import React from 'react';
import { ScaleLoader } from "halogenium";

const Loader = ({ midHeightString }) => {
    return (
      <div
        style={{ width: "100%", "text-align": "center", margin: midHeightString }}
      >
        <div style={{ display: "inline-block" }}>
          <ScaleLoader color="#10A29B" size="20px" margin="2px" />
        </div>
      </div>
    );
  };

  export default Loader;