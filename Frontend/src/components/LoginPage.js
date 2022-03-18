import React from 'react'
//
import { Box, Button, TextField } from '@mui/material';
//-----------------------------------------------------------

function LoginPage(props) {
	return (
		<Box sx={props.boxStyle} maxWidth="xs">
			<TextField
				// inputRef={titleRef}
				// value={title}
				// onChange={titleChangeHandler}
				id="username"
				label="Username"
				sx={{ mb: 2 }}
				placeholder="Enter task title (required)"
				fullWidth
				required
			/>
			<TextField
				// inputRef={descriptionRef}
				// value={description}
				// onChange={descriptionChangeHandler}
				id="password"
				label="Password"
				placeholder="Describe your task (optional)"
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
				LogIn
			</Button>
		</Box>
	);
}

export default LoginPage