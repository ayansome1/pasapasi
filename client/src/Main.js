import React, { Component } from 'react';
import { Route, Switch,BrowserRouter/*,Redirect*/} from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import RequireAuth from './hoc/RequireAuth/RequireAuth';
import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';

class Main extends Component {

  render () {
    return (
      <div>
            <BrowserRouter>
                <Switch>
                    <Layout>
                      <Route path='/' exact component={ RequireAuth(Home) } />
                      <Route path='profile' exact component={RequireAuth(Profile) } />
                    </Layout>
                </Switch>
            </BrowserRouter>
      </div>
    );

  }
}


export default Main;
