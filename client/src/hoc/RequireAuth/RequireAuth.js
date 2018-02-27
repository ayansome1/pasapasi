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
            console.log("loading before redirect")

               return <div>Loading...</div>
           }
           if(!isAuthenticated) {
            console.log("Redirect")
               return <Redirect to="/login" />
           }
           return <Component {...this.props} /> 
        }
    } 

} 

export default  RequireAuth ;
