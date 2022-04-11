import React, { useRef, useContext, useState } from "react";
import Axios from "axios";

//
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import AuthContext from "../context/auth-context";
//-------------------------------------------------
function SignupPage(props) {
	const username = useRef("");
	const password = useRef("");
	const [alert, setAlert] = useState(null);

	const ctxData = useContext(AuthContext);

	function signupHandler() {
		Axios.post("http://localhost:5000/api/users/signup", {
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
				console.log(err.response.data);
				setAlert(err.response.data);
			});
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
				inputRef={username}
				id="username"
				label="Username"
				sx={{ mb: 2 }}
				placeholder="Choose a username"
				fullWidth
				required
			/>
			<TextField
				type="password"
				inputRef={password}
				id="password"
				label="Password"
				placeholder="Define your password"
				fullWidth
				required
			/>
			<Button
				onClick={signupHandler}
				variant="outlined"
				color="warning"
				sx={{ mt: 2, fontSize: "medium" }}
				fullWidth
			>
				Sign up
			</Button>
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
