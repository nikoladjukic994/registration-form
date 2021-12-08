import React from "react";
import classes from "./Monkeys.module.scss";
import monkey1 from "../../assets/img/monkeys/1.png";
import monkey2 from "../../assets/img/monkeys/2.png";
import monkey3 from "../../assets/img/monkeys/3.png";

const Monkeys = () => {
	return (
		<>
			<img src={monkey1} alt="Monkey" className={classes.monkey__img1} />
			<img src={monkey2} alt="Monkey" className={classes.monkey__img2} />
			<img src={monkey3} alt="Monkey" className={classes.monkey__img3} />
		</>
	);
};

export default Monkeys;
