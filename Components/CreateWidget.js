import React from 'react';
require('../styles/input.css');
require('../styles/createwidget.css');

const CreateWidget = React.createClass({
	getInitialState() {
		return {
			name: '',
			inventory: "0",
			price: '',
			melts: false,
			color: '',
			warning: null
		}
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

	handleSubmit() {
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
		} else if(this.state.melts === false){
			this.setState({
				warning: "Please select the melts box"
			})
		} else {
			fetch('http://spa.tglrw.com:4000/widgets',{
				method: 'post',
				headers: {
        			'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: this.state.name,
					color: this.state.color,
					price: this.state.price,
					inventory: this.state.inventory,
					melts: this.state.melts
				})
			}).then(function(response){
				if(response.ok){
					this.setState({
						warning: "The widget has been created",
						name: '',
						inventory: "0",
						price: '',
						melts: false,
						color: ''
					})
				}
				return response;
			}.bind(this)).then(function(response){
				console.log(response);
			}).catch(function(error){
				console.log(error.toString());
			});
		} 
		
	},

	render() {
		return (
			<div>
				<div className="widget-heading">Create Your Own Widget</div>
				<div className="create-widget-area">
					{this.state.warning ? <span className="warning">{this.state.warning}</span> : ''}
					<span><label>Name</label><input className="input" name="name" onChange={this.onChangeHandler} type="text" value={this.state.name} /></span><br />
					<label>Color</label> <select className="input" defaultValue="Select a color" name="color" onChange={this.onChangeHandler}>
							<option value="Select a Color">Select a color</option>
							<option value="green">Green</option>
							<option value="magenta">Magenta</option>
							<option value="purple">Purple</option>
							<option value="white">White</option>
							<option value="red">Red</option>
						</select><br />
					<label>Price</label><input className="input" type="text" onChange={this.onChangeHandler} name="price" value={this.state.price} /><br />
					<label>Inventory</label><input className="input" name="inventory" onChange={this.onChangeHandler} type="number" value={this.state.inventory} /><br />
					<label>Melts</label><input className="input" type="checkbox" checked={this.state.melts} onChange={this.onChangeHandler} name="melts" /><br />
					<button className="submit" onClick={this.handleSubmit}>Add Widget</button>
				</div>
			</div>
		);
	}
});

export default CreateWidget;