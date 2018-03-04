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
						this.setState({ loading: false, 
										people: response.data.nearByPeople});
						if(response.data.likeHistory){
							this.setState({likedPeople: JSON.parse(response.data.likeHistory.people_liked),
										   dislikedPeople: JSON.parse(response.data.likeHistory.people_disliked )});
						}
						else{
				              this.setState({likedPeople: [],
						 			    	  dislikedPeople: [] })
						}
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

		this.dislikedHandler = (dislikedUserId) =>{
			console.log("dislike clicked",dislikedUserId);
			axios
			.post('/dislike/'+dislikedUserId)
			.then(response=>{
				console.log("disliked");
			}).catch(err=>{
				console.log('error in updating dislike');
			});
		}
	}

	render() {


		let getLikeIcon =(user_id)=>{

			console.log(user_id);


			if( this.state.dislikedPeople && this.state.dislikedPeople.indexOf(user_id)>-1 ){
				return (<i className="fa fa-heart-o" onClick={() => this.likedHandler(user_id)}></i>);
			}

			else if( this.state.likedPeople && this.state.likedPeople.indexOf(user_id)>-1 ){
				return (<i className="fa fa-heart" onClick={() => this.dislikedHandler(user_id)}></i>);
			}
			else{
				return (<i className="fa fa-heart-o" onClick={() => this.likedHandler(user_id)}></i>);

			}
		}



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
						{getLikeIcon(item.user_id)}
			{/*			<i className="fa fa-heart" onClick={() => this.likedHandler(item.user_id)}></i>
						<i className="fa fa-heart-o" onClick={() => this.dislikedHandler(item.user_id)}></i>
*/}

					</div>
				);
			});
		}
	}
}

export default Home;
