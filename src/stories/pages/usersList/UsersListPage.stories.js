import React from 'react';
import UsersListPage from "../../../components/pages/usersList/UsersListPage";
import {BrowserRouter} from "react-router-dom";
import usersListResponse from '../../mocks/users/list/success.json'
import lang from "../../../lang";

export default {
    title: 'Pages/UsersList/UsersListPage',
    component: UsersListPage,
    argTypes: {
        className: {control: 'text'},
    },
    decorators : [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        )
    ]
};

const Template = (args) => {

    return <UsersListPage {...args} />
};

export const PageWithUsers = Template.bind({});

PageWithUsers.args = {
    users: usersListResponse,
    isFetchingUsers: false,
    apiUsersError: ''
}

export const PageWithEmptyList = Template.bind({});

PageWithEmptyList.args = {
    users: [],
    isFetchingUsers: false,
    apiUsersError: ''
};

export const PageWithApiError = Template.bind({});

PageWithApiError.args = {
    users: [],
    isFetchingUsers: false,
    apiUsersError: lang.users.emptyList
};

export const PageLoadingUsers = Template.bind({});

PageLoadingUsers.args = {
    users: [],
    isFetchingUsers: true,
    apiUsersError: ''
};

