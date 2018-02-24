import React from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';


const RequireAuth = (Component) => { 

    return class App extends Component { 
        state = {
            isAuthenticated: false,
            isLoading: true
        }

        componentDidMount() {
            axios.get('/loggedin').then((user) => {
              console.log("********logged in user",user);
                this.setState({isAuthenticated: true, isLoading: false});
            }).catch(() => {
                this.setState({isLoading: false});
            })
        } 
        render() { 
           const { isAuthenticated, isLoading } = this.state;
           if(isLoading) {
               return <div>Loading...</div>
           }
           if(!isAuthenticated) {
               return <Redirect to="/login" />
           }
           return <Component {...this.props} /> 
        }
    } 

} 

export { RequireAuth }
