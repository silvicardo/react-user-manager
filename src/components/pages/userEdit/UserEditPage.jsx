import React, {useState} from 'react';
import PageTitle from "../../common/PageTitle";
import lang from "../../../lang";
import SaveButton from "../../common/SaveButton";
import FriendshipsEditor from "../../common/FriendshipsEditor";
import UsernameTextField from "../../common/UsernameTextField";

export const UserEditPage = ({className = '', user, userFriends, notYetFriends, onSaveClick, onUnfriendClick, onPickFriendClick}) => {

    const [usernameFieldText, setUsernameFieldText] = useState('');

    return (
        <div className={`user-edit-page ${className}`}>
            <div className={'d-flex justify-content-between mb-5'}>
                <PageTitle className={'text-capitalize'}>{user.name}</PageTitle>
                <SaveButton onClick={onSaveClick} />
            </div>
            <div className={'py-3'}>
                <UsernameTextField
                    className={'edit-username-field'}
                    placeholder={`${lang.users.editName} (${user.name})`}
                    value={usernameFieldText}
                    onChange={(e) => setUsernameFieldText(e.target.value)}
                    identifier={'username-text-field'}
                />
            </div>
            <FriendshipsEditor
                friends={userFriends}
                notYetFriends={notYetFriends}
                onUnfriendClick={onUnfriendClick}
                onPickFriendClick={onPickFriendClick}
            />
        </div>
    );
};

export default UserEditPage;