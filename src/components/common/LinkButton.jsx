import React from 'react';
import {useHistory} from 'react-router-dom'

export const LinkButton = ({className = '', to, onClick= null, children}) => {

    const history = useHistory();

    return (
        <button
            className={`link-button ${className}`}
            onClick={(event) => {
                onClick && onClick(event)
                history.push(to)
            }}
        >
            {children}
        </button>
    );
};

export default LinkButton;