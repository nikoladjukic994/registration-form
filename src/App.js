import React, {memo} from "react";
import eng from "./language/eng.json";
import mne from "./language/mne.json";
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
	const handleSetLanguage = (key) => () => {
		getLanguage() === "eng" ? setLanguage("mne") : setLanguage("eng");
	};

	return (
		<div className="App">
			<h1>{t("home.title")}</h1>

			<button type="button" onClick={handleSetLanguage("mne")}>
				Switch language
			</button>
		</div>
	);
}

export default translate(memo(App));
