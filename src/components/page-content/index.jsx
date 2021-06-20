import React from 'react';

import "./index.css";

const PageContent = ({ children }) => {
    return (
        <div className="page-content">
            {children}
        </div>
    )
};

export default PageContent;
