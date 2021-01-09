import React from 'react';
import PageTitle from "../../common/PageTitle";
import lang from "../../../lang";
import SaveButton from "../../common/SaveButton";
import FriendshipsEditor from "../../common/FriendshipsEditor";
import UsernameTextField from "../../common/UsernameTextField";
import {useParams} from "react-router";
import useEditUser from "../../../hooks/useEditUser";

export const UserEditPage = ({className = ''}) => {

    let { userid } = useParams();
    const [
        friends, notFriends,
        storedUsername,
        nextUsername, onNextUsernameChange,
        onSetUserToBeFriend, onSetUserToBeUnrelated,
        submit
    ] = useEditUser(userid);

    const onSubmit = async () => {
        try {
            const res = await submit()
            //TODO:: CHANGE LOCATION BACK TO HOME
        } catch (e) {
            //LOG TO SERVICE...
        }
    }

    return (
        <div className={`user-edit-page container py-3 ${className}`}>
            <div className={'d-flex justify-content-between mb-5'}>
                <PageTitle className={'text-capitalize'}>{storedUsername}</PageTitle>
                <SaveButton onClick={onSubmit} />
            </div>
            <div className={'py-3'}>
                <UsernameTextField
                    className={'edit-username-field'}
                    placeholder={`${lang.users.editName} (${})`}
                    value={nextUsername}
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