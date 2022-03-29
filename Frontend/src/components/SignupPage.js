import React, { useRef } from "react";
import Axios from "axios";

//
import { Box, Button, Link, TextField, Typography } from "@mui/material";
//-------------------------------------------------
function SignupPage(props) {

	const username = useRef("");
	const password = useRef("");

	function signupHandler() {
		Axios.post("http://localhost:5000/api/users/signup", {
			username: username.current.value,
			password: password.current.value,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error("Somethinhg went wrong!", err);
			});
	}

	return (
		<Box sx={props.boxStyle} maxWidth="xs">
			<TextField
				inputRef={username}
				// value={title}
				// onChange={titleChangeHandler}
				id="username"
				label="Username"
				sx={{ mb: 2 }}
				placeholder="Choose a username"
				fullWidth
				required
			/>
			<TextField
				inputRef={password}
				// value={description}
				// onChange={descriptionChangeHandler}
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
				Have an account already? {" "}
				<Link onClick={props.loginModeHandler} href="#">
					Click here
				</Link>
			</Typography>
		</Box>
	);
}

export default SignupPage;
