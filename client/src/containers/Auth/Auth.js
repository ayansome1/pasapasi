import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import FacebookLogin from 'react-facebook-login';

// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import classes from './Auth.css';
import * as actions from '../../store/actions/index';
// import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {};

    componentDidMount() {
        // if (this.props.authRedirectPath !== '/') {
        //     this.props.onSetAuthRedirectPath();
        // }
    }

    responseFacebook = response => {
        console.log(response);
    };

    componentClicked = response => {
        console.log(response);
    };

    render() {
        /*        if (this.props.loading) {
            form = <Spinner />;
        }*/

        // let errorMessage = null;

        // if (this.props.error) {
        //     errorMessage = <p>{this.props.error.message}</p>;
        // }

        // let authRedirect = null;
        // if (this.props.isAuthenticated) {
        //     authRedirect = <Redirect to={this.props.authRedirectPath} />;
        // }

        return (
            <div>
                <a href={"http://localhost/pasapasi/api/auth/facebook"}>
                    login with facebook
                </a>

            </div>

            /*<div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>*/
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building/*,
        authRedirectPath: state.auth.authRedirectPath,*/
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
