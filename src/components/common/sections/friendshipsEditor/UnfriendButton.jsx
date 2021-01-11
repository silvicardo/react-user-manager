import React from 'react';
import lang from "../../../../lang";

export const UnfriendButton = ({className = '', onClick}) => {

    return (
        <button className={`unfriend-button btn btn-danger ${className}`} onClick={onClick}>{lang.users.actions.remove}</button>
    );
};

export default UnfriendButton;