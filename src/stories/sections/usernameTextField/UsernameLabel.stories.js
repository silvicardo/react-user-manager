import React from 'react';
import UsernameLabel from "../../../components/common/sections/usernameTextField/UsernameLabel";

export default {
    title: 'Sections/UsernameTextField/UsernameLabel',
    component: UsernameLabel,
    argTypes: {
        className: {control: 'text'}
    },
};

const Template = (args) => <UsernameLabel {...args} />;

export const Default = Template.bind({});

Default.args = {

};

