import React from 'react';
import lang from "../../lang";

export const SaveButton = ({className = '', onClick}) => {

    return (
        <button
            className={`save-button btn btn-success ${className}`}
            onClick={onClick}
        >
            {lang.users.actions.create}
        </button>
    );
};

export default SaveButton;