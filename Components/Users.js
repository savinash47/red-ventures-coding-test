import React from 'react';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
require('../styles/searchBox.css');
require('../styles/users.css');

const Users = React.createClass({
	getInitialState() {
		return {
			users: '',
			allUsers: ''
		}
	},

	mapStateToTerm(event) {
		var user = this.state.allUsers.filter(function(user){
			return user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 || 
					user.id.toString().includes(event.target.value);
		});
		
		this.setState({
			users: user
		});
	},

	componentDidMount() {
		fetch('http://spa.tglrw.com:4000/users')
			.then(function(response){
				return response.json();
			}).then(function(response){
				console.log(response);
				this.setState({
					users: response,
					allUsers: response
				});
			}.bind(this)).catch(function(error){
				console.log(error);
			});
	},

	handleClickUser(id) {
		browserHistory.push('/users/'+id);
	},

	render() {
		return (
			<div className="users-page">
				<div className="page-heading">Users</div>
				<div className="search-area">
					<input placeholder="search by name or id..." className="search-box" type="text" onChange={this.mapStateToTerm} />
				</div>
				{this.state.users ?
					this.state.users.map((user,index) => {
						return <div className="user" onClick={this.handleClickUser.bind(null,user.id)} key={index}><img className="user-avatar" key={index} src={user.gravatar} /><span className="user-name"> {user.name}</span><div className="clearfix" /></div>
					})
				: 'Loading'}
			</div>
		);
	}
});

export default Users;