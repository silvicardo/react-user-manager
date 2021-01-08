import React from 'react';
import SelectableFriendsList from "../components/common/SelectableFriendsList";

export default {
    title: 'SelectableFriendsList',
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

