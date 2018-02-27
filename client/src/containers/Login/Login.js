import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


import axios from 'axios';

class Login extends Component {

    state = {
        isAuthenticated: false,
        isLoading: true
    }

        componentDidMount() {
            console.log("mounting");
            axios.get('/loggedin').then((res) => {
              console.log("********logged in user",res.data);
              if(res.data !== false){
                this.setState({isAuthenticated: true, isLoading: false});
              }
              else{
                this.setState({isLoading: false});
              }
            }).catch(() => {
                this.setState({isLoading: false});
            });
        }

    render() {

           console.log("mounting");

           const { isAuthenticated, isLoading } = this.state;
           if(isLoading) {
            console.log("login::::::::::loading before redirect")

               return <div>Loading...</div>
           }


           if(!isAuthenticated) {
            console.log("login::::::::::not Authenticated");

   		        return (
		            <div>
		                <a href={"http://localhost/pasapasi/api/auth/facebook"}>
		                    login with facebook
		                </a>

		            </div>


		        );

           }
           else{
            console.log("login::::::::::Authenticated");

           		return <Redirect to="/" />
           }

    }
}

export default Login;