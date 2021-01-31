import React from "react";
import FriendsEditLabel from "../../../components/common/sections/friendshipsEditor/FriendsEditLabel";

export default {
  title: "Sections/FriendshipsEditor/FriendsEditLabel",
  component: FriendsEditLabel,
  argTypes: {
    className: { control: "text" },
  },
};

const Template = (args) => <FriendsEditLabel {...args} />;

export const FriendsEditLabelStory = Template.bind({});

FriendsEditLabelStory.args = {};
