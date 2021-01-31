import React from "react";
import UserEditPage from "../../../components/pages/userEdit/UserEditPage";
import allUsers from "../../mocks/users/list/success.json";
import user from "../../mocks/users/1/user.json";
import userFriends from "../../mocks/users/1/friends.json";
import userNotFriends from "../../mocks/users/1/notFriends.json";
import { MemoryRouter, Route } from "react-router-dom";

//just showing an example of msw service worker usage in storybook + faking react router data

const userId = 1;

export default {
  title: "Pages/UserEditPage",
  component: UserEditPage,
  argTypes: {
    className: { control: "text" },
    onSaveClick: { action: "onSaveClick" },
    onUnfriendClick: { action: "onUnfriendClick" },
    onPickFriendClick: { action: "onPickFriendClick" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[`/user/${userId}/edit`]}>
        <Route path={"/user/:userid/edit"}>
          <Story />
        </Route>
      </MemoryRouter>
    ),
  ],
};

export const CorrectlyLoadedPageStory = (args) => {
  const handlers = [
    window.msw.rest.get("*/users", (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(allUsers));
    }),
    window.msw.rest.get(`*/users/${userId}`, (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(user));
    }),
    window.msw.rest.get(`*/user/${userId}/friends`, (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userFriends));
    }),
    window.msw.rest.get(`*/user/${userId}/not-friends`, (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userNotFriends));
    }),
  ];

  window.msw.worker.use(...handlers);

  return <UserEditPage {...args} />;
};
