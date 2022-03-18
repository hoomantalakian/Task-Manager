import React from "react";
//
import { Box, Button, Link, TextField, Typography } from "@mui/material";
//-------------------------------------------------
function SignupPage(props) {
	return (
		<Box sx={props.boxStyle} maxWidth="xs">
			<TextField
				// inputRef={titleRef}
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
				// inputRef={descriptionRef}
				// value={description}
				// onChange={descriptionChangeHandler}
				id="password"
				label="Password"
				placeholder="Type your password"
				fullWidth
				required
			/>
			<Button
				// onClick={updateTaskHandler}
				variant="outlined"
				color="warning"
				sx={{ mt: 2, fontSize: "medium" }}
				fullWidth
			>
				Sign up
			</Button>
			<Typography mt>
				{" "}
				for login click{" "}
				<Link onClick={props.loginModeHandler} href="#">
					here
				</Link>
			</Typography>
		</Box>
	);
}

export default SignupPage;
