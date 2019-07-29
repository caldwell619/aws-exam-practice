import React from "react";
import Header from "./components/header/Header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import MainRouter from "./router/MainRouter";

const theme = createMuiTheme({
	palette: {
		type: "dark" // Switching the dark mode on is a single property value change.
	}
});

export default function DarkTheme() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Header />
				<div className="content-window">
					<MainRouter />
				</div>
			</div>
		</ThemeProvider>
	);
}
