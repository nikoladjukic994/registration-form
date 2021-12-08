import React, {useState, useRef} from "react";
import classes from "./Forms.module.scss";
import {Button} from "react-bootstrap";
import {translate, t} from "react-switch-lang";
import FormInput from "../input/FormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {nameReg} from "../../constants/const";
import {fadeInRight, zoomIn} from "react-animations";
import Radium, {StyleRoot} from "radium";

const styles = {
	fadeInRight: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
	},
	zoomIn: {
		animation: "x 0.5s",
		animationName: Radium.keyframes(zoomIn, "zoomIn"),
	},
};

const FormFirstComponent = ({sendDataToParent}) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [loadingBtn, setLoadingBtn] = useState(false);

	const firstFormData = {
		fname: firstName.trim(),
		lName: lastName.trim(),
	};

	const formRef = useRef(null);

	const schema = yup.object().shape({
		firstName: yup
			.string()
			.trim()
			.matches(nameReg, t("message.fieldNotValid"))
			.required(t("message.fieldRequired"))
			.min(2, t("message.fieldMin2"))
			.max(25, t("message.fieldMax25")),
		lastName: yup
			.string()
			.trim()
			.matches(nameReg, t("message.fieldNotValid"))
			.required(t("message.fieldRequired"))
			.min(2, t("message.fieldMin2"))
			.max(25, t("message.fieldMax25")),
	});
	const methods = useForm({
		resolver: yupResolver(schema),
	});
	const {handleSubmit, register, reset} = methods;

	const onSubmit = () => {
		setLoadingBtn(true);

		setTimeout(() => {
			setLoadingBtn(false);

			sendDataToParent(firstFormData, "secondComponent");
		}, 1000);
	};

	return (
		<>
			<StyleRoot>
				<div style={styles.zoomIn}>
					<h1 className="text-center my-5">{t("registration.title")}</h1>
				</div>
			</StyleRoot>

			<StyleRoot>
				<div style={styles.fadeInRight}>
					<FormProvider {...methods}>
						<form
							action=""
							method="POST"
							ref={formRef}
							className={classes.registration__form}
							onSubmit={handleSubmit(onSubmit)}
							noValidate>
							<FormInput
								label={t("labels.firstName")}
								type="text"
								name="firstName"
								placeholder={t("placeholders.firstName")}
								target={register("firstName")}
								sendDataToParent={setFirstName}
							/>

							<FormInput
								label={t("labels.lastName")}
								type="text"
								name="lastName"
								placeholder={t("placeholders.lastName")}
								target={register("lastName")}
								sendDataToParent={setLastName}
							/>

							<Button
								type="submit"
								className={`btn btn-primary mx-auto my-5 ${
									loadingBtn ? "loading" : ""
								}`}
								disabled={`${loadingBtn ? "disabled" : ""}`}>
								{t("registration.register")}
							</Button>
						</form>
					</FormProvider>
				</div>
			</StyleRoot>
		</>
	);
};

export default translate(FormFirstComponent);
