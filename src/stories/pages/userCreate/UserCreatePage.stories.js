import React from "react";
import UserCreatePage from "../../../components/pages/userCreate/UserCreatePage";
import allUsers from "../../mocks/users/list/success.json";

export default {
  title: "Pages/UserCreate/UserCreatePage",
  component: UserCreatePage,
  argTypes: {
    className: { control: "text" },
    onClick: { action: "onClick" },
  },
};

export const CorrectlyLoadedPageStory = (args) => {
  const handlers = [
    window.msw.rest.get("*/users", (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(allUsers));
    }),
  ];

  window.msw.worker.use(...handlers);

  return <UserCreatePage {...args} />;
};
