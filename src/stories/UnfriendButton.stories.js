import React from 'react';
import UnfriendButton from "../components/common/UnfriendButton";

export default {
    title: 'UnfriendButton',
    component: UnfriendButton,
    argTypes: {
        className: {control: 'text'},
        onClick: { action: 'clicked' }
    },
};

const Template = (args) => <UnfriendButton {...args} />;

export const UnfriendButtonStory = Template.bind({});

UnfriendButtonStory.args = {

};

