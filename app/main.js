import React from 'react';
import ReactDOM from 'react-dom';
import {get} from 'jquery'

class Child extends React.Component {
	constructor() {
		super()
		this.state = {value: 'type something'}
	}
	onChange = e => {
		this.setState({value: e.target.value})
		get('compute', {value: e.target.value}, x => {this.setState({result: x.result})})
	};
	render() {
		return (
			<div>
				<label>Enter number:</label>
				<input type="text" value={this.state.value} onChange={this.onChange} />
				<span>{'(' + this.state.value + ')'}</span>
			</div>
		)
	}
};	
 
ReactDOM.render(<Child name="Hei" />, document.getElementById('top'));