import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MaterialUILink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles/";
import useTheme from "@material-ui/core/styles/useTheme";
import Container from "@material-ui/core/Container";
import useInput from "../../hooks/useInput";
import instance from "../../config/apiInstance";

const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			backgroundColor: theme.palette.background
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		color: theme.palette.text.primary
	}
}));

const usernameRegex = RegExp("^[a-z]{1,50}[.]{1}[a-z0-9]{1,50}$");
const passwordRegex = RegExp("^[\\S]{6,30}$");

export default function Login() {
	// hooks
	const { value: username, bind: bindUsername } = useInput("");
	const { value: password, bind: bindPassword } = useInput("");
	const [isAdmin, setAdmin] = useState(false);
	// const [isLoading, setLoading] = useState(false);

	const [areInputsValid, setInputValidation] = useState({
		usernameValid: true,
		passwordValid: true
	});
	// const [passwordError, setPasswordError] = useState(false);

	const handleSubmit = async evt => {
		evt.preventDefault();
		const doesUsernamePass = usernameRegex.test(username);
		const doesPasswordPass = passwordRegex.test(password);

		setInputValidation({
			usernameValid: doesUsernamePass,
			passwordValid: doesPasswordPass
		});

		console.log("state: ", areInputsValid);
		if (doesUsernamePass && doesPasswordPass) {
			// setLoading(true);
			try {
				const user = await instance.post(
					`/user/login${isAdmin ? "?role=admin" : ""}`,
					{
						Identifier: username,
						PlainTextPassword: password
					}
				);
				window.localStorage.setItem("user", JSON.stringify(user.data));
				// setLoading(false);
				console.log("good");
			} catch (error) {
				// setLoading(false);
				console.error("error: ", error);
			}
		}
	};

	const classes = useStyles();
	const theme = useTheme();

	return (
		<Fragment>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="off"
							autoFocus
							helperText={
								areInputsValid.usernameValid
									? ""
									: "Must match first.last pattern"
							}
							error={!areInputsValid.usernameValid}
							{...bindUsername}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...bindPassword}
							error={!areInputsValid.passwordValid}
							helperText={
								areInputsValid.passwordValid
									? ""
									: "Must be between 6 and 30 characters"
							}
						/>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									onChange={() => setAdmin(!isAdmin)}
									value={isAdmin}
								/>
							}
							label="Sign in as Admin"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/visitor/forgot-password">
									<MaterialUILink
										component="div"
										variant="body2"
										style={{ color: theme.palette.text.primary }}
									>
										Forgot Password?
									</MaterialUILink>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</Fragment>
	);
}
