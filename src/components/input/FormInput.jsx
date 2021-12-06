import React from "react";
import classes from "./Input.module.scss";
import {useFormContext} from "react-hook-form";

const FormInput = ({
	label,
	type,
	name,
	placeholder,
	target,
	sendDataToParent,
}) => {
	const {
		formState: {errors},
	} = useFormContext();

	return (
		<div className="my-3">
			<label htmlFor={name} className="mb-0">
				{label}
			</label>
			<input
				className="input d-block"
				type={type}
				{...target}
				name={name}
				id={name}
				placeholder={placeholder}
				onChange={(e) => sendDataToParent(e.target.value)}
			/>
			<p className={classes.input_error}>{errors[name]?.message}</p>
		</div>
	);
};

export default FormInput;
