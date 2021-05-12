import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import BoardView from '../views/BoardView';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import AddBoard from '../views/AddBoard';
import AddPin from '../views/AddPins';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';

// The PrivateRoute function is creating a private route and returing the specified route based on the props
// We specify the specific props we want to use in the routeChecker and pass the rest with the spread
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // when we call this function in the return, it is looking for an argument. `props` here is taco.
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
    // this render method is one we can use instead of component. Since the components are being dynamically created, we use render. Read the docs for more info: https://reactrouter.com/web/api/Route/render-func
  // Just like in the routes if we want the dynamically rendered component to have access to the Router props, we have to pass `props` as an argument.
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  user: PropTypes.any,
  component: PropTypes.any
};
export default function Routes({
  user, boards, setBoards, setPins, pins
}) {
  return (
    <Switch>
      <Route exact path='/' component={() => <Home user={user}/>} />
      <Route exact path='/not-found' component={NotFound} />
      <PrivateRoute
        user={user}
        path='/pins'
        component={() => <Pins user={user} pins={pins} boards={boards} setPins={setPins} />}
        />
      <PrivateRoute
        user={user}
        path='/add-boards'
        component={() => <AddBoard user={user} setBoards={setBoards} />}
        />
      <PrivateRoute
        user={user}
        path='/add-pins'
        component={() => <AddPin user={user} boards={boards} pins={pins} setPins={setPins} />}
        />
        <PrivateRoute
        path='/board/:id'
        user={user}
        component={() => <SingleBoard setPinBoard={setPinBoard}/>} />
      <Route exact path='/boards/' component={() => <BoardView boards={boards} setBoards={setBoards} user={user} />} />
    </Switch>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  setBoards: PropTypes.func.isRequired,
  setPins: PropTypes.func.isRequired,
  pins: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired
};
