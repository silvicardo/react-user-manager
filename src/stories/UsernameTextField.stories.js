import React from 'react';
import UsernameTextField from "../components/common/UsernameTextField";

export default {
    title: 'UsernameTextField',
    component: UsernameTextField,
    argTypes: {
        className: {control: 'text'},
        onChange: { action: 'onChange' },
    },
};

const Template = (args) => <UsernameTextField {...args} />;

export const Empty = Template.bind({});

Empty.args = {
    placeholder: 'Use controls to type your username',
    value: ''
};

export const WithValue = Template.bind({});

WithValue.args = {
    placeholder: 'Use controls to type your username',
    value: 'Riccardo Silvi'
};
