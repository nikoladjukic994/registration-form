import React, {memo, useState, useRef} from "react";
import classes from "./Forms.module.scss";
import {Container, Button} from "react-bootstrap";
import {translate, t} from "react-switch-lang";
import FormInput from "../input/FormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";

const FormSecondComponent = ({sendDataToParent}) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");
	const [repeatPassword, setRepeatPassowrd] = useState("");

	const secondFormData = {
		username: username.trim(),
		email: email.trim(),
		password: password.trim(),
		repeatPassword: repeatPassword.trim(),
	};

	const formRef = useRef(null);

	const schema = yup.object().shape({
		username: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.min(3, t("message.fieldMin3"))
			.max(50, t("message.fieldMax50")),
		email: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.email(t("message.fieldNotValid")),
		password: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.min(8, t("message.fieldMin8"))
			.max(50, t("message.fieldMax50")),
		repeatPassword: yup
			.string()
			.trim()
			.required(t("message.fieldRequired"))
			.min(8, t("message.fieldMin8"))
			.max(50, t("message.fieldMax50"))
			.oneOf([yup.ref("password"), null], "Passwords must match"),
	});
	const methods = useForm({
		resolver: yupResolver(schema),
	});
	const {handleSubmit, register, reset} = methods;

	const onSubmit = () => {
		// setLoadingBtn(true);
		sendDataToParent("firstComponent");
		let formData = new FormData();
		formData.append("data", JSON.stringify(secondFormData));
	};
	const resetForm = () => {
		setFormSubmitted(false);
		reset();
	};

	return (
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
					label={t("labels.repeatPassword")}
					type="password"
					name="repeatPassword"
					placeholder={t("placeholders.repeatPassword")}
					target={register("repeatPassword")}
					sendDataToParent={setRepeatPassowrd}
				/>

				<Button type="submit" className="btn btn-primary btn__red mx-auto mt-5">
					{t("registration.register")}
				</Button>
			</form>
		</FormProvider>
	);
};

export default translate(memo(FormSecondComponent));
