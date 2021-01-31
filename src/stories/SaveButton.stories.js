import React from "react";
import SaveButton from "../components/common/SaveButton";

export default {
  title: "SaveButton",
  component: SaveButton,
  argTypes: {
    className: { control: "text" },
    onClick: { action: "onClick" },
  },
};

const Template = (args) => <SaveButton {...args} />;

export const SaveButtonStory = Template.bind({});

SaveButtonStory.args = {};
