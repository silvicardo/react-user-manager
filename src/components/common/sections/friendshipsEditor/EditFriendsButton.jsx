import React from "react";
import lang from "../../../../lang";

export const EditFriendsButton = ({ className = "", onClick }) => {
  return (
    <button className={`edit-friends-button btn btn-info ${className}`} onClick={onClick}>
      {lang.users.actions.edit}
    </button>
  );
};

export default EditFriendsButton;
