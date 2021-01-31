import React from "react";
import lang from "../../../../lang";

export const PickFriendButton = ({ className = "", onClick }) => {
  return (
    <button className={`pick-friend-button btn btn-info ${className}`} onClick={onClick}>
      {lang.users.actions.pick}
    </button>
  );
};

export default PickFriendButton;
