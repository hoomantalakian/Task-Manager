import React, { useRef, useContext, useState } from "react";
import Axios from "axios";
//
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import AuthContext from "../context/auth-context";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

//-------------------------------------------------
function SignupPage(props) {
	const username = useRef("");
	const password = useRef("");
	const [alert, setAlert] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
	const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
	const [userEmptyMessage, setUserEmptyMessage] = useState();
	const [passEmptyMessage, setPassEmptyMessage] = useState();

	const ctxData = useContext(AuthContext);

	async function signupHandler() {
		if (!username.current.value && password.current.value) {
			setUserEmptyMessage("Please fill out Username");
			setPassEmptyMessage();
			setIsUsernameEmpty(true);
			setIsPasswordEmpty(false);
			return;
		} else if (!password.current.value && username.current.value) {
			setPassEmptyMessage("Please fill out Password");
			setUserEmptyMessage();
			setIsPasswordEmpty(true);
			setIsUsernameEmpty(false);
			return;
		} else if (!password.current.value && !username.current.value) {
			setUserEmptyMessage("Please fill out Username");
			setPassEmptyMessage("Please fill out Password");
			setIsPasswordEmpty(true);
			setIsUsernameEmpty(true);
			return;
		} else {
			setIsPasswordEmpty(false);
			setIsUsernameEmpty(false);
			setUserEmptyMessage();
			setPassEmptyMessage();
		}
		setIsLoading(true);
		//
		await Axios.post(process.env.REACT_APP_API_URL + "/users/signup", {
			username: username.current.value,
			password: password.current.value,
		})
			.then((res) => {
				const token = res.data.token;
				const userId = res.data.userId;
				const username = res.data.username;
				ctxData.onLogin(token, userId, username);
				setAlert(null);
			})
			.catch((err) => {
				console.error("Somethinhg went wrong (signupHandler):", err);
				setAlert(err.response.data);
			});
		setIsLoading(false);
	}

	return (
		<Box sx={props.boxStyle} maxWidth="xs">
			<Typography style={props.titleStyle} variant="h4" align="center">
				TASK MANAGER!
			</Typography>
			{alert && (
				<Alert
					style={{
						minWidth: 270,
						maxWidth: 380,
						padding: 4,
						borderRadius: 10,
						marginBottom: 20,
					}}
					severity="error"
				>
					{alert}
				</Alert>
			)}
			<TextField
				error={!!isUsernameEmpty}
				helperText={userEmptyMessage}
				inputRef={username}
				id="username"
				label="Username"
				sx={{ mb: 2 }}
				placeholder="Choose a username"
				fullWidth
				required
			/>
			<TextField
				error={!!isPasswordEmpty}
				helperText={passEmptyMessage}
				type="password"
				inputRef={password}
				id="password"
				label="Password"
				placeholder="Define your password"
				fullWidth
				required
			/>
			{!isLoading ? (
				<Button
					onClick={signupHandler}
					variant="outlined"
					color="warning"
					sx={{ mt: 2, fontSize: "medium" }}
					fullWidth
				>
					Sign up
				</Button>
			) : (
				<LoadingButton
					sx={{ mt: 2, fontSize: "medium" }}
					loading
					loadingPosition="start"
					startIcon={<SaveIcon />}
					variant="outlined"
					fullWidth
				>
					Signing up
				</LoadingButton>
			)}
			<Typography mt>
				{" "}
				Have an account already?{" "}
				<Link onClick={props.loginModeHandler} href="#">
					Click here
				</Link>
			</Typography>
		</Box>
	);
}

export default SignupPage;
