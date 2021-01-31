import React from "react";
import FriendshipsEditor from "../../../components/common/sections/friendshipsEditor/FriendshipsEditor";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Sections/FriendshipsEditor/FriendshipsEditor",
  component: FriendshipsEditor,
  argTypes: {
    className: { control: "text" },
    onPickFriendClick: { action: "onPickFriendClick" },
    onUnfriendClick: { action: "onUnfriendClick" },
    onCreateNewUserClick: { action: "onCreateNewUserClick" },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = (args) => <FriendshipsEditor {...args} />;

export const WithUserId = Template.bind({});

WithUserId.args = {
  userId: 1,
  friends: [
    { id: 2, name: "Giacomo Mosca" },
    { id: 3, name: "Riccardo Silvi" },
  ],
  notYetFriends: [
    { id: 4, name: "Giuseppe Conte" },
    { id: 5, name: "Giulio Santi" },
  ],
};

export const NoUserId = Template.bind({});

NoUserId.args = {
  friends: [],
  notYetFriends: [
    { id: 4, name: "Giuseppe Conte" },
    { id: 5, name: "Giulio Santi" },
  ],
};
