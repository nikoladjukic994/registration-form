import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {translate, t} from "react-switch-lang";
import FormFirstComponent from "../../components/form/FormFirstComponent";
import FormSecondComponent from "../../components/form/FormSecondComponent";
import FormThirdComponent from "../../components/form/FormThirdComponent";
import Monkeys from "../../components/monkeys/Monkeys";

const Registration = () => {
	const [currentComponent, setCurrentComponent] = useState("firstComponent");
	const [firstComponentData, setFirstComponentData] = useState({});

	const handleDataFromFirstComponent = (data, current) => {
		setFirstComponentData(data);

		setCurrentComponent(current);
	};

	return (
		<Container className="section__container py-sm-5">
			<Monkeys></Monkeys>

			{currentComponent === "firstComponent" ? (
				<FormFirstComponent
					sendDataToParent={(data, current) =>
						handleDataFromFirstComponent(data, current)
					}
				/>
			) : currentComponent === "secondComponent" ? (
				<FormSecondComponent
					sendDataToParent={(value) => setCurrentComponent(value)}
					firstComponentData={firstComponentData}
				/>
			) : (
				<FormThirdComponent
					sendDataToParent={(value) => setCurrentComponent(value)}
				/>
			)}
		</Container>
	);
};

export default translate(Registration);
