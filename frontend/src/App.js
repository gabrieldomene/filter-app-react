import React from "react";
import "./App.css";
//comment
import Header from "./Header";
import Upload from "./Upload";
import BoxName from "./BoxNames";

function App() {
	return (
		<div className="container">
			<Header className="title-header"/>
			<div className="container-inside">
				<Upload />
				<BoxName />
			</div>
		</div>
	)
}
export default App
