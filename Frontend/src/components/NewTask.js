import { Fragment, useContext, useRef, useState } from "react";
import axios from "axios";
//
import { Button, CircularProgress, Modal, TextField } from "@mui/material";
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
	padding: 3,
	textAlign: "center",
	borderRadius: 2,
};

function NewTask(props) {
	const ctxData = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const [inputEmptyMessage, setInputEmptyMessage] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function openHandler() {
		setIsOpen(true);
	}
	function closeHandler() {
		setIsOpen(false);
	}

	const title = useRef();
	const description = useRef();

	async function addTaskHandler() {
		if (!title.current.value || !description.current.value) {
			setInputEmptyMessage("Please fill out all fields");
			return;
		} else {
			setInputEmptyMessage(null);
		}
		setIsLoading(true);
		await axios
			.post(process.env.REACT_APP_API_URL + "/tasks", {
				title: title.current.value,
				description: description.current.value,
				creator: ctxData.userId,
			})
			.then((res) => {
				console.log(res.data);
			});
		setIsOpen(false);
		setIsLoading(false);
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
						helperText={inputEmptyMessage}
						id="description"
						label="Description"
						placeholder="Describe your task (optional)"
						multiline={true}
						fullWidth
						required
					/>
					{isLoading ? (
						<CircularProgress style={{ margin: "20px 0 -10px" }} />
					) : (
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
					)}
				</Box>
			</Modal>
		</Fragment>
	);
}

export default NewTask;
