import React from 'react';
import EditableFriendsList from "../../../components/common/sections/friendshipsEditor/EditableFriendsList";

export default {
    title: 'Sections/FriendshipsEditor/EditableFriendsList',
    component: EditableFriendsList,
    argTypes: {
        className: {control: 'text'},
        onUnfriendClick: {action: 'onUnfriendClick'},
    },
};

const Template = (args) => <EditableFriendsList {...args} />;

export const EditableFriendsListStory = Template.bind({});

EditableFriendsListStory.args = {
    friends: [
        {id: 2, name : 'Giacomo Mosca'},
        {id: 3, name: 'Riccardo Silvi'}
    ]
};

