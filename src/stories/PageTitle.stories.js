import React from "react";
import lang from "../lang";
import PageTitle from "../components/common/PageTitle";

export default {
  title: "PageTitle",
  component: PageTitle,
  argTypes: {
    className: { control: "text" },
  },
};

const Template = (args) => <PageTitle {...args} />;

export const UsersListPageTitle = Template.bind({});

UsersListPageTitle.args = {
  className: "text-capitalize",
  children: lang.users.list,
};

export const CreateUserPageTitle = Template.bind({});

CreateUserPageTitle.args = {
  children: lang.users.new,
};

export const EditUserPageTitle = Template.bind({});

EditUserPageTitle.args = {
  children: "Riccardo Silvi",
};
