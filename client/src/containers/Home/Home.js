import React, { Component } from 'react';

// import Aux from '../../hoc/Aux/Aux';

class Home extends Component {

	state = {loadingLocation:true,locationAvailability : false};

	componentDidMount(){
		const showPosition = (position) => {

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