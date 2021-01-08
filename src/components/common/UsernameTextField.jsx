import React from 'react';
import UsernameLabel from "./UsernameLabel";
import UsernameTextInput from "./UsernameTextInput";

export const UsernameTextField = ({className = '', identifier = 'username', placeholder = '', onChange, value}) => {

    return (
        <div className={`form-group username-field ${className}`}>
            <UsernameLabel htmlFor={identifier}/>
            <UsernameTextInput onChange={onChange} value={value} id={identifier} placeholder={placeholder} />
        </div>
    );
};

export default UsernameTextField;