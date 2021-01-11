import React from 'react';
import PageTitle from "../../../common/PageTitle";
import SaveButton from "../../../common/SaveButton";
import UsernameTextField from "../../../common/sections/usernameTextField/UsernameTextField";
import lang from "../../../../lang";
import FriendshipsEditor from "../../../common/sections/friendshipsEditor/FriendshipsEditor";

export const UserEditView = ({className = '', ...props}) => {

    return (
        <div className={`user-edit-page container py-3 ${className}`}>
            <div className={'d-flex justify-content-between mb-5'}>
                <PageTitle className={'text-capitalize'}>{props.storedUsername}</PageTitle>
                <SaveButton onClick={props.onSubmit} />
            </div>
            <div className={'py-3'}>
                <UsernameTextField
                    error={props.submitError}
                    className={'edit-username-field'}
                    placeholder={`${lang.users.editName} (${props.storedUsername})`}
                    value={props.nextUsername}
                    onChange={(e) => props.onNextUsernameChange(e.target.value)}
                    identifier={'username-text-field'}
                />
            </div>
            <FriendshipsEditor
                userId={props.userId}
                className={!props.storedUsername ? 'd-none' : ''}
                friends={props.friends}
                notYetFriends={props.notFriends}
                onUnfriendClick={props.onSetUserToBeUnrelated}
                onPickFriendClick={props.onSetUserToBeFriend}
            />
        </div>
    );
};

export default UserEditView;