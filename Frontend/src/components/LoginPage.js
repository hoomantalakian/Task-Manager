import React, { useContext, useRef } from "react";
import Axios from "axios";
//
import AuthContext from "../context/auth-context";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
//-----------------------------------------------------------
function LoginPage(props) {
	const username = useRef("");
	const password = useRef("");

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
			})
			.catch((err) => {
				console.error("Somethinhg went wrong (loginHandler)", err);
				console.log(err);
			});
	}
	return (
		<Box sx={props.boxStyle} maxWidth="xs">
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
