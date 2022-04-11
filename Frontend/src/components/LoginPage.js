import React, { useContext, useRef, useState } from "react";
import Axios from "axios";
//
import AuthContext from "../context/auth-context";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
//-----------------------------------------------------------
function LoginPage(props) {
	const username = useRef("");
	const password = useRef("");
	const [alert, setAlert] = useState(null);

	const ctxData = useContext(AuthContext);

	function loginHandler() {
		Axios.post("http://localhost:5000/api/users/login", {
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
				console.error("Somethinhg went wrong (loginHandler)", err);
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
						padding: "3px 12px",
						borderRadius: 10,
						marginBottom: 20,
						boxSizing: "border-box",
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
				placeholder="Enter your username"
				fullWidth
				required
			/>
			<TextField
				// error
				// helperText="Please fill out the password"
				type="password"
				inputRef={password}
				id="password"
				label="Password"
				placeholder="Enter your password"
				fullWidth
				required
			/>

			<Button
				onClick={loginHandler}
				variant="outlined"
				color="warning"
				sx={{ mt: 2, fontSize: "medium" }}
				fullWidth
			>
				LogIn
			</Button>
			<Typography mt>
				Create new account{" "}
				<Link onClick={props.signpModeHandler} href="#">
					here
				</Link>
			</Typography>
		</Box>
	);
}

export default LoginPage;
