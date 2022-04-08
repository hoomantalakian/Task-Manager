import React, { useRef, useContext } from "react";
import Axios from "axios";

//
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import AuthContext from "../context/auth-context";
//-------------------------------------------------
function SignupPage(props) {
	const username = useRef("");
	const password = useRef("");

	const ctxData = useContext(AuthContext)

	function signupHandler() {
		// console.log("front");
		Axios.post("http://localhost:5000/api/users/signup", {
			username: username.current.value,
			password: password.current.value,
		})
			.then((res) => {
				console.log(res.data);
				const token = res.data.token;
				ctxData.onLogin(token);
			})
			.catch((err) => {
				console.error("Somethinhg went wrong (signupHandler):", err);
				console.log(err.response.data)
			});
	}

	return (
		<Box sx={props.boxStyle} maxWidth="xs">
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
				inputRef={password}
				id="password"
				label="Password"
				placeholder="Type your password"
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
