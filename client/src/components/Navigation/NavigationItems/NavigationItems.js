import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

import axios from 'axios';

// const navigationItems = ( props ) => (
//     <ul className={classes.NavigationItems}>
//         <NavigationItem link="/" exact>Home</NavigationItem>
//         <NavigationItem link="/profile" exact>Profile</NavigationItem>
//         <NavigationItem link="/login">Logout</NavigationItem>
//     </ul>
// );

// export default navigationItems;


class NavigationItems extends Component {

	state = {
	    isLoggedOut: false,
	    isLoading: true
	}	


  componentDidMount () {

  }


  logout = (event) => {
  	console.log("logout");
  	axios.get('/logout').then(()=>{
  		this.setState({isLoggedOut: true,isLoading:false})
  	}).catch(()=>{
  		this.setState({isLoading:false})
  	});
  } 

  render(){

	  	if(this.state.isLoggedOut){
	          return <Redirect to="/login" />
	  	}
	  	else{
		    return (
			    <ul className={classes.NavigationItems}>
			        <NavigationItem link="/" exact>Home</NavigationItem>
			        <NavigationItem link="/profile" exact>Profile</NavigationItem>
			        <button onClick={this.logout}>Logout</button>
			    </ul>

		  	);
	  	}

  }


}

export default NavigationItems;
