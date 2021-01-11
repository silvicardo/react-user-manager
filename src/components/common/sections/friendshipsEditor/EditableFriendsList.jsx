import React from 'react';
import UserListItem from "../../UserListItem";
import UnfriendButton from "./UnfriendButton";

export const EditableFriendsList = ({className = '', friends,  onUnfriendClick}) => {

    return (
        <ul data-cy={'friends-list'} className={`editable-friends-list ${className}`}>
            {friends.map(friend =>(
                <UserListItem
                    key={friend.id}
                    className={'friend mb-2'}
                >
                    {friend.name}
                    <UnfriendButton className={'btn-sm ml-2'} onClick={() => onUnfriendClick(friend.id)} />
                </UserListItem>
            ))}
        </ul>
    );
};

export default EditableFriendsList;