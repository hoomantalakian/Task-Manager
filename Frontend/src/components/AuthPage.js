import React from 'react'
//
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import DoneIcon from "@mui/icons-material/Done";
//-----------------------------------------

const boxStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: 270,
	maxWidth: 380,
	bgcolor: "#f1f6fe",
	padding: 4,
	textAlign: "center",
	borderRadius: 2,
};

function AuthPage() {
  return (
    <Box sx={boxStyle} maxWidth="xs">
				<TextField
					// inputRef={titleRef}
					// value={title}
					// onChange={titleChangeHandler}
					id="title"
					label="Title"
					sx={{ mb: 2 }}
					placeholder="Enter task title (required)"
					fullWidth
					required
				/>
				<TextField
					// inputRef={descriptionRef}
					// value={description}
					// onChange={descriptionChangeHandler}
					id="description"
					label="Description"
					placeholder="Describe your task (optional)"
					multiline={true}
					fullWidth
				/>
				<Button
					// onClick={updateTaskHandler}
					variant="outlined"
					color="warning"
					sx={{ mt: 2, fontSize: "medium" }}
					fullWidth
					startIcon={<DoneIcon />}
				>
					LogIn/SignUp
				</Button>
			</Box>
  )
}

export default AuthPage
