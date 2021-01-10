import React, {useState} from 'react';
import EditableFriendsList from "./EditableFriendsList";
import SelectFriendsButton from "./SelectFriendsButton";
import LinkButton from "./LinkButton";
import lang from "../../lang";
import SelectableFriendsList from "./SelectableFriendsList";
import FriendsEditLabel from "./FriendsEditLabel";
import EditFriendsButton from "./EditFriendsButton";

export const FriendshipsEditor = ({className = '', userId = null, notYetFriends , friends, onPickFriendClick, onUnfriendClick, onCreateNewUserClick = null }) => {

    const [activeView, setActiveView] = useState('edit')//pick | edit

    return (
        <div className={`friendships-editor ${className}`}>
            <FriendsEditLabel className={'text-capitalize'}/>
            <div className={'border border-dark rounded p-3'}>
                <div className={'head border-bottom border-dark py-3'}>
                    <SelectFriendsButton
                        className={`mr-2 ${activeView === 'pick' ? 'active': ''}`}
                        onClick={() => setActiveView('pick')}
                    />
                    <EditFriendsButton
                        className={`mr-2 ${activeView === 'edit' ? 'active': ''}`}
                        onClick={() => setActiveView('edit')}
                    />
                    <LinkButton
                        className={`btn btn-success`}
                        {...(userId ? {to: '/user/create'} : {})}
                        {...(onCreateNewUserClick ? {onClick: onCreateNewUserClick} : {})}
                    >
                        {lang.users.actions.add}
                    </LinkButton>
                </div>
                <div className={'body pt-3'}>
                    <div className={`pick-view ${activeView !== 'pick' ? 'd-none' : ''}`}>
                        <SelectableFriendsList
                            users={notYetFriends}
                            onPickFriendClick={onPickFriendClick}
                        />
                    </div>
                    <div className={`edit-view ${activeView !== 'edit' ? 'd-none' : ''}`}>
                        <h3 className={friends.length > 0 ? 'd-none' : '' }>{lang.users.noFriends}</h3>
                        <EditableFriendsList
                            friends={friends}
                            onUnfriendClick={onUnfriendClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendshipsEditor;