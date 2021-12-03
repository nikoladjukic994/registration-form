import React, {memo} from "react";
import eng from "./language/eng.json";
import mne from "./language/mne.json";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	setTranslations,
	setDefaultLanguage,
	getLanguage,
	setLanguage,
	translate,
	t,
} from "react-switch-lang";
setTranslations({eng, mne});
setDefaultLanguage("eng");

function App() {
	const handleSetLanguage = (lang) => () => {
		setLanguage(lang);
	};

	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">
						<h1>{t("home.title")}</h1>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end">
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
		</div>
	);
}

export default translate(memo(App));
