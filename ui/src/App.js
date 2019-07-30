import React, { useState } from "react";
import Header from "./components/header/Header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./css/App.css";
import MainRouter from "./router/MainRouter";

export default () => {
	const persistedMode = JSON.parse(
		window.localStorage.getItem("persistedMode")
	);
	console.log("persistedMode: ", persistedMode);
	const [themeMode, setThemeMode] = useState(persistedMode || "light");
	const theme = createMuiTheme({
		palette: {
			type: themeMode // Switching the dark mode on is a single property value change.
		}
	});
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Header setThemeMode={setThemeMode} persistedMode={persistedMode} />
				<div className="content-window">
					<MainRouter />
				</div>
			</div>
		</ThemeProvider>
	);
};
