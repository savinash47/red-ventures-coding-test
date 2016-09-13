import React from 'react';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
require('../styles/searchBox.css');
require('../styles/widgets.css');
import update from 'react-addons-update';

const Widgets = React.createClass({
	getInitialState() {
		return {
			widgets: '',
			allWidgets: '',
			firstIndex: 0,
			lastIndex: 25,
		}
	},

	mapStateToTerm(event) {
		var user = this.state.allWidgets.filter(function(widget){
			return widget.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 || 
					widget.id.toString().includes(event.target.value);
		});
		
		this.setState({
			widgets: user
		});
	},

	componentDidMount() {
		fetch('http://spa.tglrw.com:4000/widgets')
			.then(function(response){
				return response.json();
			}).then(function(response){
				console.log(response);
				let lastIndex = 25;
				if(response.length < 25){
					lastIndex = response.length;
				}
				this.setState({
					widgets: response.slice(0,25),
					allWidgets: response,
					lastIndex: lastIndex
				});
			}.bind(this)).catch(function(error){
				console.log(error);
			});
	},	

	handleClick(id) {
		browserHistory.push('widgets/'+id);
	},

	render() {
		return (

			<div className="widgets-page">
				<div className="page-heading">Widgets</div>
				<input className="search-box" placeholder="search by name or id...." type="text" onChange={this.mapStateToTerm} />
				{this.state.widgets ? this.state.widgets.map((widget,index) => {
					return <p className="widgets" key={index} onClick={this.handleClick.bind(null,widget.id)}>{widget.id} &nbsp; {widget.name}</p>
				}) : ''}
				<div className="footer">
				{this.state.firstIndex > 0 
						? 
						<p className="previous" onClick={this._onClickPrevious}>
							<i className="fa fa-arrow-left" style={{fontSize:18}}></i> 
							Previous
						</p> 
						: ''
				}
				{ this.state.lastIndex < this.state.allWidgets.length 
						? 
						<p className="next" onClick={this._onClickNext}>
							Next 
							<i className="fa fa-arrow-right" style={{fontSize:18}}></i>
						</p> 
						: ''
				}
				</div>
			</div>
		);
	},

	_onClickPrevious(){

		if(this.state.firstIndex > 0){

			let newFirstIndex = this.state.firstIndex - 25;
			let newLastIndex = newFirstIndex + 25;

			this.setState({
				firstIndex: newFirstIndex,
				lastIndex: newLastIndex,
				widgets: this.state.allWidgets.slice(newFirstIndex,newLastIndex)
			});
		}
	},

	_onClickNext() {
		if(this.state.lastIndex < this.state.allWidgets.length){

			let newIndex = this.state.lastIndex + 25;

			if(newIndex < this.state.allWidgets.length){
				var newWidgets = this.state.allWidgets.slice(this.state.firstIndex+25,newIndex); 
				this.setState({
					firstIndex: this.state.firstIndex+25,
					lastIndex: newIndex,
					widgets: newWidgets
				});
			}


			else {

				let newFirstIndex = this.state.firstIndex + 25;
				let newLastIndex = this.state.allWidgets.length;

				this.setState({
					firstIndex: newFirstIndex,
					lastIndex: newLastIndex,
					widgets: this.state.allWidgets.slice(newFirstIndex,newLastIndex)
				});
			}
		}
	}
});

export default Widgets;