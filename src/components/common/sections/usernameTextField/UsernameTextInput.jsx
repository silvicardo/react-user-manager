import React from "react";

export const UsernameTextInput = ({ className = "", placeholder = "", id, onChange, value }) => {
  return (
    <input
      autoFocus={true}
      className={`username-input form-control ${className}`}
      id={id}
      type={"text"}
      placeholder={placeholder}
      name={"username"}
      onChange={onChange}
      value={value}
    />
  );
};

export default UsernameTextInput;
