import React from "react";
import "./App.css";
//comment
import Header from "./components/Header/Header";
import Upload from "./components/Downloader/Upload";
import BoxName from "./components/BoxList/BoxNames";

function App() {
	return (
		<div className="container">
			<Header className="title-header"/>
			<Upload />
			<BoxName />
		</div>
	)
}
export default App
