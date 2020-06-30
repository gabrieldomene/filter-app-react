import React, { useState, Component } from "react";
import axios from "axios";


class Upload extends Component {

	constructor(props) {
		super(props)

		this.state = {
			url: ""
		}
	}

	handleUrlChange = (event) => {
		this.setState({
			url: event.target.value
		});
	}

	handleSubmit = async event => {
		const data = {
			url: this.state.url
		}

		await axios.post("http://127.0.0.1:5000/upload", data);
		event.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="Form">
				<div>
					<label> URL Direct link</label>
					<input type="text" name="url" value={this.state.url}
					placeholder="http://example.com" onChange={this.handleUrlChange}/>
					<input type="submit" value="Upload" />
				</div>
			</form>
		)
	}
}


export default Upload;
