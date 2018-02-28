import React, { Component } from 'react';
import axios from 'axios';
// import Aux from '../../hoc/Aux/Aux';

class Home extends Component {

	state = {loadingLocation:true,locationAvailability : false};

	componentDidMount(){

		const updateUserLocation = (lat,lng) => {
			return new Promise((resolve, reject) => {
					axios.post('/location',{lat:lat,lng:lng}).then(()=>{
						console.log("location updated in db");
						resolve();
					}).catch((err)=>{
						console.log("error in updating user location in db");
						reject(err);
					});
					
			});
		}


		const showPosition = (position) => {

			updateUserLocation(position.coords.latitude,position.coords.longitude).then(()=>{
				console.log("$$$$$$$updated user location");

			},(err)=>{
				console.log("$$$$$$$$$error in updating user location");
			});

			 this.setState({locationAvailability:true,
							loadingLocation:false,
							lat:position.coords.latitude,
							lng:position.coords.longitude});
		};

		 const getLocation = () => {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition);
		    } else { 
				this.setState({loadingLocation:false,locationAvailability:false});
		    	console.log("Geolocation is not supported by this browser.");
		    }
		}

		getLocation();
	}

    render () {

    	if(this.state.loadingLocation){
    		return(<div>loading location</div>);
    	}
    	else if(!this.state.locationAvailability){
    		return(<div>Geolocation is not supported by this browser.</div>);
    	}
    	else{
    		return(
    			<div>
    				Lat:{this.state.lat} 
    				<br/> 
    				Long:{this.state.lng}
    			</div>
    			);    		
    	}
    }
}

export default Home;