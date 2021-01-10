import React from 'react';
import UserListItem from '../../common/UserListItem';
import UserEditPageLink from "./UserEditPageLink";
import lang from "../../../lang";

export const AllUsersList = ({className = '', users}) => {

    return (
        <div className={`${className}`}>
            <h2 className={users.length > 0 ? 'd-none': ''}>{lang.users.emptyList}</h2>
            <ul className={`all-users-list list-group `}>
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
        </div>
    );
};

export default AllUsersList;