import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import UserEditPage from "./pages/userEdit/UserEditPage";
import useUsers from "../hooks/useUsers";
import lang from "../lang";
import UsersListPage from "./pages/usersList/UsersListPage";
import UserCreatePage from "./pages/userCreate/UserCreatePage";

const App: React.FC = () => {
  let { pathname } = useLocation();

  const [appUsers, isFetchingUsers, apiUsersError] = useUsers([pathname]); //on each page change refresh users

  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <UsersListPage users={appUsers} isFetchingUsers={isFetchingUsers} apiUsersError={apiUsersError} />
        </Route>
        <Route path={"/user/:userid/edit"}>
          <UserEditPage />
        </Route>
        <Route path={"/user/create"}>
          <UserCreatePage />
        </Route>
        <Route path={"*"}>
          <p>{lang.routes.notFound}</p>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
