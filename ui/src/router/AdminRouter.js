import React from "react";
import { Switch, Route } from "react-router-dom";
import Test from "../views/visitor/Login";

const AuthenticatedRouter = props => {
	return (
		<Switch>
			<Route path="/authenticated" render={() => <Test />} />
		</Switch>
	);
};

export default AuthenticatedRouter;
