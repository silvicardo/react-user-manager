import React from 'react';
import {Link} from "react-router-dom";

export const UserEditPageLink = ({id, children}) => {

    return <Link to={`/user/${id}/edit`}>{children}</Link>;
};

export default UserEditPageLink;