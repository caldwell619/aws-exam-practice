import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import useTheme from "@material-ui/core/styles/useTheme";

export default ({ icon, routePath, linkText, drawerToggle }) => {
	const theme = useTheme();
	return (
		<div>
			<Link
				component={RouterLink}
				to={routePath}
				style={{ color: theme.palette.text.primary }}
				onClick={drawerToggle}
			>
				<ListItem button>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={linkText} />
				</ListItem>
			</Link>
		</div>
	);
};
