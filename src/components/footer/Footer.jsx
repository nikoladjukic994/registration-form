import classes from "./Footer.module.scss";
import {Container} from "react-bootstrap";
import React, {memo} from "react";

import {translate, t} from "react-switch-lang";

function Footer() {
	return (
		<div className={classes.footer}>
			<Container className="text-center py-3">
				<span>{t("footer.copyright")}</span>
			</Container>
		</div>
	);
}

export default translate(memo(Footer));
