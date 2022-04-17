import { useState } from "react";
import axios from "axios";
//
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditModal from "./EditModal.js";
// -----------------------------------------------

function Task(props) {
	const [isModalOpen, setModalIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function openModalHandler() {
		setModalIsOpen(true);
	}
	function closeModalHandler() {
		setModalIsOpen(false);
	}

	// (get task in app.js)
	// (update task in EditModal.js)

	// delete task
	async function deleteTaskHandler() {
		setIsLoading(true);
		await axios
			.delete(`${process.env.REACT_APP_API_URL}/tasks/${props.id}`)
			.then((res) => {
				props.reloadHandler();
			})
			.catch((err) => {
				console.log(err);
			});
		setIsLoading(false);
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
					{!isLoading ? (
						<Button
							loading
							loadingPosition="start"
							startIcon={<DeleteIcon />}
							onClick={deleteTaskHandler}
						>
							Delete
						</Button>
					) : (
						<LoadingButton
							style={{
								marginLeft: "10px",
								marginRight: "-10px",
								paddingRight: "10px",
								boxSizing: "border-box",
							}}
							loading
							loadingPosition="start"
							startIcon={<SaveIcon />}
							// variant="outlined"
						>
							Deleting
						</LoadingButton>
					)}
				</ButtonGroup>
				<EditModal
					reloadHandler={props.reloadHandler}
					open={isModalOpen}
					closeModalHandler={closeModalHandler}
					title={props.title}
					description={props.description}
					id={props.id}
				/>
			</Box>
		</Box>
	);
}

export default Task;
