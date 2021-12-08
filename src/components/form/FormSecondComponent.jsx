import React, {useState, useRef} from "react";
import classes from "./Forms.module.scss";
import {Button} from "react-bootstrap";
import {translate, t} from "react-switch-lang";
import FormInput from "../input/FormInput";
import FormCheckbox from "../input/FormCheckbox";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {passwordReg} from "../../constants/const";
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

const FormSecondComponent = ({firstComponentData, sendDataToParent}) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");
	const [confirmPassword, setConfirmPassowrd] = useState("");
	const [termsAndConditions, setTermsAndConditions] = useState(false);
	const [loadingBtn, setLoadingBtn] = useState(false);

	const secondFormData = {
		username: username.trim(),
		email: email.trim(),
		password: password.trim(),
		password_confirm: confirmPassword.trim(),
	};

	const formRef = useRef(null);

	const schema = yup.object().shape({
		username: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.min(4, t("message.fieldMin4"))
			.max(20, t("message.fieldMax20")),
		email: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.email(t("message.fieldNotValid")),
		password: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.matches(passwordReg, t("message.passwordNotStrong")),
		confirmPassword: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.matches(passwordReg, t("message.passwordNotStrong"))
			.oneOf([yup.ref("password"), null], "Passwords must match"),
		termsAndConditions: yup.boolean().oneOf([true], t("message.fieldRequired")),
	});
	const methods = useForm({
		resolver: yupResolver(schema),
	});
	const {handleSubmit, register, reset} = methods;

	const onSubmit = () => {
		setLoadingBtn(true);

		setTimeout(() => {
			setLoadingBtn(false);

			const formData = {...firstComponentData, ...secondFormData};
			const formValues = [];

			Object.keys(formData).forEach((key) => {
				formValues.push({
					code: key,
					valueStr: formData[key],
					dataType: "string",
				});
			});

			const dataToSend = {fields: formValues};

			console.log(dataToSend);

			sendDataToParent("thirdComponent");
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
								label={t("labels.username")}
								type="text"
								name="username"
								placeholder={t("placeholders.username")}
								target={register("username")}
								sendDataToParent={setUsername}
							/>

							<FormInput
								label={t("labels.email")}
								type="email"
								name="email"
								placeholder={t("placeholders.email")}
								target={register("email")}
								sendDataToParent={setEmail}
							/>

							<FormInput
								label={t("labels.password")}
								type="password"
								name="password"
								placeholder={t("placeholders.password")}
								target={register("password")}
								sendDataToParent={setPassowrd}
							/>

							<FormInput
								label={t("labels.confirmPassword")}
								type="password"
								name="confirmPassword"
								placeholder={t("placeholders.confirmPassword")}
								target={register("confirmPassword")}
								sendDataToParent={setConfirmPassowrd}
							/>

							<FormCheckbox
								label={t("labels.acceptTermsAndConditions")}
								linkText={t("labels.termsAndConditions")}
								name="termsAndConditions"
								target={register("termsAndConditions")}
								sendDataToParent={setTermsAndConditions}
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

export default translate(FormSecondComponent);
