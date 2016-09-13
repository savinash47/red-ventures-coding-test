import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Users from '../Components/Users.js';
import User from '../Components/User.js';
import Home from '../Components/Home.js';
import Widgets from '../Components/Widgets.js';
import CreateWidget from '../Components/CreateWidget.js';
import Widget from '../Components/Widget.js';

render(<Router history={browserHistory}>
			<Route path="/" component={Home} />
			<Route path="users" component={Users} />
			<Route path="users/:id" component={User} />
			<Route path="widgets" component={Widgets} />
			<Route path="widgets/:id" component={Widget} />
			<Route path="createwidget" component={CreateWidget} />
	 </Router>,document.getElementById('main'));