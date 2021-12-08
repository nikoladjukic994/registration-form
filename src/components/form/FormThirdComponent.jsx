import React from "react";
import classes from "./Forms.module.scss";
import {translate, t} from "react-switch-lang";
import {Link} from "react-router-dom";
import {zoomIn} from "react-animations";
import Radium, {StyleRoot} from "radium";
import monkey4 from "../../assets/img/monkeys/4.png";

const styles = {
	zoomIn: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(zoomIn, "zoomIn"),
	},
};

const FormThirdComponent = () => {
	return (
		<StyleRoot>
			<div style={styles.zoomIn}>
				<h1 className="text-center my-5">{t("registration.success")}</h1>

				<Link to="/" className="btn btn-primary mx-auto my-5">
					{t("registration.home")}
				</Link>

				<img
					src={monkey4}
					alt="Monkey"
					className={`${classes.monkey__img4} d-block mx-auto my-5 my-sm-0`}
				/>
			</div>
		</StyleRoot>
	);
};

export default translate(FormThirdComponent);
