import { useEffect, useState } from "react";
import axios from "axios";
//
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "./EditModal.js";
// -----------------------------------------------

function Task(props) {
	const [isModalOpen, setModalIsOpen] = useState(false);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	//
	function openModalHandler() {
		setModalIsOpen(true);
	}
	function closeModalHandler() {
		setModalIsOpen(false);
	}
	// get task
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/tasks/${props.id}`)
			.then((res) => {
				setTitle(res.data.title);
				setDescription(res.data.description);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.id]);
	// (update task in EditModal.js)
	// delete task
	function deleteTaskHandler() {
		axios
			.delete(`http://localhost:5000/api/tasks/${props.id}`)
			.then((res) => {
				props.reloadHandler();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	return (
		<Box
			sx={{
				backgroundColor: "",
				mb: 1.5,
				boxShadow: 4,
				borderRadius: 2,
				p: 1,
			}}
			maxWidth="xs"
		>
			<Typography px={1} variant="h6">
				{props.title}
			</Typography>
			<Typography px={1} variant="body2">
				{props.description}
			</Typography>
			<Box sx={{ textAlign: "center", mt: 1.5 }}>
				<ButtonGroup variant="text" fullWidth>
					<Button
						startIcon={<ModeEditIcon />}
						onClick={openModalHandler}
					>
						Edit
					</Button>
					<Button
						startIcon={<DeleteIcon />}
						onClick={deleteTaskHandler}
					>
						Delete
					</Button>
				</ButtonGroup>
				<EditModal
					reloadHandler={props.reloadHandler}
					open={isModalOpen}
					closeModalHandler={closeModalHandler}
					title={title}
					description={description}
					id={props.id}
				/>
			</Box>
		</Box>
	);
}

export default Task;
