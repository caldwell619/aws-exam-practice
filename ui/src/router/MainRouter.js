import React from "react";
import { Switch } from "react-router-dom";
import AuthenticatedRouter from "./AuthenticatedRouter";
import VisitorRouter from "./VisitorRouter";

const user = window.localStorage.getItem("user");

// double ! forces the comparison to be a boolean
const isLoggedIn = !!user && !!JSON.parse(user);

const determineAuth = () =>
	isLoggedIn ? <AuthenticatedRouter /> : <VisitorRouter />;

// I don't prefer this syntax, but it seems to be the way React is going
export default () => <Switch>{determineAuth()}</Switch>;
