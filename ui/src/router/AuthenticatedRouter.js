import React, { Fragment } from "react";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";

const determineAdmin = () => (true ? <AdminRouter /> : <UserRouter />);

export default function AuthenticatedRouter() {
	return <Fragment>{determineAdmin()}</Fragment>;
}
