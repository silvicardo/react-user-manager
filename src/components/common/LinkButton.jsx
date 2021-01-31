import React from "react";
import { useHistory } from "react-router-dom";

export const LinkButton = ({ className = "", to = null, onClick = null, children }) => {
  const history = useHistory();

  return (
    <button
      className={`link-button ${className}`}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
        if (to) {
          history.push(to);
        }
      }}
    >
      {children}
    </button>
  );
};

export default LinkButton;
