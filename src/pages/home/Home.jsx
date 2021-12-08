import React from "react";
import {translate, t} from "react-switch-lang";
import {Link} from "react-router-dom";
import {Container, Button} from "react-bootstrap";
import Monkeys from "../../components/monkeys/Monkeys";
import {zoomIn} from "react-animations";
import Radium, {StyleRoot} from "radium";

const styles = {
	zoomIn: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(zoomIn, "zoomIn"),
	},
};

const Home = () => {
	return (
		<Container className="section__container py-sm-5">
			<Monkeys></Monkeys>

			<StyleRoot>
				<div style={styles.zoomIn}>
					<h1 className="text-center mt-5">{t("home.title")}</h1>

					<Link to="/registration" className="btn btn-primary my-5 mx-auto">
						{t("home.register")}
					</Link>
				</div>
			</StyleRoot>
		</Container>
	);
};

export default translate(Home);
