import React from 'react';
import App from "../components/App";

export default {
  title: 'Example/App',
  component: App,
};

const Template = (args) => <App {...args} />;

export const ExampleStory = Template.bind({});

ExampleStory.args = {

};

