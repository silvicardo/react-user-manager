import React from 'react';
import lang from "../../../../lang";

export const FriendsEditLabel = ({className = '', ...props}) => {

    return (
        <label className={`friends-edit-label ${className}`}>
            {lang.users.friends}
        </label>
    );
};

export default FriendsEditLabel;