import React from "react";
import UsernameTextInput from "../../../components/common/sections/usernameTextField/UsernameTextInput";

export default {
  title: "Sections/UsernameTextField/UsernameTextInput",
  component: UsernameTextInput,
  argTypes: {
    className: { control: "text" },
    onChange: { action: "onChange" },
  },
};

const Template = (args) => <UsernameTextInput {...args} />;

export const Empty = Template.bind({});

Empty.args = {
  placeholder: "Use controls to type your username",
  value: "",
};

export const WithValue = Template.bind({});

WithValue.args = {
  placeholder: "Use controls to type your username",
  value: "Riccardo Silvi",
};
