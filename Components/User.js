import React from 'react';
require('../styles/users.css');

const User = React.createClass({
	getInitialState() {
		return {
			user: null
		}
	},

	componentDidMount() {
		fetch('http://spa.tglrw.com:4000/users/'+this.props.params.id)
			.then(function(response){
				return response.json();
			}).then(function(response){
				console.log(response);
				console.log(response);
				this.setState({
					user: response
				});
			}.bind(this)).catch(function(error){
				console.log(error)
			});
	},

	render() {
		return (
			<div className="user-page">{this.state.user ? <div>
					<img className="user-avatar" src={this.state.user.gravatar} alt="user avatar" /> 
					<div className="clearfix">
					</div>
					<p>Name: {this.state.user.name}</p>
				</div> : ''}
			</div>
		);
	}
});

export default User;