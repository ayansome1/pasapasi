import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import RequireAuth from './hoc/RequireAuth/RequireAuth';

import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Login from './containers/Login/Login';


class App extends Component {

  componentDidMount () {
    // this.props.onTryAutoSignup();
  }

  render () {

    console.log("called");


    // let routes = (
    //   <Switch>
    //     <Route path="/auth" component={asyncAuth} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //     <Redirect to="/" />
    //   </Switch>
    // );

    // if ( this.props.isAuthenticated ) {
    //   routes = (
    //     <Switch>
    //       <Route path="/checkout" component={asyncCheckout} />
    //       <Route path="/orders" component={asyncOrders} />
    //       <Route path="/logout" component={Logout} />
    //       <Route path="/auth" component={asyncAuth} />
    //       <Route path="/" exact component={BurgerBuilder} />
    //       <Redirect to="/" />
    //     </Switch>
    //   );
    // }

    return (
      <div>
        this is app.js
{/*        <Layout>
          <Switch>
            <Route path="/" component={RequireAuth(Home)}/>
            <Route path="/profile" exact component={RequireAuth(Profile)}/>
            <Route path="/login" exact component={Login}/>
         </Switch>
        </Layout>*/}
      </div>
    );

  }
}


export default App;
