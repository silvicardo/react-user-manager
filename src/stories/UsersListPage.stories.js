import React from 'react';
import UsersListPage from "../components/pages/usersList/UsersListPage";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Pages/UsersListPage',
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

const Template = (args) => <UsersListPage {...args} />;

export const UsersListPageStory = Template.bind({});

UsersListPageStory.args = {
    users: [
        {id: 1, name : 'Davide Maglia'},
        {id: 2, name : 'Giacomo Mosca'},
        {id: 3, name: 'Riccardo Silvi'},
        {id: 4, name : 'Giuseppe Conte'},
        {id: 5, name: 'Giulio Santi'}
    ]
};

