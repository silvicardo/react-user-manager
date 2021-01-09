import React from 'react';
import PageTitle from "../../common/PageTitle";
import lang from "../../../lang";
import SaveButton from "../../common/SaveButton";
import FriendshipsEditor from "../../common/FriendshipsEditor";
import UsernameTextField from "../../common/UsernameTextField";
import useUserEditor from "../../../hooks/useUserEditor";
import {useParams} from "react-router";
import useUserSubmit from "../../../hooks/useUserSubmit";

export const UserEditPage = ({className = ''}) => {

    let { userid } = useParams();
    const {state: {stored, next}, friends, notFriends, onNextUsernameChange, onSetUserToBeFriend, onSetUserToBeUnrelated} = useUserEditor(userid);
    const [onSubmit, isSubmitting, submitError] = useUserSubmit(userid);

    return (
        <div className={`user-edit-page container py-3 ${className}`}>
            <div className={'d-flex justify-content-between mb-5'}>
                <PageTitle className={'text-capitalize'}>{stored.username}</PageTitle>
                <SaveButton onClick={onSubmit} />
            </div>
            <div className={'py-3'}>
                <UsernameTextField
                    className={'edit-username-field'}
                    placeholder={`${lang.users.editName} (${stored.username})`}
                    value={next.username}
                    onChange={(e) => onNextUsernameChange(e.target.value)}
                    identifier={'username-text-field'}
                />
            </div>
            <FriendshipsEditor
                friends={friends}
                notYetFriends={notFriends}
                onUnfriendClick={onSetUserToBeUnrelated}
                onPickFriendClick={onSetUserToBeFriend}
            />
        </div>
    );
};

export default UserEditPage;