import React from 'react';
import SelectFriendsButton from "../components/common/SelectFriendsButton";

export default {
    title: 'SelectFriendsButton',
    component: SelectFriendsButton,
    argTypes: {
        className: {control: 'text'},
        onClick: {action: 'onClick'},
    },
};

const Template = (args) => <SelectFriendsButton {...args} />;

export const SelectFriendsButtonStory = Template.bind({});

SelectFriendsButtonStory.args = {};

