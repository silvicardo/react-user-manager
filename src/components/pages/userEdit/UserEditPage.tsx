import React from "react";
import { useParams } from "react-router";
import useEditCreateUser from "../../../hooks/useEditCreateUser";
import { useHistory } from "react-router-dom";
import UserEditView from "./components/UserEditView";

interface IUserEditPage {
  className?: string;
}

const UserEditPage: React.FC<IUserEditPage> = ({ className = "" }) => {
  const history = useHistory();

  let { userid } = useParams<{ userid: string }>();

  const [
    friends,
    notFriends,
    storedUsername,
    nextUsername,
    onNextUsernameChange,
    onSetUserToBeFriend,
    onSetUserToBeUnrelated,
    submit,
    isSubmitting,
    submitError,
  ] = useEditCreateUser(userid);

  const onSubmit = async () => {
    try {
      const res = await submit();
      history.push("/");
    } catch (e) {
      //LOG TO SERVICE...
    }
  };

  return (
    <UserEditView
      className={className}
      userId={userid}
      onSubmit={onSubmit}
      submitError={submitError}
      storedUsername={storedUsername}
      nextUsername={nextUsername}
      onNextUsernameChange={onNextUsernameChange}
      friends={friends}
      notFriends={notFriends}
      onSetUserToBeUnrelated={onSetUserToBeUnrelated}
      onSetUserToBeFriend={onSetUserToBeFriend}
    />
  );
};

export default UserEditPage;
