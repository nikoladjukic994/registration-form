import React, {memo} from "react";
import {bounce} from "react-animations";
import Radium, {StyleRoot} from "radium";

const styles = {
	bounce: {
		animation: "x 1s",
		animationName: Radium.keyframes(bounce, "bounce"),
	},
};

const Example = () => {
	return (
		<StyleRoot>
			<div className="test" style={styles.bounce}>
                asdadasd
            </div>
		</StyleRoot>
	);
};

export default memo(Example);
