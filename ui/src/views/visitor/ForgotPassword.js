import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MaterialUILink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useInput from "../../hooks/useInput";
import instance from "../../config/apiInstance";

const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			backgroundColor: theme.palette.common.white
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
	}
}));
const usernameRegex = RegExp("^[a-z]{1,50}[.]{1}[a-z0-9]{1,50}$");

export default function Login() {
	// hooks
	const { value: username, bind: bindUsername } = useInput("");
	const [usernameValid, setUsernameValid] = useState(true);
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async evt => {
		evt.preventDefault();
		const doesUsernamePass = usernameRegex.test(username);

		setUsernameValid(doesUsernamePass);

		if (doesUsernamePass) {
			setLoading(true);
			console.log("send req");
			try {
				const user = await instance.post(`/user/forgot-password`, {});
			} catch (error) {
				console.log("error: ", error);
			}
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		console.log(usernameValid);
	};
	const classes = useStyles();

	return (
		<Fragment>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Forgot Password
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
							helperText={usernameValid ? "" : "Must match first.last pattern"}
							error={!usernameValid}
							{...bindUsername}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Request Password Reset
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/visitor/login">
									<MaterialUILink component="div" variant="body2">
										Login instead
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
