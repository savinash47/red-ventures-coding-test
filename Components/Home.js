import React from 'react';
import { browserHistory } from 'react-router';
require('../styles/home.css');

const Home = React.createClass({
	handleClickUsers() {
		browserHistory.push('users');
	},

	handleClickWidgets() {
		browserHistory.push('/widgets');
	},

	handleClickCreateWidget() {
			browserHistory.push('/createwidget');
	},

	render() {
		return (
			<div className="home-section">

				<div className="users-section" onClick={this.handleClickUsers}>
					<i className="fa fa-users fa-2x" aria-hidden="true"></i>
						<br />
						Users
				</div>
				<div className="widget-section">
					<p onClick={this.handleClickWidgets}>
						<i className="fa fa-globe fa-2x" aria-hidden="true"></i>
						<br />Widgets 
					</p>
					<p className="create-widget" onClick={this.handleClickCreateWidget}>
						<i className="fa fa-plus fa-2x" aria-hidden="true"></i>
						<br />Create a widget
					</p>	
				</div>
			</div>
		);
	}
});

export default Home;