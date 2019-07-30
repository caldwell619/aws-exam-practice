import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import NavLink from "./NavLink";

const PartialDrawer = ({ toolbar, closeDrawer, routes }) => {
	return (
		<div className="drawer-cont">
			<div className={toolbar} />
			<List>
				{routes.map((route, index) => (
					<NavLink {...route} drawerToggle={closeDrawer} key={index} />
				))}
			</List>
			<div />
		</div>
	);
};

PartialDrawer.propTypes = {
	toolbar: PropTypes.string,
	closeDrawer: PropTypes.func,
	routes: PropTypes.arrayOf(PropTypes.object)
};

export default PartialDrawer;
