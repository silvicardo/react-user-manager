import React from "react";
import lang from "../../../../lang";

export const SelectFriendsButton = ({ className = "", onClick }) => {
  return (
    <button className={`select-friends-button btn btn-primary ${className}`} onClick={onClick}>
      {lang.users.actions.select}
    </button>
  );
};

export default SelectFriendsButton;
