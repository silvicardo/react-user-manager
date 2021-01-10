import React from 'react';
import UserListItem from '../../common/UserListItem';
import UserEditPageLink from "./UserEditPageLink";
import lang from "../../../lang";

export const AllUsersList = ({className = '', users}) => {

    if(users.length === 0) return <h2>{lang.users.emptyList}</h2>

    return (
        <ul className={`all-users-list list-group ${className}`}>
            {users.map(user => (
                <UserListItem
                    key={user.id}
                    className={'list-group-item'}
                >
                    <UserEditPageLink id={user.id}>
                        {user.name}
                    </UserEditPageLink>
                </UserListItem>
            ))}
        </ul>
    );
};

export default AllUsersList;