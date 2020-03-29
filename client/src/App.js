import React from 'react';
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import './App.css';
import Login from './Views/Login';
import Register from './Views/Register';
import Wrapper from './Views/Dashboard/Wrapper';
import Start from './Views/Start';

function App() {
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/main" component={Wrapper} />
      <Route path="/" component={Start} />
      <Redirect exact to="/" />
    </Switch>
  )

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            {routes}
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
