import React from "react";
import SelectFriendsButton from "../../../components/common/sections/friendshipsEditor/SelectFriendsButton";

export default {
  title: "Sections/FriendshipsEditor/SelectFriendsButton",
  component: SelectFriendsButton,
  argTypes: {
    className: { control: "text" },
    onClick: { action: "onClick" },
  },
};

const Template = (args) => <SelectFriendsButton {...args} />;

export const SelectFriendsButtonStory = Template.bind({});

SelectFriendsButtonStory.args = {};
