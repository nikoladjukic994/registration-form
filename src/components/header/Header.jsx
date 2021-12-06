import classes from "./Header.module.scss";
import React, {memo} from "react";
import eng from "../../language/eng.json";
import mne from "../../language/mne.json";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
	setTranslations,
	setDefaultLanguage,
	setLanguage,
	translate,
	t,
} from "react-switch-lang";
setTranslations({eng, mne});
setDefaultLanguage("eng");
import logo from "../../../src/assets/img/logo.png";

function Header() {
	const handleSetLanguage = (lang) => () => {
		setLanguage(lang);
	};

	return (
		<Navbar bg="white" expand="lg" className={classes.navbar}>
			<Container>
				<Navbar.Brand>
					<Link to="/">
						<img src={logo} alt="Logo" className={classes.logo} />
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="me-auto">
						<NavDropdown
							title={t("language.changeLanguage")}
							id="basic-nav-dropdown">
							<NavDropdown.Item onClick={handleSetLanguage("eng")}>
								{t("language.en")}
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={handleSetLanguage("mne")}>
								{t("language.me")}
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default translate(memo(Header));
