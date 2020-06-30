import React, { useState, Component } from "react";
import axios from "axios";


class BoxName extends Component {

	state = {
		imageList: []
	}

	componentDidMount() {
		axios.get("http://127.0.0.1:5000/list").then(res => {
			this.setState({ imageList: res.data.name});
		})
	}

	handleRefresh = async event => {

		axios.get("http://127.0.0.1:5000/list").then(res => {
			// console.log(res)
			this.setState({ imageList: res.data.name});
		})
		event.preventDefault()
	}

	render() {
		return (
			<div className="Form">
				<select>
					{this.state.imageList.map((each_image, index) => {
						return <option key={index}>{each_image}</option>
					})}
				</select>
				<input type="button" onClick={this.handleRefresh} value="Refresh" />
				<input type="button" onClick="" value="Load" />
			</div>
		)
	}
}

export default BoxName;