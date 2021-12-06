import React, {memo, useState} from "react";
import {Container, Button} from "react-bootstrap";
import {translate, t} from "react-switch-lang";
import FormFirstComponent from "../../components/form/FormFirstComponent";
import FormSecondComponent from "../../components/form/FormSecondComponent";
import {
	fadeInLeft,
	fadeInRight,
	fadeOutLeft,
	fadeOutRight,
} from "react-animations";
import Radium, {StyleRoot} from "radium";

const styles = {
	fadeInLeft: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(fadeInLeft, "fadeInLeft"),
	},
	fadeInRight: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
	},
	fadeOutLeft: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(fadeOutLeft, "fadeOutLeft"),
	},
	fadeOutRight: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(fadeOutRight, "fadeOutRight"),
	},
};

const Registration = () => {
	const [currentComponent, setCurrentComponent] = useState("firstComponent");

	return (
		<Container className="section__container py-5">
			<h1 className="mb-5">{t("registration.title")}</h1>

			{currentComponent === "firstComponent" ? (
				<StyleRoot>
					<div
						style={
							currentComponent === "firstComponent"
								? styles.fadeInLeft
								: styles.fadeOutLeft
						}>
						<FormFirstComponent
							sendDataToParent={(value) => setCurrentComponent(value)}
						/>
					</div>
				</StyleRoot>
			) : (
				<StyleRoot>
					<div
						style={
							currentComponent === "firstComponent"
								? styles.fadeOutRight
								: styles.fadeInRight
						}>
						<FormSecondComponent
							sendDataToParent={(value) => setCurrentComponent(value)}
						/>
					</div>
				</StyleRoot>
			)}
		</Container>
	);
};

export default translate(memo(Registration));
