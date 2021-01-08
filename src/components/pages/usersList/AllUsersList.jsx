import React from 'react';
import UserListItem from '../../common/UserListItem';
import UserEditPageLink from "./UserEditPageLink";

export const AllUsersList = ({className = '', users}) => {

    return (
        <ul className={`all-users-list list-group ${className}`}>
            {users.map(user => (
                <UserListItem
                    key={user.id}
                    className={'list-group-item'}
                >
                    <UserEditPageLink>
                        {user.name}
                    </UserEditPageLink>
                </UserListItem>
            ))}
        </ul>
    );
};

export default AllUsersList;