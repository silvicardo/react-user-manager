import React from 'react';
import UsernameLabel from "../components/common/UsernameLabel";

export default {
    title: 'UsernameLabel',
    component: UsernameLabel,
    argTypes: {
        className: {control: 'text'}
    },
};

const Template = (args) => <UsernameLabel {...args} />;

export const Default = Template.bind({});

Default.args = {

};

