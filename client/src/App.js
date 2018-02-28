import React, { Component } from 'react';
import { Route, Switch,BrowserRouter/*,Redirect*/} from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth/RequireAuth';
import Login from './containers/Login/Login';
import Main from './Main';

class App extends Component {
  render () {
    return (
      <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={RequireAuth(Main)} />  
                </Switch>
            </BrowserRouter>
      </div>
    );

  }
}


export default App;
