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
        axios.get('/loggedin').then((user) => {
          console.log("********logged in user",user);
            this.setState({isAuthenticated: true, isLoading: false});
        }).catch(() => {
            this.setState({isLoading: false});
        });
    } 

    render() {

           console.log("mounting");

           const { isAuthenticated, isLoading } = this.state;
           if(isLoading) {
            console.log("loading before redirect")

               return <div>Loading...</div>
           }


           if(!isAuthenticated) {
   		        return (
		            <div>
		                <a href={"http://localhost/pasapasi/api/auth/facebook"}>
		                    login with facebook
		                </a>

		            </div>


		        );

           }
           else{
           		return <Redirect to="/" />
           }

    }
}

export default Login;