import { useEffect, useRef, useState } from "react";
import axios from "axios";
//
import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DoneIcon from "@mui/icons-material/Done";
//------------------------------------------------------

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

function EditModal(props) {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	//
	const titleRef = useRef();
	const descriptionRef = useRef();
	//
	useEffect(() => {
		setTitle(props.title);
		setDescription(props.description);
	}, [props.description, props.title]);
	//
	function titleChangeHandler() {
		setTitle(titleRef.current.value);
	}
	function descriptionChangeHandler() {
		setDescription(descriptionRef.current.value);
	}
	// update task
	function updateTaskHandler() {
		props.closeModalHandler();
		axios
			.patch(`${process.env.REACT_APP_API_URL}/tasks/${props.id}`, {
				title,
				description,
			})
			.then((res) => {
				props.reloadHandler();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Modal onClose={props.closeModalHandler} open={props.open}>
			<Box sx={boxStyle} maxWidth="xs">
				<TextField
					inputRef={titleRef}
					value={title}
					onChange={titleChangeHandler}
					id="title"
					label="Title"
					sx={{ mb: 2 }}
					placeholder="Enter task title (required)"
					fullWidth
					required
				/>
				<TextField
					inputRef={descriptionRef}
					value={description}
					onChange={descriptionChangeHandler}
					id="description"
					label="Description"
					placeholder="Describe your task (optional)"
					multiline={true}
					fullWidth
				/>
				<Button
					onClick={updateTaskHandler}
					variant="outlined"
					color="warning"
					sx={{ mt: 2, fontSize: "medium" }}
					fullWidth
					startIcon={<DoneIcon />}
				>
					Update!
				</Button>
			</Box>
		</Modal>
	);
}

export default EditModal;
