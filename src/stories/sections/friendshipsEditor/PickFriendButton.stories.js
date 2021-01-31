import React from "react";
import PickFriendButton from "../../../components/common/sections/friendshipsEditor/PickFriendButton";

export default {
  title: "Sections/FriendshipsEditor/PickFriendButton",
  component: PickFriendButton,
  argTypes: {
    className: { control: "text" },
    onClick: { action: "onClick" },
  },
};

const Template = (args) => <PickFriendButton {...args} />;

export const PickFriendButtonStory = Template.bind({});

PickFriendButtonStory.args = {};
