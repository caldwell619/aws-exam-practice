import React from "react";
import Home from "@material-ui/icons/Home";
import Register from "@material-ui/icons/PersonAdd";
import Login from "@material-ui/icons/Person";

export const visitorRoutes = [
	{
		icon: <Home />,
		routePath: "/",
		linkText: "Home"
	},
	{
		icon: <Login />,
		routePath: "/visitor/login",
		linkText: "Login"
	},
	{
		icon: <Register />,
		routePath: "/visitor/register",
		linkText: "Register"
	}
];
