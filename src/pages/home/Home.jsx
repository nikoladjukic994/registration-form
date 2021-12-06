import React, {memo, useState} from "react";
import {Container, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {translate, t} from "react-switch-lang";

const Home = () => {
	return (
		<Container className="section__container py-5">
			<h1 className="mb-5">{t("home.title")}</h1>

			<Link to="/registration" className="btn btn-primary btn__red">
				{t("home.register")}
			</Link>
		</Container>
	);
};

export default translate(memo(Home));
