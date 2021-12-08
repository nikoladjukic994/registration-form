import React from "react";
import classes from "./Input.module.scss";
import {useFormContext} from "react-hook-form";
import terms from "../../assets/pdf/sample.pdf";

const FormCheckbox = ({label, linkText, name, target, sendDataToParent}) => {
	const {
		formState: {errors},
	} = useFormContext();

	return (
		<div className="my-3">
			<div className="d-flex align-items-center">
				<input
					className={`${classes.checkbox} d-block mr-2`}
					type="checkbox"
					{...target}
					name={name}
					id={name}
					onChange={(e) => sendDataToParent(e.target.value)}
				/>
				<label htmlFor={name} className="mb-0">
					{label}
					<a href={terms} target="_blank" rel="noopener">
						{linkText}
					</a>
				</label>
			</div>
			<p className={classes.input_error}>{errors[name]?.message}</p>
		</div>
	);
};

export default FormCheckbox;
