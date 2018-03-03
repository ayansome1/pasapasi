import React, { Component } from 'react';
import axios from 'axios';
import { Bootstrap, Grid, Row, Col } from 'react-bootstrap';

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
						this.setState({ loading: false, people: response.data });
					})
					.catch(err => {
						console.log('error in getting nearby people');
					});
			});
		};

		getNearByPeople();
	}

	render() {
		if (this.state.loading) {
			return <div>Loading...</div>;
		} else {

			return (
				<Grid>
							
						{this.state.people.map((item, index) => {
							
									return <Row className="show-grid">
										<Col xs={12} sm={6} key={index}>
											{item.first_name}
											<br />
											<a href={item.fb_link} target="_blank">
												fb profile
											</a>
											<br />
											{item.distance}
											<br />
											{item.gender}
											<br />
											{item.last_active}
										</Col>
									</Row>
						})}




				</Grid>
			);

			/*return this.state.people.map((item, index) => {
				return (
					<Grid>
						<Row className="show-grid">
							<Col xs={3} sm={3} key={index}>
								{item.first_name}
								<br />
								<a href={item.fb_link} target="_blank">
									fb profile
								</a>
								<br />
								{item.distance}
								<br />
								{item.gender}
								<br />
								{item.last_active}
							</Col>
						</Row>
					</Grid>
				);
			});*/



		}
	}
}

export default Home;
