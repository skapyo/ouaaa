import React from 'react';

const Hidden = ({children, hide}) => {
    if(hide) return null;
    return children;
};

export default Hidden;