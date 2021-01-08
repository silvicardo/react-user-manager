import React from 'react';
import FriendshipsEditor from "../components/common/FriendshipsEditor";

export default {
    title: 'FriendshipsEditor',
    component: FriendshipsEditor,
    argTypes: {
        className: {control: 'text'},
        onPickFriendClick: {action: 'onPickFriendClick'},
        onUnfriendClick: {action: 'onUnfriendClick'},
    },
};

const Template = (args) => <FriendshipsEditor {...args} />;

export const FriendshipsEditorStory = Template.bind({});

FriendshipsEditorStory.args = {
    friends: [
        {id: 2, name : 'Giacomo Mosca'},
        {id: 3, name: 'Riccardo Silvi'}
    ],
    notYetFriends: [
        {id: 4, name : 'Giuseppe Conte'},
        {id: 5, name: 'Giulio Santi'}
    ]
};

