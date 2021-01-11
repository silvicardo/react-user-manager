import React from 'react';
import PickFriendButton from "./PickFriendButton";
import UserListItem from "./UserListItem";

export const SelectableFriendsList = ({className = '', users : notYetFriends, onPickFriendClick}) => {

    return (
        <ul data-cy={'not-yet-friends-list'} className={`selectable-friends-list ${className}`}>
            {notYetFriends.map(user => (
                <UserListItem
                    key={user.id}
                    className={'selectable-friend mb-2'}
                >
                    {user.name}
                    <PickFriendButton className={'btn-sm ml-2'} onClick={() => onPickFriendClick(user.id)} />
                </UserListItem>
            ))}
        </ul>
    );
};

export default SelectableFriendsList;