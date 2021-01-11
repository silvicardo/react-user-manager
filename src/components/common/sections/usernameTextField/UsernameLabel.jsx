import React from 'react';
import lang from "../../../../lang";

export const UsernameLabel = ({className = '', htmlFor, ...props}) => {

    return (<label className={`label-username ${className}`} htmlFor={htmlFor}>{lang.users.name}</label>);
};

export default UsernameLabel;