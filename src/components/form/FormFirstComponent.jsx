import React, {memo, useState, useRef} from "react";
import classes from "./Forms.module.scss";
import {Container, Button} from "react-bootstrap";
import {translate, t} from "react-switch-lang";
import FormInput from "../input/FormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {nameReg} from "../../constants/const";

const FormFirstComponent = ({sendDataToParent}) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const firstFormData = {
		firstName: firstName.trim(),
		lastName: lastName.trim(),
	};

	const formRef = useRef(null);

	const schema = yup.object().shape({
		firstName: yup
			.string()
			.trim()
			.matches(nameReg, t("message.fieldNotValid"))
			.required(t("message.fieldRequired"))
			.min(3, t("message.fieldMin3"))
			.max(50, t("message.fieldMax50")),
		lastName: yup
			.string()
			.trim()
			.matches(nameReg, t("message.fieldNotValid"))
			.required(t("message.fieldRequired"))
			.min(3, t("message.fieldMin3"))
			.max(50, t("message.fieldMax50")),
	});
	const methods = useForm({
		resolver: yupResolver(schema),
	});
	const {handleSubmit, register, reset} = methods;

	const onSubmit = () => {
		// setLoadingBtn(true);
		sendDataToParent("secondComponent");
		let formData = new FormData();
		formData.append("data", JSON.stringify(firstFormData));
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

				<Button type="submit" className="btn btn-primary btn__red mx-auto mt-5">
					{t("registration.nextStep")}
				</Button>
			</form>
		</FormProvider>
	);
};

export default translate(memo(FormFirstComponent));
