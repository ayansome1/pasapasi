import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';

class Home extends Component {
	state = { loading: true };

	componentDidMount() {
		const getLocation = () => {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(
					data => {
						resolve(data.coords);
					},
					err => {
						reject(err);
					}
				);
			});
		};

		const getNearByPeople = () => {
			getLocation().then(data => {
				console.log(data);

				axios
					.get('/nearby-people/lat/' + data.latitude + '/lng/' + data.longitude)
					.then(response => {
						console.log('nearby people: ', response.data);
						this.setState({ loading: false, people: response.data.nearByPeople });
					})
					.catch(err => {
						console.log('error in getting nearby people');
					});
			});
		};

		getNearByPeople();

		this.likedHandler = (likedUserId) =>{
			console.log("like clicked",likedUserId);
			axios
			.post('/like/'+likedUserId)
			.then(response=>{
				console.log("liked");
			}).catch(err=>{
				console.log('error in updating like');
			});
		}
	}

	render() {



		if (this.state.loading) {
			return <div>Loading...</div>;
		} else {
			return this.state.people.map((item, index) => {
				return (
					<div className="col-xs-12 col-sm-4" key={index}>
						{item.first_name}
						<br />
						<a href={item.fb_link} target="_blank">
							fb profile
						</a>
						<br />
						{item.distance.toFixed(2)} km away
						<br />
						{item.gender}
						<br />
						Last active : <Moment fromNow ago>{item.last_active}</Moment> ago
						<br/>
						<img src={"https://graph.facebook.com/" + item.fb_id + "/picture?height=100&width=100"}/> 
						<br/>
						<i className="fa fa-heart" onClick={() => this.likedHandler(item.user_id)}></i>
						<i className="fa fa-heart-o"></i>


					</div>
				);
			});
		}
	}
}

export default Home;
