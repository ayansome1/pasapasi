import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


import axios from 'axios';

class Login extends Component {

    state = {
        isAuthenticated: false,
        isLoading: true
    }

        componentDidMount() {
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
           const { isAuthenticated, isLoading } = this.state;
           if(isLoading) {
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