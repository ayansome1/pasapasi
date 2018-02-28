import React, { Component } from 'react';
import { Route, Switch,BrowserRouter/*,Redirect*/} from 'react-router-dom';


// import Layout from './hoc/Layout/Layout';
import RequireAuth from './hoc/RequireAuth/RequireAuth';

// import Home from './containers/Home/Home';
// import Profile from './containers/Profile/Profile';
import Login from './containers/Login/Login';
import Main from './Main';


class App extends Component {

  componentDidMount () {

  }

  render () {
    return (
      <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={RequireAuth(Main)} />  


{/*
                    <Layout>
                      <Route path='/' exact component={ RequireAuth(Home) } />
                      <Route path='/profile' exact component={RequireAuth(Profile) } />
                      <Route path="/login" exact component={Login}/>
                    </Layout>*/}

                </Switch>
            </BrowserRouter>
      </div>
    );

  }
}


export default App;
