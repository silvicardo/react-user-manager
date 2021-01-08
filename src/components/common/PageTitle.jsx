import React from 'react';

export const PageTitle = ({className = '', children}) => {

    return <h1 className={`page-title ${className}`}>{children}</h1>;
};

export default PageTitle;