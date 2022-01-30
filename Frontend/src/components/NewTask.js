import { Button, Modal, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Fragment, useState } from "react";
import { Box } from "@mui/system";
//
const boxStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 350,
	bgcolor: "#f1f6fe",
	padding: 4,
	textAlign: "center",
	borderRadius: 2,
};

//
function NewTask() {
	const [isOpen, setIsOpen] = useState(false);
	function openHandler() {
		setIsOpen(true);
	}
	function closeHandler() {
		setIsOpen(false);
	}

	return (
		<Fragment>
			<Button
				onClick={openHandler}
				sx={{ fontSize: "large" }}
				color="warning"
				variant="contained"
				startIcon={<AddBoxIcon />}
				fullWidth
			>
				Add New Task
			</Button>
			<Modal open={isOpen} onClose={closeHandler}>
				<Box sx={boxStyle} maxWidth="xs">
					{/* <Typography>NewTaskModal test!</Typography> */}
					
				</Box>
			</Modal>
		</Fragment>
	);
}

export default NewTask;
