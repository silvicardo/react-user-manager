import {Switch, Route} from 'react-router-dom'
import AllUsersList from "./pages/usersList/AllUsersList";
import UserEditPage from "./pages/userEdit/UserEditPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
          <Route path={'/edit/userid'}>
            <UserEditPage />
          </Route>
          <Route>

          </Route>
          <Route path={'/'}>
            <AllUsersList />
          </Route>
          <Route path={'*'}>
              <p>Where are you going?</p>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
