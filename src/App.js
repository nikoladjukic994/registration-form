import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import {translate} from "react-switch-lang";
import "./styles/globals.scss";

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="registration" element={<Registration />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default translate(App);
