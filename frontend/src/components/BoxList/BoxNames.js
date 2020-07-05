import React, { Component } from "react";
import axios from "axios";


class BoxName extends Component {

	state = {
		imageList: [],
		imageSelect: "",
		image64: null,
		imageFilter: null
	}

	componentDidMount() {
		axios.get("http://127.0.0.1:5000/list").then(res => {
			this.setState({ imageList: res.data.name});
		})
		
	}

	handleRefresh = event => {

		axios.get("http://127.0.0.1:5000/list").then(res => {
			// console.log(res)
			this.setState({ imageList: res.data.name});
		})
		event.preventDefault()
	}

	handleSelect = event => {
		
		this.setState({ imageSelect: event.target.value});
	}

	handleLoadImage = async event => {
		if (this.state.imageSelect === "") {
			alert("Can't be null");
		} else{
			const response = await axios.get(`http://127.0.0.1:5000/load/${this.state.imageSelect}`);
			this.setState({image64: response.data.b64});
		}
	}
	
	attImage = async event =>{
		if (this.state.imageSelect === "") {
			alert("Can't be null");
		} else{
			const response = await axios.get(`http://127.0.0.1:5000/${event.target.value}/${this.state.imageSelect}`);
			this.setState({imageFilter: response.data.b64});
		}
	}

	render() {
		return (
			<div className="container-el">
				<div className="content-select">
					<select onChange={this.handleSelect}>
						{this.state.imageList.map((each_image, index) => {
							return <option key={index}>{each_image}</option>
						})}
					</select>
					<input type="button" onClick={this.handleRefresh} value="Refresh" />
					<input type="button" onClick={this.handleLoadImage} value="Load" />
				</div>
				<div className="filters container-select">
					<input type="button" onClick={this.attImage} value="canny" />
					<input type="button" onClick={this.attImage} value="gaussian" />
					<input type="button" onClick={this.attImage} value="gray" />
				</div>
				<div className="container-img">
					<div className="img-orig">
						<h3>Original</h3>
						<img className="img-thumb" src={`data:image/jpeg;base64,${this.state.image64}`} alt="original" />
					</div>
					<div className="img-output">
						<h3>Output</h3>
						<img className="img-thumb" src={`data:image/jpeg;base64,${this.state.imageFilter}`} alt="modified filters" />
					</div>
				</div>
				
			</div>
		)
	}
}

export default BoxName;