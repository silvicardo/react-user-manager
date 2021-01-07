import React from 'react';
import UserEditPage from "../components/pages/userEdit/UserEditPage";

export default {
    title: 'Pages/UserEditPage',
    component: UserEditPage,
    argTypes: {
        className: {control: 'text'},
        onSaveClick: {action: 'onSaveClick'},
        onUnfriendClick: {action: 'onUnfriendClick'},
        onPickFriendClick: {action: 'onPickFriendClick'},
    },
};

const Template = (args) => <UserEditPage {...args} />;

export const UserEditPageStory = Template.bind({});

UserEditPageStory.args = {
    user: {
        id: 1,
        name: 'Davide Maglia'
    },
    userFriends: [
        {id: 2, name : 'Giacomo Mosca'},
        {id: 3, name: 'Riccardo Silvi'}
    ],
    notYetFriends: [
        {id: 4, name : 'Giuseppe Conte'},
        {id: 5, name: 'Giulio Santi'}
    ]
};

