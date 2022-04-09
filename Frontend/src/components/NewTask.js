import { Fragment, useContext, useRef, useState } from "react";
import axios from "axios";
// MUI
import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import AuthContext from "../context/auth-context";
////------------------------------------------------
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

function NewTask(props) {
	
	const [isOpen, setIsOpen] = useState(false);
	const ctxData = useContext(AuthContext);

	function openHandler() {
		setIsOpen(true);
	}
	function closeHandler() {
		setIsOpen(false);
	}

	const title = useRef();
	const description = useRef();

	async function addTaskHandler() {
		await axios
			.post("http://localhost:5000/api/tasks", {
				title: title.current.value,
				description: description.current.value,
				creator: ctxData.userId,
			})
			.then((res) => {
				console.log(res.data.creator);
			});
		setIsOpen(false);
		props.reloadHandler();
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
					<TextField
						inputRef={title}
						id="title"
						label="Title"
						sx={{ mb: 2 }}
						placeholder="Enter task title (required)"
						fullWidth
						required
					/>
					<TextField
						inputRef={description}
						id="description"
						label="Description"
						placeholder="Describe your task (optional)"
						multiline={true}
						fullWidth
					/>
					<Button
						onClick={addTaskHandler}
						variant="outlined"
						color="warning"
						sx={{ mt: 2, fontSize: "medium" }}
						fullWidth
						startIcon={<DoneIcon />}
					>
						Add this task
					</Button>
				</Box>
			</Modal>
		</Fragment>
	);
}

export default NewTask;
