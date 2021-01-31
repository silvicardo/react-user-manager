import React from "react";

export const UserListItem = ({ className = "", children }) => {
  return <li className={`user-list-item ${className}`}>{children}</li>;
};

export default UserListItem;
