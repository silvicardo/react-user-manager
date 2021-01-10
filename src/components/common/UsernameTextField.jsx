import React from 'react';
import UsernameLabel from "./UsernameLabel";
import UsernameTextInput from "./UsernameTextInput";

export const UsernameTextField = ({className = '', identifier = 'username', placeholder = '', error = '', onChange, value}) => {

    return (
        <div className={`form-group username-field ${className}`}>
            <UsernameLabel htmlFor={identifier}/>
            <UsernameTextInput className={error ? 'is-invalid' : '' } onChange={onChange} value={value} id={identifier} placeholder={placeholder} />
            <div className="invalid-feedback">{error}</div>
        </div>
    );
};

export default UsernameTextField;