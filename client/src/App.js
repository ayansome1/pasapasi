import React, { Component } from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';

// import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Logout from './containers/Auth/Logout/Logout';
// import * as actions from './store/actions/index';

import Auth from './containers/Auth/Auth'
import RequireAuth from './hoc/RequireAuth/RequireAuth';

import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Login from './containers/Login/Login';


// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// });

// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders');
// });

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });

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
        <Layout>
          <Switch>
          <Route path="/auth" component={Auth} />
          {/*<Route path="/checkout" component={RequireAuth(asyncCheckout)}/>*/}
          <Route path="/" exact component={RequireAuth(Home)}/>
          <Route path="/profile" exact component={RequireAuth(Profile)}/>
          <Route path="/login" exact component={Login}/>



          </Switch>

        </Layout>
      </div>
    );



  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

/*const mapDispatchToProps = dispatch => {
  return {
    // onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};*/

export default App;
// export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
