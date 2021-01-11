import React from 'react';
import SelectableFriendsList from "../../../components/common/sections/friendshipsEditor/SelectableFriendsList";

export default {
    title: 'Sections/FriendshipsEditor/SelectableFriendsList',
    component: SelectableFriendsList,
    argTypes: {
        className: {control: 'text'},
        onPickFriendClick: {action: 'onPickFriendClick'},
    },
};

const Template = (args) => <SelectableFriendsList {...args} />;

export const SelectableFriendsListStory = Template.bind({});

SelectableFriendsListStory.args = {
    users: [
        {id: 2, name : 'Giacomo Mosca'},
        {id: 3, name: 'Riccardo Silvi'}
    ]
};

