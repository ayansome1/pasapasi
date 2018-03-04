import React, {Component} from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import axios from 'axios';

class NavigationItems extends Component {


  logout = (event) => {


  	axios.get('/logout').then(()=>{
      // localStorage.removeItem('user_fb_id');
  		window.location = "/login";
  	}).catch(()=>{
  		console.log("ERROR");
  	});
  } 

  render(){

	    return (
		    <ul className={classes.NavigationItems}>
		        <NavigationItem link="/" exact>Home</NavigationItem>
		        <NavigationItem link="/profile" exact>Profile</NavigationItem>
		        <button onClick={this.logout}>Logout</button>
		    </ul>

	  	);
  }


}

export default NavigationItems;
