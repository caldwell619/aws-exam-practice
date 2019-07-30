import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toggle from "../input/Toggle";
import { visitorRoutes } from "../../router/routes";
import PartialDrawer from "./PartialDrawer";
import { UserContext } from "../../context/UserContext";
import "../../css/Header.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			flexShrink: 0,
			width: drawerWidth
		}
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

export default function ResponsiveDrawer({
	container,
	setThemeMode,
	persistedMode
}) {
	const [modeChecked, setModeChecked] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleChange = event => {
		setModeChecked(event.target.checked);
		setThemeMode(event.target.checked ? "dark" : "light");
		window.localStorage.setItem(
			"persistedMode",
			JSON.stringify(event.target.checked ? "dark" : "light")
		);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const closeDrawer = () => {
		setMobileOpen(false);
	};

	const classes = useStyles();
	const theme = useTheme();
	const user = useContext(UserContext);

	console.log("user context: ", user);

	useEffect(() => {
		const preselectedMode = persistedMode && persistedMode === "dark";
		setModeChecked(preselectedMode);
	}, [persistedMode]);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						AWS Exam Tips
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="Mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<PartialDrawer
							routes={visitorRoutes}
							closeDrawer={closeDrawer}
							toolbar={classes.toolbar}
						/>
						<div className="bottom-div">
							<Toggle
								modeChecked={modeChecked}
								handleChange={handleChange}
								textPrompt={"Dark Mode"}
							/>
						</div>
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						<PartialDrawer
							routes={visitorRoutes}
							closeDrawer={closeDrawer}
							toolbar={classes.toolbar}
						/>
						<div className="bottom-div">
							<Toggle
								modeChecked={modeChecked}
								handleChange={handleChange}
								textPrompt={"Dark Mode"}
							/>
						</div>
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}
