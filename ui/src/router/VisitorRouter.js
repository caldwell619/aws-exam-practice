import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../views/visitor/Login";
// import AutoRedirect from "../views/visitor/AutoRedirect";
import Landing from "../views/visitor/Landing";
import ForgotPassword from "../views/visitor/ForgotPassword";

export default function AuthenticatedRouter() {
	return (
		<Switch>
			<Route path="/visitor/login" render={() => <Login />} />
			<Route
				path="/visitor/forgot-password"
				render={() => <ForgotPassword />}
			/>
			<Route path="/" render={() => <Landing />} />
		</Switch>
	);
}
