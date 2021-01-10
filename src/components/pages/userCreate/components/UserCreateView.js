import PageTitle from "../../../common/PageTitle";
import lang from "../../../../lang";
import SaveButton from "../../../common/SaveButton";
import UsernameTextField from "../../../common/UsernameTextField";
import FriendshipsEditor from "../../../common/FriendshipsEditor";
import React from "react";
import useEditCreateUser from "../../../../hooks/useEditCreateUser";


const UserCreateView = ({className  = '', style = {}, onCreateNewUserClick, onUserSubmitSuccess }) => {

    const [
        friends, notFriends,
        storedUsername,
        nextUsername, onNextUsernameChange,
        onSetUserToBeFriend, onSetUserToBeUnrelated,
        submit, isSubmitting, submitError
    ] = useEditCreateUser();

    const onSubmit = async () => {
        try {
            const res = await submit();
            onUserSubmitSuccess(res);
        } catch (e) {
            //LOG TO SERVICE...
        }
    }

    return (
        <div className={`container py-3 ${className}`} style={style}>
            <div className={'d-flex justify-content-between w-100 mb-5'}>
                <PageTitle className={'text-capitalize'}>{lang.users.new}</PageTitle>
                <SaveButton onClick={onSubmit} />
            </div>
            <div className={'py-3'}>
                <UsernameTextField
                    error={submitError}
                    className={'create-username-field'}
                    placeholder={lang.users.typeNewName}
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
                onCreateNewUserClick={onCreateNewUserClick}
            />
        </div>
    )
}

export default UserCreateView;