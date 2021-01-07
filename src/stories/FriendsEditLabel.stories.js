import React from 'react';
import FriendsEditLabel from "../components/common/FriendsEditLabel";

export default {
    title: 'FriendsEditLabel',
    component: FriendsEditLabel,
    argTypes: {
        className: {control: 'text'},
    },
};

const Template = (args) => <FriendsEditLabel {...args} />;

export const FriendsEditLabelStory = Template.bind({});

FriendsEditLabelStory.args = {};

