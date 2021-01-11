import React from 'react';
import UnfriendButton from "../../../components/common/sections/friendshipsEditor/UnfriendButton";

export default {
    title: 'Sections/FriendshipsEditor/UnfriendButton',
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

