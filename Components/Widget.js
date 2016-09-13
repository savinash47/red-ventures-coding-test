import React from 'react';
require('../styles/createwidget.css');
require('../styles/input.css');

const Widget = React.createClass({
	getInitialState() {
		return {
			id: '',
			name: '',
			inventory: 0,
			price: '',
			melts: false,
			color: '',
			warning: null
		}
	},

	componentDidMount() {
		 
		fetch('http://spa.tglrw.com:4000/widgets/'+this.props.params.id)
			.then(function(response){
				return response.json();
			}).then(function(response){
				console.log(response);
				console.log(typeof(response.melts));
				this.setState({
					id: response.id,
					name: response.name,
					color: response.color,
					price: response.price,
					inventory: response.inventory,
					melts: response.melts
				});
			}.bind(this)).catch(function(error){
				console.log(error);
		});
				
	},

	onChangeHandler(event) {
		if(event.target.name === "name"){
			this.setState({
				name: event.target.value
			});
		}
		if(event.target.name === "inventory"){
			this.setState({
				inventory: event.target.value
			});
		}
		if(event.target.name === "price"){
			this.setState({
				price: event.target.value
			});
		}
		if(event.target.name === "melts"){
			this.setState({
				melts: !this.state.melts
			});
		}
		if(event.target.name === "color"){
			this.setState({
				color: event.target.value
			});
		}
	},

	handleUpdate(event) {
		event.preventDefault();
		if(this.state.name === ''){
			this.setState({
				warning: "Name field Cannot be empty"
			});
		} else if(this.state.color === ''){
			this.setState({
				warning: "Please select a color"
			})
		} else if(this.state.price === ''){
			this.setState({
				warning: "Please select a price"
			})
		} else {
			fetch('http://spa.tglrw.com:4000/widgets/'+ this.state.id,{
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: this.state.name,
					color: this.state.color,
					price: this.state.price,
					inventory: this.state.inventory,
					melts: this.state.melts
				})
			}).then(function(response){
				if(!response.ok){
					throw new Error(response.statusText);
				}
			}).catch(function(error){
				console.log(error);
			});
		}
	},

	render() {
		return (
			<div>
				<div className="widget-heading">You can update the widget here</div>
				<div className="create-widget-area">
					{this.state.warning ? <span className="warning">{this.state.warning}</span> : ''}
					<label>Name</label><input className="input" name="name" onChange={this.onChangeHandler} type="text" value={this.state.name} /><br />
					<label>Color </label><select className="input" name="color" defaultValue={this.state.color} onChange={this.onChangeHandler}>
							<option value="green">Green</option>
							<option value="magenta">Magenta</option>
							<option value="purple">Purple</option>
							<option value="white">White</option>
							<option value="red">Red</option>
						</select><br />
					<label>Price</label><input className="input" type="text" onChange={this.onChangeHandler} name="price" value={this.state.price} /><br />
					<label>Inventory</label><input className="input" name="inventory" onChange={this.onChangeHandler} type="number" value={this.state.inventory} /><br />
					<label>Melts</label><input className="input" type="checkbox" checked={this.state.melts} onChange={this.onChangeHandler} name="melts" /><br />
					<button className="submit" onClick={this.handleUpdate}>Update</button>
				</div>
			</div>
		);
	}
});

export default Widget;