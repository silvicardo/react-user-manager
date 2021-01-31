import React from "react";
import UserEditView from "../../../../components/pages/userEdit/components/UserEditView";
import user from "../../../mocks/users/1/user.json";
import userFriends from "../../../mocks/users/1/friends.json";
import userNotFriends from "../../../mocks/users/1/notFriends.json";

export default {
  title: "Pages/UserEditPage/UserEditView",
  component: UserEditView,
  argTypes: {
    className: { control: "text" },
    onClick: { action: "onClick" },
    onSubmit: { action: "onSubmit" },
    onNextUsernameChange: { action: "onNextUsernameChange" },
    onSetUserToBeFriend: { action: "onSetUserToBeFriend" },
    onSetUserToBeUnrelated: { action: "onSetUserToBeUnrelated" },
  },
};

const Template = (args) => <UserEditView {...args} />;

export const UserEditViewStory = Template.bind({});

UserEditViewStory.args = {
  userId: 1,
  submitError: "",
  storedUsername: user.name,
  nextUsername: "",
  friends: userFriends,
  notFriends: userNotFriends,
};
