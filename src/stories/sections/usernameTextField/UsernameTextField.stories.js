import React from 'react';
import UsernameTextField from "../../../components/common/sections/usernameTextField/UsernameTextField";
import lang from "../../../lang";

export default {
    title: 'Sections/UsernameTextField/UsernameTextField',
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

export const WithNoDuplicatesError = Template.bind({});

WithNoDuplicatesError.args = {
    error: lang.server.editCreate.errors.noDuplicates,
    placeholder: 'Use controls to type your username',
    value: 'Riccardo Silvi'
};

export const WithNotUsersFaultError = Template.bind({});

WithNotUsersFaultError.args = {
    error: lang.server.editCreate.errors.notUsersFault,
    placeholder: 'Use controls to type your username',
    value: 'Riccardo Silvi'
};
